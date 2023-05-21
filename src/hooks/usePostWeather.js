import { useEffect } from 'react';
import { postWeather } from '../../api/postWeatherData'

export const usePostWeather = (weatherInfo) => {
  useEffect(() => {
    if (weatherInfo) {
      postWeather(weatherInfo)
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
    }
  }, [weatherInfo]);
};
