import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from '../../stylesheet';
import { LineChart } from 'react-native-chart-kit';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

type WeatherData = {
  _id: string;
  first_name: string;
  last_name: string;
  avatar: string;
  id: string;
  weather: string;
};

type User = {
  id: string;
  first_name: string;
  last_name: string;
  avatar: string;
  weatherPush: WeatherData[];
  weatherSet: WeatherData[];
};

const Reports = () => {
    const [usersData, setUsersData] = useState<User[]>([]);
    const [userWeatherData, setUserWeatherData] = useState<any>();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("daily");
    const [items, setItems] = useState([
        {label: 'Minutely', value: 'minutely'},
        {label: 'Hourly', value: 'hourly'},
        {label: 'Daily', value: 'daily'}
        ]);

        const [openChart2, setOpenChart2] = useState(false);
        const [valueChart2, setValueChart2] = useState(null);
        const [itemsChart2, setItemsChart2] = useState([]);
    const [weatherPosts, setWeatherPosts] = useState<any>({});
    
    const weatherTypes = ["Clear", "Clouds", "Rain"];

    const [showUser, setShowUser] = useState(false);
    const [clicked,setClicked] = useState(false); 

    const fetchWeatherPosts = async (type:string, period:string) => {
        const response = await axios.get(`http://localhost:3000/weather/most-posts?type=${type}&period=${period}`);
        return response.data;
      };

    useEffect(() => {
    const fetchAllWeatherPosts = async () => {
      const newWeatherPosts:any = {};

      for (const type of weatherTypes) {
        const data = await fetchWeatherPosts(type, value);
        newWeatherPosts[type] = data;
      }

      setWeatherPosts(newWeatherPosts);
    };

    fetchAllWeatherPosts();
  }, [value]);

  const showPeakUser = (e:any) =>{
    console.log(e);
    if (e) {
      setClicked(true)
    }
  }
    console.log(clicked);
    

    const navigation = useNavigation<any>();
    useLayoutEffect(()=>{
      navigation.setOptions({
        headerShown: false,
      })
    },[])
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/get-user-atomic');
        console.log(response.data.data[0]._id);
        setUsersData(response.data.data);
        const items = response.data.data.map((user: { first_name: string; last_name: string; id:any; }) => ({
          label: `${user.first_name} ${user.last_name}`,
          value: `${user.id}`,
      }));
      setItemsChart2(items);
      
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };

    useEffect(() => {
      fetchUsers();
  }, []);


    console.log(weatherPosts);
    
    const fetchUserWeatherDataChart2 = async (id:string) => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${id}`);
        console.log(response.data.data.weatherCount);
        setUserWeatherData(response.data.data.weatherCount);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    useEffect(() => {
      fetchUserWeatherDataChart2(valueChart2?valueChart2:"0");
    }, [valueChart2]);
    
    
    
  return (
    <SafeAreaView style={{flex:1}} >
        <ScrollView
        nestedScrollEnabled={true}>
          <View>
            
          <View style={{flexGrow:1}}>
          <View style={styles.weathertypes_container}>
          <Text style={styles.weatherTypeText}>
            <FontAwesome name="square" size={15} color="#00008B" /> Clear
          </Text>
          <Text style={styles.weatherTypeText}> 
            <FontAwesome name="square" size={15} color="#9c7248"/> Clouds
          </Text>
          <Text style={styles.weatherTypeText}>
          <FontAwesome name="square" size={15} color="#8b0000" /> Rain
          </Text>
          </View>
        {weatherPosts ? <LineChart
    data={{
        labels:[],
        datasets: [
            {
                data: [1,weatherPosts.Clear ? weatherPosts.Clear[0].count: 0,0],
                color: () => `rgba(0, 0, 139, 1)`,
            },
            {
                data: [1,weatherPosts.Clouds ? weatherPosts.Clouds[0].count : 0,0],
                color: () => `rgba(156, 114, 72,1)`
            },
            {
                data: [1,weatherPosts.Rain ? weatherPosts.Rain[0].count:0,0],
                color: () => `rgba(139, 0, 0, 1)`
            }
        ],
    }}
    height={200}
    width={380}
    withDots={true}
    withHorizontalLabels={false}
    withInnerLines={false}
    onDataPointClick={showPeakUser}
    chartConfig={{
        backgroundColor: '#1cc910',
        backgroundGradientFrom: '#eff3ff',
        backgroundGradientTo: '#efefef',
        strokeWidth:2,
        color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 30,
            flex:1
        },
    }}
    bezier
    style={{
        marginBottom:8,
        borderRadius: 12,
        borderWidth:1,
        margin:45,
        paddingRight:35,
        paddingTop:20
    }}
/>: <Text>Loading</Text>}
        <Text style={styles.label_reports}>Time</Text>
        <Text style={styles.label_y_axis_reports}>Frequency</Text>
        </View>
        <View style={styles.dropdown_container_reports}>
            <Text style={styles.dropdown_label_reports}>Frequency</Text>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder='Daily'
                style={styles.dropdown_reports}
                containerStyle={{
                    width:150,
                    margin:10,
                    }}
            />
        </View>
        <View>
        <LineChart
    data={{
        labels:['Clouds', 'Clear', 'Rain', 'Snow'],
        datasets: [
            {
                data: [
                  Number((userWeatherData?.Clouds || 0)),
                  Number((userWeatherData?.Clear || 0)),
                  Number((userWeatherData?.Rain || 0)),
                  Number((userWeatherData?.Snow || 0))],
                color: () => `rgba(0, 0, 139, 1)`,
            },
        ],
    }}
    height={200}
    width={380}
    withDots={true}
    withHorizontalLabels={true}
    withVerticalLines={false}
    decorator={()=>{<Text>Hello</Text>}}
    withInnerLines={false}
    onDataPointClick={showPeakUser}
    segments={4}
    chartConfig={{
        backgroundColor: '#111111',
        backgroundGradientFrom: '#eff3ff',
        backgroundGradientTo: '#efefef',
        decimalPlaces:1,
        strokeWidth:2,
        color: () => `rgba(0, 0, 0, 1)`,
        style: {
        },
    }}
    bezier
    style={{
        marginBottom:8,
        borderRadius: 16,
        borderWidth:1,
        margin:35,
        paddingRight:35,
        paddingTop:20
    }}
/>
        </View>
        <View style={styles.dropdown_container_reports}>
            <Text style={styles.dropdown_label_reports}>Frequency</Text>
            <DropDownPicker
                open={openChart2}
                value={valueChart2}
                items={itemsChart2}
                setOpen={setOpenChart2}
                setValue={setValueChart2}
                placeholder='User'
                style={styles.dropdown_reports}
                containerStyle={{
                    width:150,
                    margin:10
                    }}
            />
        </View>
          </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Reports