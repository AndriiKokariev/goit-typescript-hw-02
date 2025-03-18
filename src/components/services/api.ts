import axios from "axios";

const accessKey: string = "6dh3ggcUis8n05PQO2TKthwn9aMZwu54YO5XW5iwyaQ";

axios.defaults.baseURL = "https://api.unsplash.com";
axios.defaults.headers.common["Authorization"] = `Client-ID ${accessKey}`;
axios.defaults.headers.common["Accept-Version"] = "v1";

interface ImageResponse {
  results: Array<{
    id: string;
    urls: {
      small: string;
      regular: string;
    };
    alt_description: string;
  }>;
}

export const findImages = async (
  query: string,
  page: number
): Promise<ImageResponse> => {
  const response = await axios.get<ImageResponse>(
    `/search/photos?page=${page}&per_page=12&query=${query}`
  );
  return response.data;
};
