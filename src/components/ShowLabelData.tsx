import { View, Text } from 'react-native'
import React from 'react'
import styles from '../styles/ShowUsersStyles'

interface ShowLabelDataType {
    label: string;
    data: string | number | null | undefined;
    numberOfLines: number;
  }

const ShowLabelData: React.FC<ShowLabelDataType> = ({label,data,numberOfLines}) => {
    return ( 
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{label}</Text>
        <Text style={styles.dataText} numberOfLines={numberOfLines}>{data}</Text>
      </View>
    )
  }

export default ShowLabelData