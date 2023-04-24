import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LineChart } from 'react-native-chart-kit'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getForecast } from '../../api/fetchWeatherData';
import { ForecastRes } from '../types/ForecastApiResponse';
import { useSelector } from 'react-redux';
import { selectSelectedPlace } from '../redux/locationSlice';

interface ChartProps {
  location: ReturnType<typeof selectSelectedPlace>;
}

const Chart = ({ location }: ChartProps) => {    
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
    
    
  return (
    <SafeAreaView>
        {forecastData? <LineChart
        data={{
          labels: ['00:00', '03:00', '06:00', '09:00'],
          datasets: [
            {
              data: [
                Number((forecastData?.list[0].main.temp - 273.1).toFixed(0)),
                Number((forecastData?.list[2].main.temp - 273.1).toFixed(0)),
                Number((forecastData?.list[4].main.temp - 273.1).toFixed(0)),
                Number((forecastData?.list[6].main.temp - 273.1).toFixed(0)),
                Number((forecastData?.list[8].main.temp - 273.1).toFixed(0)),
              ],
            },
          ],
        }}
        width={Dimensions.get('window').width - 16} // from react-native
        height={220}
        onDataPointClick={(e)=>{console.log('Data point clicked', e)}}
        yAxisSuffix='°C'
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      /> : <Text>Loading</Text> }
         
    </SafeAreaView>
  )
}

export default Chart

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: 10,
    },
    header: {
      textAlign: 'center',
      fontSize: 18,
      padding: 16,
      marginTop: 16,
    },
  });