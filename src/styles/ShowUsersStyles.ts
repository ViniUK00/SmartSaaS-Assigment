import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  App:{
    backgroundColor: '#f1f2fc'
  },
  head:{
    color: 'black',
    fontSize:20,
    fontWeight: "bold"
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
    borderRadius:20,
    padding:7,
    backgroundColor: '#FFF',
    shadowOpacity:0.1,
    height:110
  },
  separator: {
    height:1,
    width:'100%',
    backgroundColor:'#CCC',
  },
  listHeader: {
    height:50,
    alignItems:'center',
    justifyContent:'center',
  },
  avatarContainer:{
    backgroundColor: '#89CFF0',
    borderRadius:100,
    height:80,
    width:80,
    justifyConent: 'center',
    alignItems:'center'
  },
  infoContainer:{
    flex:1,
    alignItems:'center',
    paddingVertical: 10,
    flexDirection: 'column',
  },
  labelContainer:{
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  labelText:{
    fontSize: 15,
    fontWeight: 'bold',
    paddingRight:20,
    marginRight:10,
    marginTop:10
  },
  dataText:{
    fontSize: 15,
    paddingRight:20,
    marginRight:10,
    alignItems:'flex-start',
    justifyContent: 'center'
  }
})
  export default styles;