"use strict";

import { client } from "./client.js";
import { config } from "./config.js";

const { SERVER_API_AUTH } = config;

client.setUrl(SERVER_API_AUTH);

const app = {
  root: document.querySelector("#root"),
  isLogin: function () {
    const status = localStorage.getItem("login_token") ? true : false;
    // console.log({ status });
    return status;
  },

  render: function () {
    let html;

    if (this.isLogin()) {
      html = `<div class="container py-3">
        <h2 class="text-center">Chào mừng bạn đã quay trở lại</h2>
        <ul class="profile list-unstyled d-flex gap-3">
          <li>Chào bạn: <span class="name">${this.profileName}</span></li>
          <li><a href="#" class="text-decoration-none logout">Đăng xuất</a></li>
        </ul>
      </div>
      
      <div class="container py-3">
      <form class="blog">
      <span style="display: block; font-size: 24px; font-style: italic">Enter title:</span>
      <input type="text" placeholder="title..." class="blog-title" />
      <span style="display: block; font-size: 24px; font-style: italic">Enter content:</span>
      <textarea placeholder="content..." class="blog-content"></textarea>
      <span style="display: block; font-size: 24px; font-style: italic">Enter time:</span>
      <input type="date" name="date" id="datepicker" />
      
      
      <button type="submit" class="post-btn">POST</button>
        </form>
        </div>
        
      <div class="container py-3">
      ${this.renderBlogs()}
      </div>  
        `;
      // this.getProfile();
    } else {
      html = `<div class="container py-3">
        <div class="row justify-content-center">
          <div class="col-8 col-lg-6">
            <h2 class="text-center">Đăng nhập</h2>
            <form action="" class="login">
              <div class="mb-3">
                <label for="">Email</label>
                <input type="email" name="email" class="form-control email" placeholder="Email..." required/>
              </div>
              <div class="mb-3">
                <label for="">Password</label>
                <input type="password" name="password" class="form-control password" placeholder="Password..." required/>
              </div>
              <div class="d-grid">
                <button class="btn btn-primary">Đăng nhập</button>
              </div>
              <div class="msg mt-3 text-danger text-center"></div>
            </form>

            <h2 class="text-center mt-3">Đăng ký</h2>
            <form action="" class="register">
            <div class="mb-3">
                <label for="">Name</label>
                <input type="text" name="text" class="form-control name" placeholder="Name..." required/>
              </div>
              <div class="mb-3">
                <label for="">Email</label>
                <input type="email" name="email" class="form-control email" placeholder="Email..." required/>
              </div>
              <div class="mb-3">
                <label for="">Password</label>
                <input type="password" name="password" class="form-control password" placeholder="Password..." required/>
              </div>
              <div class="d-grid">
                <button class="btn btn-primary">Đăng ký</button>
              </div>
              <div class="msg mt-3 text-danger text-center"></div>
            </form>
          </div>
        </div>
      </div>`;
    }

    this.root.innerHTML = html;
  },

  renderBlogs: function () {
    const { blogs } = this;
    return blogs
      .map(
        (blog) => `<div class="blog mt-3" style="border: 1px solid #000">
    <h2 class="blog-author"> ${blog.userId.name}</h2>
    <p class="blog-title">${blog.title}</p>
    <p class="blog-content">${this.converter(blog.content)}</p>
    </div>`
      )
      .join("");
  },

  addEvent: function () {
    this.root.addEventListener("submit", (e) => {
      e.preventDefault();
      if (e.target.classList.contains("login")) {
        const emailEl = e.target.querySelector(".email");
        const passwordEl = e.target.querySelector(".password");

        const email = emailEl.value;
        const password = passwordEl.value;

        this.login({ email, password });
      }
      if (e.target.classList.contains("register")) {
        const nameEl = e.target.querySelector(".name");
        const emailEl = e.target.querySelector(".email");
        const passwordEl = e.target.querySelector(".password");

        const name = nameEl.value;
        const email = emailEl.value;
        const password = passwordEl.value;

        this.register({ name, email, password });
      }
      if (e.target.classList.contains("blog")) {
        const blogTitleEl = e.target.querySelector(".blog-title");
        const blogContentEl = e.target.querySelector(".blog-content");

        const title = blogTitleEl.value;
        const content = blogContentEl.value;

        this.postBlog({ title, content });
      }
    });

    this.root.addEventListener("click", (e) => {
      if (e.target.classList.contains("logout")) {
        e.preventDefault();
        this.logout();
      }
    });
  },

  loadingLogin: function (status = true) {
    const button = this.root.querySelector(".login .btn");
    if (status) {
      button.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Loading...`;
      button.disabled = true;
    } else {
      button.innerHTML = `Đăng nhập`;
      button.disabled = false;
    }
  },

  loadingRegister: function (status = true) {
    const button = this.root.querySelector(".register .btn");
    if (status) {
      button.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Loading...`;
      button.disabled = true;
    } else {
      button.innerHTML = `Đăng ký`;
      button.disabled = false;
    }
  },

  showError: function (msgText) {
    const msg = this.root.querySelector(".login .msg");
    msg.innerText = ``;
    msg.innerText = msgText;
  },

  login: async function (data) {
    console.log(`login`);
    this.loadingLogin(); //Thêm loading
    try {
      //Call API
      const { response, data: dataList } = await client.post(
        "/auth/login",
        data
      );
      // console.log({ response, dataList });
      this.loadingLogin(false); //Xóa loading
      if (!response.ok) {
        throw new Error("Email hoặc mật khẩu không hợp lệ");
      }
      //Thêm token vào Storage (localStorage)
      const tokens = {
        access_token: dataList.data.accessToken,
        refresh_token: dataList.data.refreshToken,
      };
      localStorage.setItem("login_token", JSON.stringify(tokens));

      client.setToken(tokens.access_token);

      //Render
      this.getProfile();
    } catch (e) {
      this.showError(e.message);
    }
  },

  register: async function (data) {
    this.loadingRegister();
    try {
      const response = await client.post("/auth/register", data);
      console.log(response);
      this.loadingRegister(false);
    } catch (e) {
      console.log(e);
    }
  },

  getProfile: async function () {
    // console.log(`getProfile`);
    try {
      let token = localStorage.getItem("login_token");
      let accessToken;

      if (token) {
        accessToken = JSON.parse(token).access_token;
      }

      if (!accessToken) {
        throw new Error("accessToken is null");
      }

      client.setToken(accessToken);
      const { response, data: dataList } = await client.get("/users/profile");

      if (response.status === 401) {
        throw new Error("accessToken outdated");
      }

      // const profileEl = this.root.querySelector(".profile");
      // const profileName = profileEl.querySelector(".name");
      // profileName.innerText = dataList.data.name;

      this.profileName = dataList.data.name;

      this.getBlogs();
    } catch (e) {
      console.log(e);
      if (e.message === "accessToken is null") {
        await this.logout();
      }
      if (e.message === "accessToken outdated") {
        await this.refreshToken();
        await this.getProfile();
        // await this.logout();
      }
    }
  },

  refreshToken: async function () {
    try {
      let token = localStorage.getItem("login_token");
      let refreshToken;

      console.log(token);

      if (token) {
        refreshToken = JSON.parse(token).refresh_token;
      }
      console.log(refreshToken);

      if (!refreshToken) {
        throw new Error("refreshToken not null");
      }

      const { response, data } = await client.post("/auth/refresh-token", {
        refreshToken,
      });

      console.log({ refreshToken });

      if (response.status === 401) {
        throw new Error("Unauthorize");
      }

      console.log("Lấy token mới");

      const newToken = data.data.token;
      console.log(newToken);
      localStorage.setItem("login_token", JSON.stringify(newToken));
    } catch (e) {
      console.log(e);
      if (e.message === "Unauthorize") {
        localStorage.removeItem("login_token");
        this.render();
      }
    }
  },

  postBlog: async function (blog) {
    console.log(`postBlog`);
    const response = await client.post("/blogs/", blog);
    console.log(response);
  },

  getBlogs: async function () {
    console.log(`getblogs`);
    const { response, data: dataList } = await client.get("/blogs/");

    const blogs = dataList.data;

    this.blogs = blogs;

    this.render();
    console.log(response, dataList);
  },

  datePicker: function () {
    // Date picker js
  },

  converter: function (content) {
    // console.log(`converter`);
    // regex patterns
    const telPattern = /((\+84|0)[\d]{9})/g;
    const emailPattern = /(([\w\.-]{3,})@([\w\.-]{1,}\.[a-z]{2,}))/g;
    const linkPattern =
      /((?:http|https):\/\/((?:[a-z0-9][a-z0-9-_\.]*\.|)[a-z0-9][a-z0-9-_\.]*\.[a-z]{2,}(?::\d{2,}|)(?:\/*|\/[^\s]+)))/gi;
    const youtubePattern =
      /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/g;
    const spacePattern = /\s+/g;
    const dropLinePattern = /\n+/g;

    // replacing logik
    function getId(url) {
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);

      return match && match[2].length === 11 ? match[2] : null;
    }
    const videoId = getId(`${content}`);
    const iframeMarkup =
      '<iframe width="560" height="315" src="//www.youtube.com/embed/' +
      videoId +
      '" frameborder="0" allowfullscreen></iframe>';
    if (content) {
      let replacedContent = content
        .replace(emailPattern, `<a href="mailto:$1">$1</a>`)
        .replace(telPattern, `<a href="tel:$1">$1</a>`)
        .replace(spacePattern, " ")
        .replace(dropLinePattern, "\n")
        .replace(youtubePattern, iframeMarkup)
        .replace(linkPattern, `<a href="$1" target="_blank">$2</a>`);
      return replacedContent;
    } else return;
  },

  logout: async function () {
    // console.log(`logout`);
    const { response } = await client.post("/auth/logout");
    localStorage.removeItem("login_token");
    client.setToken(null);
    if (response.ok) {
      this.render();
    }
    // } else console.log(`khong logout duoc`);
  },

  start: function () {
    //Khởi động ứng dụng
    this.getProfile();
    this.render();
    this.addEvent();
    this.datePicker();
    // this.converter();
  },
};

app.start();
