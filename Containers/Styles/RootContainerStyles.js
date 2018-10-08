import {StyleSheet} from 'react-native'
import { Colors} from '../../Themes/'

export default StyleSheet.create({
  applicationView: {
    flex: 1,
    backgroundColor: Colors.pink
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.pink
  },
  welcome: {
    fontSize: 20,
    lineHeight:24,
    textAlign: 'center',
    margin: 10
  },
  myImage: {
    width: 200,
    height: 200,
    alignSelf: 'center'
  }
})
