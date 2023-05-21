import { StyleSheet } from 'react-native';
import { isJSDocUnknownTag } from 'typescript';

const styles = StyleSheet.create({
  App:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding:8,
    backgroundColor: '#f1f2fc',
  },
  head:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  container: {
    flex: 1,
    paddingHorizontal:12,
    alignItems:'center',
    justifyContent:'center',
    alignContent:'center',
    alignSelf:'center',
    borderRadius: 30,
    color: '#FFFFFF',
    paddingBottom:10
  },
  button: {
    flex:0,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#1D2671',
    borderRadius:100,
    padding: 10,
    margin: 10,
    marginHorizontal:60,
    shadowOpacity:0.5,
  },
  button__text: {
    fontSize:16,
    color:'white',
    overflow:'visible'
  },
  avatar: {
    height:100,
    width:100,
    borderRadius:50,
    alignContent:"center",
    marginLeft:90
  },

  data__Container:{
    width:200,
    paddingTop:8,
    borderRadius:10,
    marginBottom:10,
    backgroundColor: 'white',
    shadowOpacity:0.2,
    marginLeft:50
  },
  data__Text: {
    fontSize:16,
    color: '#333333',
    paddingLeft:10,
    padding:5,
  }
  ,
  label__Container:{
    width:260,
    padding:1,
    paddingLeft:16,
    fontSize:20,
    marginLeft:40,
  },
  label__Text:{
    fontSize:15,
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
  },
  test: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    gap:5,
  },
  container__Buttons:{
    flexDirection:'row',
    paddingHorizontal:10,
    backgroundColor:"#ECECEC",
    borderRadius:10,

  },
  screen:{
  },
  main_card:{
      alignItems: 'center',
        paddingTop:14,
  },
    searchAndIconContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft:20

      },
      searchBarContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight:40,
      },
      icon_usemylocation: {
        position:'absolute',
        display:'flex',
        top:23,
        left:65,
    },
    card:{
        alignItems: 'center',
        paddingTop:14,

    },
    secondary_card:{
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    cityText: {
      fontSize: 30,
      fontWeight:'bold',
        marginTop: 5,
        marginBottom: 5,
        color:'white',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: -1, height: 1 }, 
        textShadowRadius: 15,
      },
    cityContainer:{
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginHorizontal:75
    },
    map: {
      width: '75%',
      height: '30%',
      marginHorizontal: 20,
      borderRadius:30
  },
  weatherIcon: {
    height: 50,
    width: 50,
  },
  weatherContainerView:{

  },
  weatherContainer:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    alignContent:'center',
    borderRadius:30,
    marginLeft:14,
    marginRight:180,
    backgroundColor: 'rgba(157,38,113,0.7)',
    shadowOpacity:0.4,
    margin:14,
  },
  tempText:{
    color:'white',
    fontWeight:'bold'
  },
  dropdown_reports:{
    borderRadius:20,
    flex:1,
    zIndex:2
  },
  dropdown_label_reports:{
    position:'absolute',
    bottom:25,
    left:100,
    fontWeight:'bold',
    fontSize:15,
    flex:1,

  },
  dropdown_container_reports:{
    alignItems:'flex-end',
    marginRight:40,
    flex:1,
    zIndex:1
  },

  label_reports: {
    position:'absolute',
    bottom:15,
    left:190,
    fontWeight:'bold'
  },
  weathertypes_container: {
    borderRadius:5,
    padding:10,
    position:'absolute',
    top:50,
    right:40,
    flexDirection:'column',
    marginRight:10,
    gap:5,
    zIndex:1,
  },
  weatherTypeText:{
    color:'black',
    shadowOpacity:0.1
  },
  label_y_axis_reports:{
    position:'absolute',
    bottom:110,
    left:25,
    transform: [{ rotate: '270deg'}],
    fontWeight:'bold'
  }
})

export default styles;