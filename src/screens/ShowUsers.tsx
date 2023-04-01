import React, { useContext } from "react";
import { Text, View, Image, FlatList, ListRenderItemInfo } from 'react-native';
import { Data } from "../../api/fetchUserData";
import styles from '../styles/ShowUsersStyles'
import { UsersContext } from "../contexts/UsersContext";
import User from "../components/User";



const ShowUsers: React.FC = () =>{

  const { usersData, isLoading } = useContext(UsersContext);

    
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
            renderItem={User}
            ItemSeparatorComponent={itemSeperator}
          />
        </View>
      );
    };
    
    export default ShowUsers;