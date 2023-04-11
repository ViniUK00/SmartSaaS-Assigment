import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  App:{
    backgroundColor: '#f1f2fc',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  head:{
    color: 'black',
    fontSize:20,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'flex-start',
    height:650,
    width:340,
    borderRadius: 80,
    color: '#FFFFFF',
  },
  button: {
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#1D2671',
    height:45,
    width:240,
    borderRadius: 100,
    padding:10,
    margin: 10,
  },
  button__text: {
    fontSize:20,
    color: 'white',
  },
  avatar: {
    height:150,
    width:150,
    borderRadius:50,
    marginTop: 40,
    marginBottom:60,
    marginLeft:65,
  },

  data__Container:{
    width:300,
    paddingLeft:16,
    paddingTop:8,
    paddingBottom:8,
    borderRadius:20,
    marginBottom:20,
    backgroundColor: 'white',
    shadowOpacity:0.2
  },
  data__Text: {
    fontSize:20,
    color: '#333333',
  }
  ,
  label__Container:{
    width:300,
    padding:5,
    paddingLeft:16,
    fontSize:20,
  },
  label__Text:{
    fontSize:18,
    color: 'white',
  },
  loading__container: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f2fc',
  }
})


  export default styles;