import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { LineChart } from 'react-native-chart-kit';
import { useSelector } from 'react-redux';
import { selectSelectedUserApi } from '../redux/userApiSlice';

const ChartUserScreen = () => {

  const user = useSelector(selectSelectedUserApi);
  const temperatures:any = [];

  user.userAPI.weatherPush.forEach((weather:any) => {
    const temp = Number((weather.temp - 273.1).toFixed(0));
    temperatures.push(temp);
  })
  
  console.log(temperatures);
  
  return (
<>
      <LineChart
        data={{
          labels: ['January', 'February', 'March', 'April'],
          datasets: [
            { 
              data: temperatures,
              strokeWidth: 3,
            },
          ],
        }}
        width={Dimensions.get('window').width - 16}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </>
  )
}

export default ChartUserScreen