import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { selectSelectedUserApi, setselectedUserApi } from '../redux/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

type RootStackParamList = {
  SearchUserScreen: undefined;
  ChartUserScreen: undefined;
};

type UserItemProps = {
  item: any;
  index:any;
};
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

const UserItem: React.FC<UserItemProps> = ({ item, index }) => {
  const [usersData, setUsersData] = useState<User[]>([]);
  const dispatch = useDispatch();
  const user = useSelector(selectSelectedUserApi);
  

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/get-user-atomic');
      setUsersData(response.data.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
    
  
  const { first_name, last_name, avatar, weatherIcon } = item;

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'SearchUserScreen'>>();

  const handleClickOnItem = () => {
    navigation.navigate('ChartUserScreen');
    
    dispatch(
      setselectedUserApi({
        userAPI: usersData[index]
      })
      );
  }
  
  
  
  return (
    <TouchableOpacity
      style={styles.userItemContainer}
      onPress={handleClickOnItem}
    >
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.nameLabel} numberOfLines={1}>
          First Name
        </Text>
        <Text style={styles.name} numberOfLines={1}>
          {first_name}
        </Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.nameLabel} numberOfLines={1}>
          Last Name
        </Text>
        <Text style={styles.name} numberOfLines={1}>
          {last_name}
        </Text>
      </View>
      <Image source={{ uri: weatherIcon }} style={styles.weatherIcon} />
    </TouchableOpacity>
  );
};

export default UserItem;

const styles = StyleSheet.create({
  userItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingVertical: 20,
    margin: 10,
    marginHorizontal: 20,
    backgroundColor: 'rgba(255,255,255, 0.3)',
    borderRadius: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
    alignItems: 'center',
    rowGap: 5,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    color:'white'
  },
  nameLabel: {
    color:'white'
  },
  weatherIcon: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
});
