import axios from 'axios';
import { WEATHER_APIKEY } from "@env";


export const getWeather = async (lat: number, lng: number ) => {
  const URL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&appid=${WEATHER_APIKEY}`;

  try {
    const response = await axios.get(URL);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {  
    throw error;
  }}

  export const getForecast = async (lat: number, lng: number ) => {
    const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${WEATHER_APIKEY}`;
  
    try {
      const response = await axios.get(URL);
      const data = response.data;
      console.log( 'hehhehe', data);
      return data;
    } catch (error) {
      console.log(error);    
      throw error;
    }
}
