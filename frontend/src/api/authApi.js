import HttpClient from "../helpers/httpClient";

export const loginApi = (data) => {
  return HttpClient.post("/auth/login/", data);
};