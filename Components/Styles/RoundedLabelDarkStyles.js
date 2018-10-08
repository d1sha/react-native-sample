import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  button: {
    height: 50,
    width: 290,
    borderRadius: 25,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: Colors.pinkDark2,
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.white,
    textAlign: 'center',
    fontFamily: 'Nexa Bold',
    fontSize: 14,
    lineHeight:18,
    marginVertical: 10,
    
  }
})
