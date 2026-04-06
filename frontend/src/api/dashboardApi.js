import HttpClient from "../helpers/httpClient";

export const getDashboardApi = () => {
  return HttpClient.get("/dashboard/");
};