import React, { Component } from 'react'
import {
  AppState,
  Linking,
  Image,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  AlertIOS,
  Platform,
  NavigatorIOS,
  Alert,
  ScrollView,
  BackHandler,
  AsyncStorage,
} from 'react-native'

import { connect } from 'react-redux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ScannerScreenStyle'
import { Images, Colors } from '../Themes'
import RoundedButtonLight from '../Components/RoundedButtonLight'
import { RNCamera } from 'react-native-camera';
import AppActions from '../Redux/AppRedux'
import Spinner from 'react-native-loading-spinner-overlay';
import { NavigationActions } from 'react-navigation'
import Permissions from 'react-native-permissions'
import Header from '../Components/Header'
import AndroidOpenSettings from 'react-native-android-open-settings'

class ScannerScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      navigation : this.props.navigation,
      fetching: false,
      error: '',
      voucher: '',
      barcodeProcessing: false,
      authorized: false,
      appState: AppState.currentState,
      sentToUnassigned : false,
      sentToIssued : false,
      sentToRedeemed : false,
      sentToDrawerNav : false,
      cameraType: RNCamera.Constants.Type.back,
    }
  }

  // handleback = () => {
  //   if (!this.state.sentToDrawerNav){
  //     this.setState({sentToDrawerNav: true})
  //     const resetAction = NavigationActions.reset({
  //       index: 0,
  //       key: null,
  //       actions: [
  //         NavigationActions.navigate({
  //           routeName: 'DrawerNav',
  //         })
  //       ]
  //     });
  //     this.state.navigation.dispatch(resetAction);
  //   }
  // }
  handleCamera = () => {
    if (this.state.cameraType == RNCamera.Constants.Type.back) {
      AsyncStorage.setItem('cameraState', JSON.stringify(RNCamera.Constants.Type.front))
      this.setState({
        cameraType: RNCamera.Constants.Type.front,
      });
    } else if (this.state.cameraType == RNCamera.Constants.Type.front) {
      AsyncStorage.setItem('cameraState', JSON.stringify(RNCamera.Constants.Type.back))
      this.setState({
        cameraType: RNCamera.Constants.Type.back,
      });
    }
  }
  handleManual = () => {
    if (!this.state.sentToManual){
      this.setState({sentToManual: true})
      const resetAction = NavigationActions.reset({
          index: 0,
          key: null,
          actions: [
            NavigationActions.navigate({
              routeName: 'DrawerNav',
              action: NavigationActions.navigate({
                        routeName: "ManualScreen",
                      })
            })
          ]
        });
        this.state.navigation.dispatch(resetAction);
    }
  }

  handleInput = (value) => {
    
    if (!this.state.barcodeProcessing){
      this.setState({ barcodeProcessing: true })
      const data = { code: value.data }
      this.setState({ fetching: true })
      this.props.getVoucher(data)
    }
    
  }

  
  



  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      Permissions.check('camera').then(response => {
        if(response == 'authorized'){
          this.setState({ authorized: true })
        } else {
          this.setState({ authorized: false })
        }      
      })
    }
    this.setState({appState: nextAppState});
  }

  handleBackButtonClick = () => {
    if (!this.state.sentToDrawerNav){
      this.setState({sentToDrawerNav: true})
      const resetAction = NavigationActions.reset({
        index: 0,
        key: null,
        actions: [
          NavigationActions.navigate({
              routeName: 'DrawerNav',
              action: NavigationActions.navigate({
                        routeName: "ScannerScreen",
                      })
            })
        ]
      });
      this.state.navigation.dispatch(resetAction);
    }
      return true;
  }

  handleSetting = () => {
    
    Permissions.request('camera').then(response => {
      if(response == 'authorized'){
        this.setState({ authorized: true })
      } else {
        this.setState({ authorized: false })
      }  

      if (Platform.OS === 'ios') {
        Linking.openURL('app-settings:')
      } else {
        AndroidOpenSettings.appDetailsSettings()
      }
    })

    
  }


  async componentDidMount() {

    AppState.addEventListener('change', this._handleAppStateChange);
    Permissions.check('camera').then(response => {
      if(response == 'authorized'){
        this.setState({ authorized: true })
      } else {
        this.setState({ authorized: false })
      }      
    })
    if (await AsyncStorage.getItem('cameraState')) {
      if (JSON.parse(await AsyncStorage.getItem('cameraState')) === 1) { 
        this.setState({
          cameraType: RNCamera.Constants.Type.front,
        });
      } else {
        this.setState({
          cameraType: RNCamera.Constants.Type.back,
        });
      }
    } else {
      AsyncStorage.setItem('cameraState', JSON.stringify(RNCamera.Constants.Type.back))
    }
  }


  componentWillReceiveProps = (newProps) => {

    console.log('scanner', newProps)

    const { fetching = false, error ='', voucher = null } = newProps
    
    if(error){
      this.setState({ fetching: false, barcodeProcessing: false })

      var message = error.hint || error.message

      setTimeout(() => {
        if(Platform.OS === 'ios'){
          AlertIOS.alert(
            'Voucher failed',
            message
          );
        } else {
          ToastAndroid.show(message, ToastAndroid.SHORT);
        }
      }, 100);

    } else if (voucher && voucher.id){
      this.setState({ fetching: false })

      if(voucher.status ==='unassigned' && !this.state.sentToUnassigned){
        this.setState({sentToUnassigned:true})
        const resetAction = NavigationActions.reset({
          index: 0,
          key: null,
          actions: [
            NavigationActions.navigate({
              routeName: 'DrawerNav',
              action: NavigationActions.navigate({
                        routeName: "VoucherUnassignedScreen",
                      })
            })
          ]
        });
        this.state.navigation.dispatch(resetAction);
      } else if(voucher.status ==='issued' && !this.state.sentToIssued){
        this.setState({sentToIssued:true})
        const resetAction = NavigationActions.reset({
          index: 0,
          key: null,
          actions: [
            NavigationActions.navigate({
              routeName: 'DrawerNav',
              action: NavigationActions.navigate({
                        routeName: "VoucherIssuedScreen",
                      })
            })
          ]
        });
        this.state.navigation.dispatch(resetAction);
      } else if(voucher.status === 'redeemed' && !this.state.sentToRedeemed){
        this.setState({sentToRedeemed:true})
        const resetAction = NavigationActions.reset({
          index: 0,
          key: null,
          actions: [
            NavigationActions.navigate({
              routeName: 'DrawerNav',
              action: NavigationActions.navigate({
                        routeName: "VoucherRedeemedScreen",
                      })
            })
          ]
        });
        this.state.navigation.dispatch(resetAction);
      }

    } else if(!fetching){
      this.setState({ fetching: false })
    }
    
  }

  componentWillMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick)
    AppState.removeEventListener('change', this._handleAppStateChange);

    console.log('scanner', 'componentWillUnmount')
  }

 
  renderScreen = (authorized) => {
    
    if(authorized){
      return(
        <View style={styles.ScannerScreenMainContainer}>
          <View style= {styles.ScannerScreenScanButtonView}>
              <Image source={Images.icon_focus_2} style={styles.scannerButton} />
          </View>
          <TouchableOpacity
            onPress={this.handleCamera}
            // activeOpacity={0.9}
            style={styles.cameraSwitchView}>
            <Image source={Images.icon_camera_switch} style={styles.cameraSwitchIcon} />
          </TouchableOpacity>
          <View style={styles.ScannerScreenCancelButtonView}>
            <RoundedButtonLight text='HANMATIG INVOEREN' onPress={this.handleManual} />
          </View>
        </View>
      )
    } else {
      return(
          <View style={styles.ScannerScreenMainContainer}>
            <View style= {styles.ScannerScreenScanButtonView}>
              <View style= {styles.ScannerScreenCameraNotExistView}>
                <Header text='Camera niet actief.' />
                <Text style={styles.ScannerScreenCameraNotExistText}>Om bonnen te scannen dient Gifty toegang tot de camera te hebben.</Text>
              </View>
            </View>
            <View style= {styles.ScannerScreenCancelButtonView}>
                <RoundedButtonLight text='INSTELLING WIJZIGEN' onPress={this.handleSetting} />
            </View>
          </View>                 
      )
    }
  }

  renderCamera = (authorized) => {
    
    if(authorized){
      return(
        <RNCamera
          pendingAuthorizationView={<View />}
          notAuthorizedView={<View />}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera'}
          type={this.state.cameraType}
          flashMode={RNCamera.Constants.FlashMode.on}
          onBarCodeRead={this.handleInput}
          style={styles.fullBackgroundScanner}
        />
      )
    } else {
      return(
        null                
      )
    }
  }
     
  render () {
    return (
      <View style={[styles.container2, {flex:1}, ]}>
        <Image source={Images.bg} style={styles.backgroundImage} />
        { this.renderCamera(this.state.authorized) }
        <Image source={Images.bg_white_bottom} style={styles.backgroundImage}  />
        <Spinner visible={this.state.fetching} textContent={""} textStyle={Colors.white} />
        { this.renderScreen(this.state.authorized) }
      </View>
       
    )
  }

}

const mapStateToProps = (state) => {
  return {
    fetching: state.app.fetching,
    error: state.app.error,
    voucher: state.app.voucher,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getVoucher: (data) => dispatch(AppActions.getVoucher(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScannerScreen)
