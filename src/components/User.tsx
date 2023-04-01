import { View, Image, ListRenderItemInfo } from 'react-native'
import React from 'react'
import { Data } from '../../api/fetchUserData';
import styles from '../styles/ShowUsersStyles';
import ShowLabelData from './ShowLabelData';


  const User = ({ item }: ListRenderItemInfo<Data>) => (
    <View style={styles.container}>
          <Image
            style={styles.avatarContainer}
            source={{uri: item.avatar}}
          />
    <View style={styles.infoContainer}>
      <ShowLabelData label="First Name" data={item.first_name} numberOfLines={1} />
      <ShowLabelData label="Email" data={item.email} numberOfLines={1} />
    </View>
    <View style={styles.infoContainer}>
      <ShowLabelData label="Last Name" data={item.last_name} numberOfLines={1} />
      <ShowLabelData label="Mobile" data={item.phone_number} numberOfLines={1} />
    </View>
  </View>
    );

export default User