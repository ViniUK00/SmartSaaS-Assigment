import { View, Text, FlatList, Button, ScrollView, TextInput,StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import UserItem from '../components/renderUserItem';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { selectSelectedUserApi, setselectedUserApi } from '../redux/userApiSlice';
import { useDispatch } from 'react-redux';
import styles from '../../stylesheet';

// const dispatch = useDispatch();

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

  type RootStackParamList = {
    SearchUserScreen: undefined;
    ChartUserScreen: undefined;
  };

  const SearchUserScreen = () => {
    const [usersData, setUsersData] = useState<User[]>([]);
    // const user = useSelector(selectSelectedUserApi);

    const [search, setSearch] = useState('');

    const handleSearch = (text:string) => {
      setSearch(text);
    };
  
    const navigation = useNavigation<any>();
    useLayoutEffect(()=>{
      navigation.setOptions({
        headerShown: false,
      })
    },[]
    )
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/get-user-atomic');
        setUsersData(response.data.data);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };

    const reloadUsers = () => {
        fetchUsers();
      };

    useEffect(() => {
      fetchUsers();
    }, []);



    const performSearch = async () => {
        try {
          const response = await axios.post('http://localhost:3000/search', {
            searchText: search,
          });
          setUsersData(response.data);
        } catch (error) {
          console.error('Error searching users', error);
        }
      };

      // const handleClick = ()=>{
      //   navigationStack.navigate('ChartUserScreen')
      //   // dispatch(
      //   //     setselectedUserApi({
      //   //       userAPI: usersData
      //   //     })
      //   //   );
      // }

      
      
    return (
      <ImageBackground
      source={require('../../assets/reports-background.png')}
      style={styles.backgroundImage}
    > 
    <SafeAreaView>
            <ScrollView> 
            <View style={stylesSearchBar.container}>
        <TextInput
          style={stylesSearchBar.input}
          onChangeText={handleSearch}
          value={search}
          placeholderTextColor={'white'}
          placeholder="Search for a user..."
          onChange={performSearch}
        />
      </View>
      <TouchableOpacity style={stylesSearchBar.button} onPress={reloadUsers}>
      <Text style={stylesSearchBar.buttonText}>Reload Database</Text>
    </TouchableOpacity>
            <FlatList
          data={usersData.flatMap(user => user.weatherSet)} 
          renderItem={({ item, index }) => <UserItem item={item} index={index} />}
          keyExtractor={(item) => item.id}
        />
        
        </ScrollView>
        </SafeAreaView>
        </ImageBackground>
    )
  }
  
  export default SearchUserScreen

  const stylesSearchBar = StyleSheet.create({
    container: {
      marginTop: 20,
      paddingHorizontal: 30,
    },
    input: {
      height: 40,
      borderColor: 'white',
      color:'white',
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 10,
    },
    button: {
      backgroundColor: 'rgba(128, 0, 128, 0.5)',
      paddingVertical: 10,
      borderRadius: 15,
      marginHorizontal:80,
      margin:10,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });