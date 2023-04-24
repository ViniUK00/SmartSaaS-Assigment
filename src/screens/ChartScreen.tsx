import { View, Text } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedPlace } from '../redux/locationSlice';
import Chart from '../components/Chart';

const ChartScreen = () => {
  const location = useSelector(selectSelectedPlace);

  return (
    <View>
      <Chart location={location} />
    </View>
  );
};

export default ChartScreen;
