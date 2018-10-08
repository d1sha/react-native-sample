import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'

export default StyleSheet.create({
 header: {
    backgroundColor: Colors.clear,
    borderBottomColor : Colors.pinkDark,
    borderBottomWidth: 1,
    elevation: 0 
  },
  header2: {
    backgroundColor: Colors.pinkDark,
    borderBottomColor : Colors.pinkDark,
    borderBottomWidth: 1,
    elevation: 0 
  },
  header3: {
    backgroundColor: Colors.clear,
    borderBottomColor : Colors.greenDark,
    borderBottomWidth: 1,
    elevation: 0 
  },
  headerTitleStyle : {
  	color: Colors.white
  },
  headerBackTitleStyle : {
  	color: Colors.white
  },
  logo: {
    height:30,
    width:55,
    resizeMode: 'contain',
  },
  menu: {
    height:20,
    width:60,
    resizeMode: 'contain',
  },
})
