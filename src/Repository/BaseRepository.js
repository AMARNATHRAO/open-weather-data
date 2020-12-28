import axios from "axios";
import config from "../Config/Config.json";

const openweathermapAPIClient = axios.create({
  baseURL: config.urls.openweathermap,
});

export { openweathermapAPIClient };
