import { config } from "./config.js";

const { SERVER_API } = config;

export const client = {
  serverApi: SERVER_API,
  token: null,
  // apiKey: client.getApiKey(),
  setUrl(url) {
    this.serverApi = url;
  },
  setToken(token) {
    this.token = token;
  },
  send: async function (url, method = "GET", body = null) {
    url = `${this.serverApi}${url}`;
    if (!this.apiKey && !this.isGettingApiKey) {
      await this.getApiKey();
    }
    const headers = {
      "Content-Type": "application/json",
      "X-Api-Key": this.apiKey,
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
  delete: function (url) {
    return this.send(url, "DELETE");
  },
  getApiKey: async function () {
    this.isGettingApiKey = true;
    // const res = await this.get("/api-key?email=082.hoangtuankiet@gmail.com");
    const url = `${this.serverApi}/api-key?email=082.hoangtuankiet@gmail.com`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const { apiKey } = data.data;

    this.apiKey = apiKey;
    this.isGettingApiKey = false;
    // return apiKey;
  },
};
