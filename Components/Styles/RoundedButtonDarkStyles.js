import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  button: {
    height: 55,
    width: 190,
    borderRadius: 27.5,
    marginVertical: 10,
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: Colors.green,
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 16,
    lineHeight:20,
    fontFamily: 'Nexa Bold',
    marginVertical: 10,
  },
})
