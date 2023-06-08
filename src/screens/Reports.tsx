import { View, Text, ScrollView, ImageBackground} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from '../../stylesheet';
import { LineChart } from 'react-native-chart-kit';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import AvatarPopUp from '../components/AvatarPopUp';
import { LinearGradient } from 'expo-linear-gradient';

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

    // Reload Picker
    const [reload, setReload] = useState<any>(false);

    // For the chart with the frequency filter
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("daily");
    const [items, setItems] = useState([
        {label: 'Minutely', value: 'minutely'},
        {label: 'Hourly', value: 'hourly'},
        {label: 'Daily', value: 'daily'}
        ]);

        
    // For the chart with the user filter
    const [openChart2, setOpenChart2] = useState(false);
    const [valueChart2, setValueChart2] = useState(null);
    const [itemsChart2, setItemsChart2] = useState([]);
    const [weatherPosts, setWeatherPosts] = useState<any>({});
    
    const weatherTypes = ["Clear", "Clouds", "Rain"];

    // Show avatar logic
    const [clicked,setClicked] = useState(false); 
    const [showAvatar, setShowAvatar] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [dataPointUserId, setDataPointUserId] = useState<string>("");
    const [dataPointClickData, setDataPointClickData] = useState<any>();

    // initializing the weather count for each user
    const [weatherCountAll,setWeatherCountAll] = useState([]);

    // headers for the table
    const header = ["",'Clear', 'Clouds', 'Rain'];
  
    // fetching most weather posts filtered by weather type and period
    const fetchWeatherPosts = async (type:string, period:string) => {
        const response = await axios.get(`http://localhost:3000/weather/most-posts?type=${type}&period=${period}`);
        return response.data;
      };

    // calling the fetchWeatherPosts every time the value changes
    // value could be (minutely, hourly, etc..)
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

  // function to show the user avatar who has posted more 
  // weather depending on the weather type setting up the id of the
  // user in the key prop of the corresponding chart.
  const showPeakUser = async (e: any) => {
    setClicked(!clicked);
    setX(e.x);
    setY(e.y);
    if (!clicked) {
      setShowAvatar(!showAvatar);
    }
    setDataPointUserId(e.dataset.key);
    console.log(e);
    console.log(showAvatar, "show avatar");
    console.log(clicked, "clicked");
  }

  // clears the tab header
const navigation = useNavigation<any>();
    useLayoutEffect(()=>{
      navigation.setOptions({
        headerShown: false,
      })
    },[])

    // fetch all current user name for the dropdown menu (for the second chart)
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/get-user-atomic');
        setUsersData(response.data.data);
        const items = response.data.data.map((user: { first_name: string; last_name: string; id:any; }) => ({
          label: `${user.first_name} ${user.last_name}`,
          value: `${user.id}`,
      }));
      setItemsChart2(items);
      setReload(false)
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };

    // calling once
    //TODO onPickerOpen reload the dropdown
    //TODO search through the list
    useEffect(() => {
      fetchUsers();
  }, [reload]);

    
    // function to fetch the weather count for each weather type filtered by id
    // depending on the value of the corresponding dropdown
    const fetchUserWeatherDataChart2 = async (id:string) => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${id}`);
        setUserWeatherData(response.data.data.weatherCount);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // calling it whenever the dropdown value changes 
    useEffect(() => {
      if(valueChart2) {
        fetchUserWeatherDataChart2(valueChart2);
      }
    }, [valueChart2]);


    // function to fetchAllWeatherTypePosts count for the table
    const fetchAllWeatherTypePosts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/weather/getAllWeatherTypePostCount`);
        const mappedData = response.data.map((
          item: { first_name: string; weatherCounts: { Clear: string; Clouds: string; Rain: string; }; }) => [
          item.first_name,
          item.weatherCounts.Clear || '0',
          item.weatherCounts.Clouds || '0',
          item.weatherCounts.Rain || '0',
        ]);
        setWeatherCountAll(mappedData);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    // calling fetchAllWeatherTypePosts once the tab opens
    useEffect(() => {
      fetchAllWeatherTypePosts();
    }, []);

    // fetch data by the id
    const fetchUserDataById = async (id:string) => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${id}`);
        setDataPointClickData(response.data.data.weatherSet)
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    // calling the fetchUserDataById everytime we click diffent pointer on the chart
    useEffect(() => {
      if (dataPointUserId) {
        fetchUserDataById(dataPointUserId)
      }
    }, [dataPointUserId]);

    
  return (
    <LinearGradient colors={['#C33764','#1D2671']} style={{flex:1}}>
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
          <View>
            <View style={styles.label_reportsContainer}>
            <Text style={styles.label_reports}>Time</Text>
            </View>
          
          {weatherPosts ? <LineChart
    data={{
        labels:[],
        datasets: [
            {
                data: [0,0,0,weatherPosts.Clear ? weatherPosts.Clear[0].count: 0,0],
                color: () => `rgba(0, 0, 139, 1)`,
                key:weatherPosts.Clear ? weatherPosts.Clear[0]._id: 0,
            },
            {
                data: [0,0,weatherPosts.Clouds ? weatherPosts.Clouds[0].count : 0,1,0],
                color: () => `rgba(156, 114, 72,1)`,
                key:weatherPosts.Clouds ? weatherPosts.Clouds[0]._id:0
            },
            {
                data: [0,weatherPosts.Rain ? weatherPosts.Rain[0].count:0,1,0],
                color: () => `rgba(139, 0, 0, 1)`,
                key:weatherPosts.Rain ? weatherPosts.Rain[0]._id : 0
            }
        ],
    }}
    height={200}
    width={380}
    withDots={true}
    withHorizontalLabels={false}
    withInnerLines={false}
    onDataPointClick={showPeakUser}
    horizontalLabelRotation={180}
    chartConfig={{
      backgroundGradientFrom: "#1E2923",
      backgroundGradientFromOpacity: 0.1,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0.3,
        strokeWidth:2,
        color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
    }}
    bezier
    style={{
      borderRadius:15,
      justifyContent:'center',
      alignItems:'center',
      paddingHorizontal:10,
    }}
></LineChart> : <Text>Loading</Text>}
{showAvatar && <AvatarPopUp x={x} y={y} avatar={dataPointClickData?.avatar} name={dataPointClickData?.first_name + " " + dataPointClickData?.last_name}/>}
          </View>
        
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
                color: () => `rgba(255, 255, 255, 1)`,
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
      backgroundGradientFrom: "#1E2923",
      backgroundGradientFromOpacity: 0.1,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0.3,
        decimalPlaces:1,
        strokeWidth:2,
        color: () => `rgba(0, 0, 0, 1)`,
        style: {
        },
    }}
    bezier
    style={{
      borderRadius:15,
      justifyContent:'center',
      alignItems:'center',
      paddingHorizontal:10,
    }}
/>

        </View>
        <View style={styles.dropdown_container_reports}>
            <DropDownPicker
                open={openChart2}
                value={valueChart2}
                items={itemsChart2}
                setOpen={setOpenChart2}
                setValue={setValueChart2}
                onPress={()=>{setReload(true)}}
                placeholder='User'
                style={styles.dropdown_reports}
                searchable={true}
                containerStyle={{
                    width:150,
                    margin:10
                    }}
            />
        </View>
        <View>
            <Table borderStyle={styles.tableBorder} style={styles.tableContainer}>
                <Row data={header} textStyle={styles.tableHeaderText} />
                <Rows data={weatherCountAll} textStyle={styles.tableText} />
            </Table>
        </View>
        </View>
        </ScrollView>
    </SafeAreaView>
    </LinearGradient>
  )
}

export default Reports