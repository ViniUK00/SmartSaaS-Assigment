import axios from "axios";
import React, {useState} from "react";
import {Text, View } from 'react-native';
import { useQuery } from "react-query";

const URL = 'https://random-data-api.com/api/v2/users?size=2&is_xml=true'

export default function UseQueryData() {


    const [usersData,setUsersData] = useState([]);

    interface Data {
        first_name: string;
        last_name: string;
        email: string;
        id: number;
    }
    
    const {data, status} = useQuery('user', ()=> axios.get(URL).then(res=>setUsersData(res.data)));

    if(status === 'loading') {
        return <Text>Loading...</Text>
    }
    console.log(usersData);
    

    return (
        <View>
            {usersData?.map((user:Data) => 
            <Text key={user.id}>
                {user.first_name} {user.last_name} {user.email} 
            </Text>)}
            </View>
    )
}

