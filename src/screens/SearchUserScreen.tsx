import { View, Text, FlatList, Button, ScrollView, TextInput,StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import UserItem from '../components/renderUserItem';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { selectSelectedUserApi, setselectedUserApi } from '../redux/userApiSlice';
import { useDispatch } from 'react-redux';

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
        console.log(response.data.data[0]._id);
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
        <SafeAreaView>
            <ScrollView> 
            <View style={stylesSearchBar.container}>
        <TextInput
          style={stylesSearchBar.input}
          onChangeText={handleSearch}
          value={search}
          placeholder="Search for a user..."
          onChange={performSearch}
        />
      </View>
        <Button
            onPress={reloadUsers}
            title="Reload Database"
            />
            <FlatList
          data={usersData.flatMap(user => user.weatherSet)} 
          renderItem={({ item, index }) => <UserItem item={item} index={index} />}
          keyExtractor={(item) => item.id}
        />
        
        </ScrollView>
        </SafeAreaView>
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
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 10,
    },
  });