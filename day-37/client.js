import { config } from "./config.js";

const { SERVER_API } = config;

export const client = {
  serverApi: SERVER_API,
  token: null,
  setUrl(url) {
    this.serverApi = url;
  },
  setToken(token) {
    this.token = token;
  },
  send: async function (url, method = "GET", body = null) {
    url = `${this.serverApi}${url}`;
    const headers = {
      "Content-Type": "application/json",
    };
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }
    const options = {
      method,
      headers,
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    const response = await fetch(url, options);

    const data = await response.json();

    return { response, data };
  },
  // http get
  get: function (url) {
    return this.send(url);
  },
  // http post
  post: function (url, body) {
    return this.send(url, "POST", body);
  },
  // http put
  put: function (url, body) {
    return this.send(url, "PUT", body);
  },
  // http patch
  patch: function (url, body) {
    return this.send(url, "PATCH", body);
  },
  // http delete
  patch: function (url) {
    return this.send(url, "DELETE");
  },
};
