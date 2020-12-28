import { openweathermapAPIClient } from "./BaseRepository";
import config from "../Config/Config.json";

export const fetchWhetherDetails = (city, country) => {
  return openweathermapAPIClient.get(
    `weather?q=${city},${country}&appid=${config.appId}`
  );
};
export const fetchFiveDayWhetherForecastDetails = (city, country) => {
  return openweathermapAPIClient.get(
    `forecast?q=${city},${country}&appid=${config.appId}`
  );
};
