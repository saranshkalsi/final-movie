import axios from "axios";

export const apiToken = import.meta.env.VITE_STRAPI_API_TOKEN;
export const strapiUrl = import.meta.env.VITE_STRAPI_URL;

export const customFetch = axios.create({
  baseURL: strapiUrl,
  headers: {
    Authorization: `Bearer ${apiToken}`,
  },
});
