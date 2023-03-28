import React, {useState,useEffect} from "react";
import { Text, View, Image } from 'react-native';
import styles from '../styles/Profile_styles'
import fetchUserData, { Data, url } from "../api/fetchUserData";

const Profile: React.FC = () =>{
    const [userData,setUserData] = useState<Data>();
    const [isLoading,setIsLoading] = useState<Boolean>(true);
     

    useEffect(()=>{
        fetchUserData(url).then((data=>{
            setUserData(data)
            setIsLoading(false)
        }))
    },[])

    console.log(userData);
    
    if(isLoading) {
        return <Text>Loading...</Text>
    }
    
    return(
        <View style={styles.container}>
        {userData && (
          <View key={userData.id}>
            <Image
              style={styles.avatar}
              source={{
                uri: userData.avatar,
              }}
            />
            <Text style={styles.name}>
                {userData.first_name} {userData.last_name}
            </Text>
            <Text style={styles.email}>
                Email: {userData.email}
            </Text>
            <Text style={styles.phone_number}>
                Phone number: {userData.phone_number}
            </Text>
            <Text style={styles.date_of_birth}>
                Date of Birth: {userData.date_of_birth}
            </Text>
          </View>
        )}
      </View>
    )
}


export default Profile