import { View, Image, ListRenderItemInfo,Text } from 'react-native'
import React from 'react'
import { Data } from '../../api/fetchUserData';
import styles from '../../stylesheet';
import ShowLabelData from './ShowLabelData';
import { Entypo,FontAwesome5,FontAwesome } from '@expo/vector-icons'; 

type UserProps = { item: Data };

const fNameIcon = <FontAwesome name="user" size={20} color="white" />
const mailIcon = <Entypo name="mail" size={20} color="white" />
const lNameIcon = <FontAwesome5 name="house-user" size={20} color="white" />
const phoneIcon = <Entypo name="phone" size={20} color="white" />

  const User = ({ item }: UserProps) => (
   <View >
          <Image
            source={{uri: item?.avatar}}
            style={styles.avatar}
          />
    <View style={styles.test}>
      <ShowLabelData icon={fNameIcon} label="First Name" data={item?.first_name}/>
      <ShowLabelData icon={lNameIcon} label="Last Name" data={item?.last_name}/>
      <ShowLabelData icon={mailIcon} label="Email" data={item?.email} />  
      <ShowLabelData icon={phoneIcon} label="Mobile" data={item?.phone_number} />
    </View>
    </View>
    
    );

export default User