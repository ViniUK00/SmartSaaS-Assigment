import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedPlace } from '../redux/locationSlice';
import { ForecastRes } from '../types/ForecastApiResponse';
import { getForecast } from '../../api/fetchWeatherData';
import moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';

const Forecast = () => {
  const location = useSelector(selectSelectedPlace);
  console.log('saddsaasdad', location?.location?.latitude);

  const [forecastData, setForecastData] = useState<ForecastRes | undefined>();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if (location?.location) {
          const latitude = location.location.lat || location.location.latitude;
          const longitude = location.location.lng || location.location.longitude;
          const data = await getForecast(latitude, longitude);
          setForecastData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (location?.location) {
      fetchWeather();
    }
  }, [location]);
  
  const renderItem = ({ item }:any) => {
    const day = moment(item.dt_txt).format('dddd');
    const icon = item.weather[0].icon;
    const minTemp = (item.main.temp_min - 273.15).toFixed(0);
    const maxTemp = (item.main.temp_max - 273.15).toFixed(0);

    return (
      <View style={styles.containerDay}>
        <Text style={styles.textDat}>{day}</Text>
        <Image
          style={styles.weatherIcon}
          source={{
            uri: `https://openweathermap.org/img/wn/${icon}@2x.png`,
          }}
        />
        <Text style={styles.textTemp}>
          {minTemp}° - {maxTemp}°
        </Text>
      </View>
    );
  };

  const forecastItems = forecastData?.list?.filter((_, index) => index % 8 === 0);

  return (
    <LinearGradient colors={[
      'rgba(135, 206, 235, 0.7)',
      'rgba(57, 141, 203, 1)',
      'rgba(135, 206, 235, 0.7)',
        ]} style={styles.container}>
      <FlatList
        data={forecastItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.dt_txt}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </LinearGradient>
  );
};

export default Forecast;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '40%',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 30,
    width: '90%',
    paddingHorizontal: 10,
  },
  containerDay: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  textDat: {
    color: 'white',
    fontWeight: '600',
    marginBottom: 10,
  },
  textTemp: {
    color: 'white',
    fontWeight: '600',
    marginTop: 10,
  },
  weatherIcon: {
    height: 50,
    width: 50,
  },
});
