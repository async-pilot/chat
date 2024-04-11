import axios from "axios";

export type RequestArgs = [url: string, queryParams?: Record<string, any>];
export type RequestArgsWithBody = [url: string, body: any, queryParams?: Record<string, any>];

export const apiGet = async (url: string): Promise<any> => {
  return axios
    .get("/api" + url)
    .then((r) => r.data)
    .catch((e) => {
      throw `error: ${e}`;
    });
};

export const apiGetExtended = async ([url, queryParams]: RequestArgs): Promise<any> => {
  return axios
    .get("/api" + url, { params: queryParams })
    .then((r) => r.data)
    .catch((e) => {
      throw `error: ${e}`;
    });
};

export const apiPost = async ([url, body, queryParams]: RequestArgsWithBody): Promise<any> => {
  return axios
    .post("/api" + url, body, { params: queryParams })
    .then((r) => r.data)
    .catch((e) => {
      throw `error: ${e}`;
    });
};

export const apiPatch = async ([url, body, queryParams]: RequestArgsWithBody): Promise<any> => {
  return axios
    .patch("/api" + url, body, { params: queryParams })
    .then((r) => r.data)
    .catch((e) => {
      throw `error: ${e}`;
    });
};

export const apiDelete = async (url: string): Promise<any> => {
  return axios
    .delete("/api" + url)
    .then((r) => r.data)
    .catch((e) => {
      throw `error: ${e}`;
    });
};
