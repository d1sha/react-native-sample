import React, { Component } from 'react'
import { Image, Text, View, TouchableOpacity, ToastAndroid, AlertIOS,Platform, ScrollView, BackHandler  } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/VoucherIssuedScreenStyle'
import { Colors, Images } from '../Themes/'
import RoundedButtonDark from '../Components/RoundedButtonDark'
import RoundedLabelDark from '../Components/RoundedLabelDark'
import TextBoxLight from '../Components/TextBoxLight'
import Header from '../Components/Header'
import Label from '../Components/Label'
import Link from '../Components/Link'
import { NavigationActions } from 'react-navigation'
import AppActions from '../Redux/AppRedux'
import Spinner from 'react-native-loading-spinner-overlay';

class VoucherIssuedScreen extends Component {
  constructor (props) {
    super(props)
    
    this.state = {
      navigation : this.props.navigation,
      fetching: false,
      error: '',
      voucher: props.voucher,
      companyUser: props.companyUser,
      sentToActionRedeemed : false,
      sentToDrawerNav : false,
    }
  }

  handleback = () => {
    const data = {
      amount: this.state.voucher.amount,
      code: this.state.voucher.code,
      promotional: this.state.voucher.promotional
     }
    this.setState({ fetching: true })
    console.log('data', data);
    this.props.redeemVoucher(data)
  }

  handleScan = () => {
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
  }

  componentWillMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick)
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

  componentWillReceiveProps = (newProps) => {
    console.log('newProps', newProps);
    const { fetching = false, error ='', voucher = null } = newProps
    if(error){
      this.setState({ fetching: false })
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

    } else if (voucher && voucher.id) {
      this.setState({ fetching: false })
      if(voucher.status === 'redeemed' && !this.state.sentToActionRedeemed){
        this.setState({sentToActionRedeemed: true})
        const resetAction = NavigationActions.reset({
          index: 0,
          key: null,
          actions: [
            NavigationActions.navigate({
              routeName: 'DrawerNav',
              action: NavigationActions.navigate({
                        routeName: "VoucherActionRedeemedScreen",
                      })
            })
          ]
        });
        this.state.navigation.dispatch(resetAction);
      }
    } 

    if (this.state.voucher && this.state.companyUser){ 
      this.setState({fetching:false})
    } else {
      this.setState({fetching:true})
    }
    
  }

  renderComponent = () => {
    if (this.state.voucher && this.state.companyUser){
      var amountSplit = this.state.voucher.amount_.toString().split(',') 
      var amount1 = ''
      var amount2 = ''
      
      if (amountSplit.length > 0) { 
        amount1 =  amountSplit[0] 
      } else {
        amount1 = '00'
      }

      if (amountSplit.length > 1) { 
        amount2 =  amountSplit[1] 
      } else {
        amount2 = '00' 
      }

      return (
        <View style={styles.mainContainer}>               
          <View style={{flex:11}}>
            <View style= {styles.headerContentView}>
              <Header text='Waarde van de bon.' />
              <Text style={styles.headerNote}>Deze bon is geldig met onderstaand bedrag.</Text>
            </View>
            <View style= {styles.mainContainer2}>
                <View style= {styles.voucherPricePart}>  
                  <Text style= {styles.euroSymbol}>€</Text>
                  <View style= {styles.rowCenterView}>
                    <Text style= {styles.amount1Text}>{ amount1 }</Text>
                    <Text style= {styles.commaSymbol}>,</Text>
                    <Text style= {styles.amount2Text}>{ amount2 }</Text>
                  </View>
                </View>
                <View style= {styles.whiteBoxView}>
                  <Text style= {styles.lableStyle}>UITGEGEVEN OP:</Text>
                  <View style= {{flexDirection:'row'}}>
                    <Text style= {styles.issueDateText}>{this.state.voucher.issued_at_date}</Text>
                    <Text style= {styles.issueTimeText}> | {this.state.voucher.issued_at_time} uur</Text></View>
                  <Text style= {styles.nameText}>{this.state.companyUser.first_name}</Text>
                </View>

                <View style= {styles.centeredView}>
                  <RoundedLabelDark text={ 'Code : ' + this.state.voucher.code_ }/>
                </View>
            </View>
          </View>
          <View style= {styles.columnView}>
            <RoundedButtonDark text='VERZILVEREN' style={{marginTop:0}} onPress={this.handleback} />
            <Link text='Annuleren' style={{marginTop:5}} onPress={this.handleScan}/> 
          </View>
        </View>  
      )

    } else {
      return null
    }
  }

  render () {
    return (
    	<View style={[styles.container2, {flex:1} ]}>
          <Image source={Images.bg} style={styles.backgroundImage}  />
          <Spinner visible={this.state.fetching} textContent={""} textStyle={{color: '#FFF'}} />
          { this.renderComponent() }
                 
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.app.fetching,
    error: state.app.error,
    voucher: state.app.voucher,
    companyUser: state.app.companyUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    redeemVoucher: (data) => dispatch(AppActions.redeemVoucher(data)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(VoucherIssuedScreen)
