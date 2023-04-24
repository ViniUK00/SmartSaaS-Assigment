// WeatherCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


interface ExtraInfoCardProps {
  city: string;
  temperature: number;
  condition: string;
  data: Array<{ label: string; value: string | number; metric: string }>;
}

const ExtraInfoCard: React.FC<ExtraInfoCardProps> = ({ city, temperature, condition, data }) => {
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <View key={index} style={styles.labe_data_container}>
          <Text style={styles.label_text}>{item.label}</Text>
          <Text style={styles.data_text}>{item.value} {item.metric}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection:'row',
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '90%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    opacity:0.9
    
  },
  labe_data_container:{
    padding:1,
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    flexDirection:'column',
  },
  label_text:{
    fontSize:15,
    color: '#333333',
    paddingBottom:7
  },
  data_text:{
    fontSize:17,
    fontWeight:'bold'
  }
});

export default ExtraInfoCard;