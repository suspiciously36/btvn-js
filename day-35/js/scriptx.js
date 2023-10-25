let currentPage = 1;
let isFetching = false;
let hasMore = true;

let root = document.querySelector(".home-page");

const serverAPI = `https://p9shrn-8080.csb.app`;

const fetchData = async function () {
  const stripHTML = (html) => html.replaceAll(/(<([^>]+)>)/gi, "");
  isFetching = true;

  let response = await fetch(`${serverAPI}/posts?_page=${currentPage}`);

  let data = await response.json();

  console.log(data);

  isFetching = false;

  if (data.length === 0) {
    hasMore = false;
    return;
  }

  for (let post of data) {
    let div = document.createElement("div");
    div.innerHTML = `<h2 style="padding-left: 400px">${stripHTML(
      post.title
    )}</h2>
    <img src=${post.image} style="padding-left: 400px"/>
    <p style="padding-left: 400px">${stripHTML(post.excerpt)}</p>`;
    root.appendChild(div);
  }

  currentPage++;
};

window.addEventListener("scroll", () => {
  if (isFetching || !hasMore) {
    return;
  }
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    setTimeout(() => {
      fetchData();
    }, 100);
  }
});

fetchData();
