import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { REACT_APP_API_URL } = getEnvVariables();

const calendarApi = axios.create({
  baseURL: REACT_APP_API_URL,
});

export default calendarApi;
