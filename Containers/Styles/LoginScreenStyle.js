import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles,
    LoginScreenMainTextInputView: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'column',
    },
    LoginScreenCenterItem: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    LoginScreenButtomView: {
      paddingVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    LoginScreenForgotPasswordButtonShowHideView: {
      flex: 2.8,
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'column',
    },
})
