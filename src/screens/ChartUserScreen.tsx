import { View, Text, Dimensions, ImageBackground } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { BarChart, LineChart, StackedBarChart } from 'react-native-chart-kit';
import { useSelector } from 'react-redux';
import { selectSelectedUserApi } from '../redux/userApiSlice';
import styles  from '../../stylesheet'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';



const ChartUserScreen = () => {

  const navigation = useNavigation<any>();
    useLayoutEffect(()=>{
      navigation.setOptions({
        headerShown: false,
      })
    },[])


  const user = useSelector(selectSelectedUserApi);
  const temperatures:any = [];

  user.userAPI.weatherPush.forEach((weather:any) => {
    const temp = Number((weather.temp - 273.1).toFixed(0));
    temperatures.push(temp);
  })
  
  console.log(temperatures);
  
  return (

<ImageBackground
      source={require('../../assets/reports-background.png')}
      style={styles.backgroundImage}
    >
      <SafeAreaView>
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
        backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0.1,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.3,
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        
      }}
      style={{
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:10,
        padding:12
      }}
    />

    <BarChart
        data={{
          labels: ['January', 'February', 'March', 'April'],
          datasets: [
            {
              data: temperatures
            },
          ],
        }}
        width={Dimensions.get('window').width - 16}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#1E2923",
          backgroundGradientFromOpacity: 0.1,
          backgroundGradientTo: "#08130D",
          backgroundGradientToOpacity: 0.3,
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          
        }}
        
        style={{
          borderRadius:15,
          justifyContent:'center',
          alignItems:'center',
          paddingHorizontal:10,
          padding:12
        }}
      />
    <View style={styles.lottieContainer}>
      <LottieView
        style={styles.lottieChart}
        source={require('../../assets/143740-ai-powered-marketing-tools-abstract.json')}
        autoPlay
        loop
      />
      </View>
    </SafeAreaView>
    </ImageBackground>
  )
}

export default ChartUserScreen