import { StyleSheet, Platform } from 'react-native'
import { Metrics, ApplicationStyles,Colors } from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles,
    ScannerScreenMainContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    ScannerScreenScanButtonView: {
      flex: 11,
      justifyContent: 'center',
      alignItems: 'center',
    },
    ScannerScreenCancelButtonView: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    ScannerScreenCameraNotExistView: {
      marginVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    ScannerScreenCameraNotExistText: {
      marginTop: 15,
      textAlign: 'center',
      fontFamily: 'OpenSans-Regular',
      fontSize: 16,
      backgroundColor: Colors.transparent,
      lineHeight: 22,
      marginHorizontal: 10,
      color: Colors.grey,
      alignSelf: 'stretch',
    },
    cameraSwitchView: {
      position: 'absolute',
      bottom: Platform.OS === 'ios' ? 110 : 85,
      right: 20,
      height: 50,
      width: 50,
      borderRadius: 25,
      backgroundColor: '#e31f59',
      alignItems: 'center',
      justifyContent: 'center'
    },
    cameraSwitchIcon: {
      height: 30,
      width: 30,
    }
})
