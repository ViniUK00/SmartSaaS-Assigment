import { StyleSheet } from "react-native";

export const iconStyles= StyleSheet.create({
  parentContainer: { justifyContent: "center", alignItems: "center", margin: 5 },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
    padding: 10,
    gap:15,
    borderRadius:20
  },
  text:{
    color: 'white',
  },
  webIcon:{
    padding: 10,
  },
  mobileIcon:{
    padding:10
  }
})