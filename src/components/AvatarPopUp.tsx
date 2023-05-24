import { View, StyleSheet,Text, ViewStyle,Image } from 'react-native'
import React from 'react'
import styles from '../../stylesheet';

const AvatarPopUp = ({x,y,avatar,name}:any) => {
    const style: ViewStyle = {
        position: 'absolute',
        left: x,
        top: y,
        borderRadius:15,
        flex:1,
        display:'flex',
        flexDirection:'row',
        maxWidth:70
    };

    return (
    <View style={style}>
        <View style={styles.AvatarPopUpContainer}>
        <Image
            source={{uri: avatar}}
            style={{width:30, height:30}}
          />
        </View>
        <View style={styles.AvatarPopUpNameContainer}>
            <Text>
                {name}
            </Text>
        </View>
    </View>
    );
}

export default AvatarPopUp