import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { REACT_APP_API_URL } = getEnvVariables();

const calendarApi = axios.create({
  baseURL: REACT_APP_API_URL,
});

const token = localStorage.getItem("token");
if (token) {
  calendarApi.interceptors.request.use(
    (config) => {
      if (!config.headers) {
        config.headers = {};
      }

      config.headers["x-token"] = token;

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

export default calendarApi;
