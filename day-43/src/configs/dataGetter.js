import { client } from "./client.js";

export async function getApiKey(email) {
  const { response, data } = await client.get(`/api-key?email=${email}`);
  if (response.ok) {
    localStorage.setItem("apiKey", data.data.apiKey);
    localStorage.setItem("userEmail", email);
    client.setToken(data.data.apiKey);
  }
}

export async function getProducts() {
  const { data, response } = await client.get(`/products?limit=8`);
  if (!response.ok) {
    localStorage.clear();
    window.location.reload();
  }
  return data;
}

export async function getUsersProfile() {
  const { data: dataList } = await client.get(`/users/profile`);
  // localStorage.setItem("name", dataList.data.emailId.name);
  return dataList;
}
