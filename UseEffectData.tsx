import axios from "axios";
import React, {useState,useEffect} from "react";
import {Text, View } from 'react-native';

const URL = 'https://random-data-api.com/api/v2/users?size=2&is_xml=true'

export default function UseEffectData(){
    const [usersData,setUsersData] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    

    interface Data {
        first_name: string;
        last_name: string;
        email: string;
        id: number;
    } 

    useEffect(()=>{
        axios.get(URL)
        .then((res)=>{
            setUsersData(res.data)
            setIsLoading(false)
        })
    },[])

    console.log(usersData);
    
    if(isLoading) {
        return <Text>Loading...</Text>
    }
    
    return(
        
            <View>
            {usersData?.map((user:Data) => 
            <Text key={user.id}>
                {user.first_name} {user.last_name} {user.email} 
            </Text>)}
            </View>
    )
}

