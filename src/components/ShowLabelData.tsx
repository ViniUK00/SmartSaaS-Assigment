import { View, Text } from 'react-native'
import React from 'react'
import styles from '../../stylesheet'

interface ShowLabelDataType {
    label: string | undefined;
    data: string | number | undefined;
    icon: any | undefined;
  }

const ShowLabelData: React.FC<ShowLabelDataType> = ({label,data,icon}) => {
    return ( 
      <View>
        <View style={styles.label__Container}>
          <Text style={styles.label__Text}>{icon} {label}</Text>
        </View>
        <View style={styles.data__Container}>
          <Text style={styles.data__Text}>{data}</Text>
        </View>
      </View>
    )
  }

export default ShowLabelData