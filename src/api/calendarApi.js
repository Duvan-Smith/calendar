import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { REACT_APP_API_URL } = getEnvVariables();

const calendarApi = axios.create({
  baseURL: REACT_APP_API_URL,
});

const token = localStorage.getItem("token");
if (token) {
  calendarApi.interceptors.request.use((config) => {
    config.headers = {
      ...config,
      "x-token": token,
    };
    return config;
  });
}

export default calendarApi;
