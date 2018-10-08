import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  textbox: {
    height: 55,
    fontSize: 24,
    lineHeight:28,
    color:Colors.white,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.clear,
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderColor: Colors.pinkDark,
    fontFamily: 'OpenSans-Regular'
  }
})
