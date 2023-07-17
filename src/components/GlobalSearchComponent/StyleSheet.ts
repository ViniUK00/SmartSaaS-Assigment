import { StyleSheet } from "react-native";

const searchStyles = StyleSheet.create({
  container:{
    
  },
  containerStyle: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ececec',
    borderRadius: 40,
    minHeight: 65,
    margin: 15,
    paddingHorizontal: 20,
    zIndex: 2,
    shadowRadius: 20,
    shadowOpacity: 0.2,          
  },
  inputStyle: {
    flex: 5,
    flexGrow:9,
    backgroundColor: 'white',
    minHeight: 40, 
    borderRadius: 30,
    paddingHorizontal: 10
  },
  iconStyle: {
    maxWidth: 50,
    flex: 1, 
    alignSelf: 'center', 
    alignContent: 'center', 
    alignItems: 'center', 
    minWidth: 50,
  },
  searchIconStyle: { minWidth: 35, overflow: 'visible', zIndex: 1
  },
  iconArrayStyle: {
    flexDirection:'row',
    gap: 15
  },
  extendedMenuContainer:{
    gap: 15,
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 20,
    flexDirection: "column",
    overflow: "hidden",
    top: 10,
    left: -9,
    paddingVertical: 20,
    shadowRadius:20,
    shadowOpacity:0.5,

  },
  arrowStyle:{
    transform: [{ rotateZ: "45deg" }],
    width: 15,
    zIndex: 5,
    height: 15,
    position: "absolute",
    backgroundColor: "white",
    bottom:-19.5,
    left: 9,
  }
});

export default searchStyles;