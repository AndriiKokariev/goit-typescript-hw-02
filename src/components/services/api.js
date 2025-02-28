import axios from "axios";

const accessKey = "6dh3ggcUis8n05PQO2TKthwn9aMZwu54YO5XW5iwyaQ";

axios.defaults.baseURL = "https://api.unsplash.com";
axios.defaults.headers.common["Authorization"] = `Client-ID ${accessKey}`;
axios.defaults.headers.common["Accept-Version"] = "v1";

export const findImages = async (query, page) => {
  return axios.get(`/search/photos?page=${page}&per_page=12&query=${query}`);
};
