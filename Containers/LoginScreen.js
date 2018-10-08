import React, { Component } from 'react'
import { Keyboard, View, Text, Image, Linking, Platform, ToastAndroid, AlertIOS,ScrollView,PixelRatio, KeyboardAvoidingView, BackHandler } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle'
import RoundedButtonDark from '../Components/RoundedButtonDark'
import Label from '../Components/Label'
import Link from '../Components/Link'
import { NavigationActions } from 'react-navigation'

import TextBoxDark from '../Components/TextBoxDark'

import { Images, Colors } from '../Themes'

import AppActions from '../Redux/AppRedux'

import Spinner from 'react-native-loading-spinner-overlay';


const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;


class LoginScreen extends Component {
  

  constructor (props) {
    super(props)

    this.state = {
      navigation : this.props.navigation,
      email:'',
      password:'',
      fetching: false,
      error: props.error,
      token: props.token,
      companyUser: '',
      keyboardDidShow: false,
      sentToDrawerNav: false,
    }

  }

  componentWillReceiveProps = (newProps) => {

    const { fetching = false, error = null, token = null, companyUser = null } = newProps

    if(error && !this.state.isstartup){
      var message = error.hint || error.message
      this.setState({ fetching: false})
      setTimeout(() => {
        if(Platform.OS === 'ios'){
          AlertIOS.alert(
            'Login failed',
            message
          );
        } else {
          ToastAndroid.show(message, ToastAndroid.SHORT);
        }
      }, 100)
    } else if (!this.state.sentToDrawerNav && token && token.access_token && this.state.token != token && Date.now() < token.expires_on){
      this.setState({ token:token, sentToDrawerNav: true })
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
      this.state.navigation.dispatch(resetAction)
    } 
    
  }

  componentDidMount() {
    this.setState({ fetching: true })
    if(this.state.token && Date.now() < this.state.token.expires_on){ 
    } else {
      this.setState({ fetching: false })
    }
    Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  handleLogin = () => {
    const { email, password } = this.state
    const data = { email: email, password: password }
    this.setState({ fetching: true, isstartup:false })
    this.props.login(data)
  }

  componentWillUnmount = () => {
    Keyboard.removeListener('keyboardDidShow', this._keyboardDidShow);
    Keyboard.removeListener('keyboardDidHide', this._keyboardDidHide);
  }

  _keyboardDidShow = () => {
    this.setState({ keyboardDidShow: true })
  }

  _keyboardDidHide = () => {
    this.setState({ keyboardDidShow: false })
  }

  render () {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={[styles.container, {flex:1} ]}>
        <Image source={Images.bg} style={styles.backgroundImage}  />
        <Spinner visible={this.state.fetching} textContent={""} textStyle={Colors.white} />
        <View style={styles.LoginScreenMainTextInputView}>
          <View style= {{ flex:11 }}>
            {
              this.state.keyboardDidShow ?
                null : (
                <View style= {styles.LoginScreenCenterItem}>
                  <Image source={Images.logo_login} style={styles.logo} />
                </View>
              )
            }
            <View style= {[styles.LoginScreenCenterItem, { flex: 2 }]}>
              <Label text='E-mailadres' style={{ marginTop:18, marginLeft: 20 }} />
              <TextBoxDark
                style={{ marginHorizontal: 20 }}
                onSubmitEditing={() => this.refs.password.focus()}
                returnKeyType='next'
                keyboardType='email-address'
                value={this.state.email}
                onChange={(text) => this.setState({email:text})}
              />
              <Label text='Wachtwoord' style={{ marginTop:18, marginLeft: 20 }} />
              <TextBoxDark
                style={{ marginHorizontal: 20 }}
                onSubmitEditing={this.handleLogin}
                ref='password'
                returnKeyType='send'
                secureTextEntry={true}
                value={this.state.password}
                onChange={(text) => this.setState({password:text})}
              />
              {
                this.state.keyboardDidShow ? (
                  <View style={styles.LoginScreenButtomView}>
                    <RoundedButtonDark
                      text='INLOGGEN'
                      style={{width:250, marginTop: -10}}
                      onPress={this.handleLogin}
                    />
                    <Link
                      text='Wachtwoord vergeten?'
                      onPress={()=> Linking.openURL('https://dashboard.gifty.nl') }
                    />
                  </View>
                ) : (
                  <View style= {styles.LoginScreenForgotPasswordButtonShowHideView}>
                    <RoundedButtonDark
                      text='INLOGGEN'
                      style={{width:250,marginTop:10}}
                      onPress={this.handleLogin}
                    />
                    <Link
                      text='Wachtwoord vergeten?'
                      style={{marginTop:5}}
                      onPress={()=> Linking.openURL('https://dashboard.gifty.nl') }
                    />
                  </View>
                )
              }
            </View>
          </View>
        </View>  
      </KeyboardAvoidingView>
    )  
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.app.fetching,
    error: state.app.error,
    token: state.app.token,
    companyUser: state.app.companyUser,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(AppActions.login(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
