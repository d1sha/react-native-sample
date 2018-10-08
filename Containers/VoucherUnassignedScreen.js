import React, { Component } from 'react'
import { Image, Text, View, TouchableOpacity,TextInput, ToastAndroid, AlertIOS,Platform, ScrollView, BackHandler  } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/VoucherUnassignedScreenStyle'
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
import CheckBox from 'react-native-check-box';

class VoucherUnassignedScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      navigation : this.props.navigation,
      fetching: false,
      error: '',
      voucher: props.voucher,
      value1: '',
      value2: '',
      commaColor : Colors.pinkDark,
      sentToDrawerNav : false,
      sentToActionIssued: false,
      isChecked: false
    }
  }

  handleback = () => {
    var value1 = this.state.value1 || 0;
    var value2 = this.state.value2 || 0;
    var promotionalValue = this.state.isChecked ? parseInt(1) : parseInt(0);
    const data = {
      code: this.state.voucher.code,
      amount: Number(value1 + '.' + value2).toFixed(2),
      promotional: promotionalValue,
    }
    this.setState({ fetching: true })
    this.props.assignVoucher(data)
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

  componentDidMount() {
    // this.textInput1.focus();
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
    console.log('unassignedNewProps', newProps);
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

    } else if (voucher && voucher.id){
      this.setState({ fetching: false })
      if(voucher.status ==='issued' && !this.state.sentToActionIssued){
        this.setState({sentToActionIssued: true})
        const resetAction = NavigationActions.reset({
          index: 0,
          key: null,
          actions: [
            NavigationActions.navigate({
              routeName: 'DrawerNav',
              action: NavigationActions.navigate({
                        routeName: "VoucherActionIssuedScreen",
                      })
            })
          ]
        });
        this.state.navigation.dispatch(resetAction);
      } 

    } 

    if (this.state.voucher){ 
        this.setState({fetching:false})
      } else {
        this.setState({fetching:true})
      }
    
  }

  renderComponent = () => {
    const rightText = 'Ik geef deze bon gratis weg';
    if (this.state.voucher){
      return (
          <View style={styles.mainContainer}>                
            <View style={{flex:11}}>
              <View style= {styles.contentHeader}>
                <Header text='Bepaal je bedrag.' />
                <Text style={styles.contentHeaderNotes}>Koppel een waarde aan deze bon.</Text>
              </View>
              <View style= {styles.voucherColumnContent}>
                <View style= {styles.voucherColumnContentInnerPart}>
                  <Text style= {styles.euroSymbol}>€</Text>
                  <TextInput
                    underlineColorAndroid={Colors.transparent}
                    onChangeText={(text) => {
                      if (text.includes(".") || text.includes(",")) {
                        this.textInput2.focus()
                      } else {
                        this.setState({value1:text})
                      }
                    }}
                    value={this.state.value1}
                    autoFocus={true}
                    ref={(input) => { this.textInput1 = input; }}
                    keyboardType='numeric'
                    returnKeyType = {"done"}
                    textAlign={'right'}
                    placeholder='00'
                    style= {styles.textInput1}/>
                  <Text style= {[styles.commaSymbol, { color: this.state.commaColor }]}>,</Text>
                  <TextInput
                    underlineColorAndroid={Colors.transparent}
                    onBlur={() => {
                      if (this.state.value2.length > 0) {
                        this.setState({
                          commaColor:Colors.white
                        });
                      } else {
                          this.setState({
                            commaColor:Colors.pinkDark
                          });
                        }
                      }}
                      onFocus={ ()=>  {
                        this.setState({
                          commaColor:Colors.white
                        });
                      }}
                      onChangeText={(text) => {
                        if (!text.includes(".") && !text.includes(",") ) {
                          this.setState({
                            value2:text
                          });
                        
                        }
                      }}
                      value={this.state.value2}
                      ref={(input) => {
                        this.textInput2 = input;
                      }}
                      keyboardType='numeric'
                      returnKeyType={"done"}
                      textAlign={'left'}
                      placeholder='00'
                      style={styles.textInput2}
                    />
                </View>

                <View style={styles.borderStyle} />

                <CheckBox
                  style={styles.checkboxView}
                  onClick={()=>{
                    this.setState({
                      isChecked: !this.state.isChecked
                    })
                  }}
                  checkBoxColor={Colors.pinkDark}
                  uncheckedCheckBoxColor={Colors.pinkDark2}
                  isChecked={this.state.isChecked}
                  rightTextView={
                    <View style={{ marginLeft: 10 }}>
                      <Text style={styles.checkboxTextColor}>{rightText}</Text>
                    </View>
                  }
                  checkedImage={
                    <View style={styles.checkboxImageView}>
                      <Image source={Images.icon_checkbox} style={styles.checkboxImage}/>
                    </View>
                  }
                />

                <View style= {styles.centeredView}>
                  <RoundedLabelDark text={ 'Code : ' + this.state.voucher.code_ }/>
                </View>
              </View>
            </View>

            <View style= {styles.buttonsView}>
                <RoundedButtonDark text='CADEAUBON UITGEVEN' style={{width:250, marginTop:0}} onPress={this.handleback} />
                <Link text='Annuleren' style={{marginTop:5}} onPress={this.handleScan}/> 
            </View>
          </View>
        )
    } else {
      return null
    }
  }

  render () {
    console.log('render', this.props);
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    assignVoucher: (data) => dispatch(AppActions.assignVoucher(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoucherUnassignedScreen)
