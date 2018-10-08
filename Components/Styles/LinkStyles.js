import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  link: {
  	fontFamily: 'Nexa Light',
    fontSize: 18,
    lineHeight:22,
    marginHorizontal: 10,
    color: Colors.greyDark,
    backgroundColor: Colors.transparent,

  },
  bottom: {
  	backgroundColor : Colors.greyDark,
  	height:1,
  	marginHorizontal: 10,
  	marginTop:2,
    marginBottom:5,
  }
})
