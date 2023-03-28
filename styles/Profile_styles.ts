import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 0.3,
        borderWidth: 1,
        margin:5,
      },
    avatar: {
        width: 100,
        height: 100,
        margin:10,
      },
    name: {
      fontSize: 20,
      fontWeight: "bold",
      margin:10,
    },
    email: {
      fontSize: 14,
      marginLeft:10,
    },
    phone_number: {
        fontSize: 14,
        marginLeft:10,
    },
    date_of_birth: {
        fontSize: 14,
        marginLeft:10,
    }
  });

  export default styles;