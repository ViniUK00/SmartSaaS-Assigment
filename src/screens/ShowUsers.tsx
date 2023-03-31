import React, {useState,useEffect} from "react";
import { Text, View, Image, FlatList, ListRenderItemInfo } from 'react-native';
import fetchUserData, { Data, url } from "../../api/fetchUserData";
import styles from '../styles/ShowUsersStyles'

interface ShowLabelData {
  label: string;
  data: string | number | null | undefined;
  numberOfLines: number;
}

const ShowUsers: React.FC = () =>{
    const [usersData,setUsersData] = useState<Data[]>([]);
    const [isLoading,setIsLoading] = useState<Boolean>(true);
     

    useEffect(()=>{
        fetchUserData(url).then((data=>{
            setUsersData(data)
            setIsLoading(false)
        }))
    },[setUsersData])

    console.log(usersData);

    const ShowLabelData: React.FC<ShowLabelData> = ({label,data,numberOfLines}) => {
      return ( 
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>{label}</Text>
          <Text style={styles.dataText} numberOfLines={numberOfLines}>{data}</Text>
        </View>
      )
    }

    const user = ({ item }: ListRenderItemInfo<Data>) => (
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

    const headerComponent = () => {
        return(<Text style={styles.head}>Users</Text>)
    }

    const itemSeperator = () => {
        return <View style={styles.separator}/>
    }

    const LoadingComponent = ()=> {
      return(
        <Text>Loading</Text>
      )
    }
    
      return (
        isLoading?<LoadingComponent />:
        <View>
          <FlatList
            ListHeaderComponentStyle={styles.listHeader}
            ListHeaderComponent= {headerComponent}
            data={usersData}
            renderItem={user}
            ItemSeparatorComponent={itemSeperator}
          />
        </View>
      );
    };
    
    export default ShowUsers;