import React from 'react'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import VoucherActionRedeemedScreen from '../Containers/VoucherActionRedeemedScreen'
import VoucherActionIssuedScreen from '../Containers/VoucherActionIssuedScreen'
import VoucherRedeemedScreen from '../Containers/VoucherRedeemedScreen'
import VoucherIssuedScreen from '../Containers/VoucherIssuedScreen'
import VoucherUnassignedScreen from '../Containers/VoucherUnassignedScreen'
import ManualScreen from '../Containers/ManualScreen'
import ScannerScreen from '../Containers/ScannerScreen'
import { TouchableOpacity, Image, View } from 'react-native'

import ScanScreen from '../Containers/ScanScreen'

import LaunchScreen from '../Containers/LaunchScreen'
import RootScreen from '../Containers/RootScreen'
import LoginScreen from '../Containers/LoginScreen'

import styles from './Styles/NavigationStyles'
import { Images } from '../Themes'

import SideMenu from '../Components/SideMenu';
import { NavigationActions } from 'react-navigation'
  
  goHome = (navigation) => {
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
      navigation.dispatch(resetAction)
  }

  navigationOptions1 = (navigation) => {
    return {
        initialRouteName: 'ScanScreen',
        headerTransparent: true,
        headerStyle: styles.header,
        headerTitleStyle : styles.headerTitleStyle,
        headerBackTitleStyle : styles.headerBackTitleStyle,
        headerLeft: <TouchableOpacity style={{padding:10}} onPress={() => this.goHome(navigation)}>
                <Image source={Images.logo_splash} style={styles.logo} />
              </TouchableOpacity> ,
        headerRight: <TouchableOpacity style={{padding:10}} onPress={() => navigation.navigate('DrawerToggle')}>
                <Image source={Images.icon_navigation} style={styles.menu}/>
              </TouchableOpacity>
      }
  }

  navigationOptions2 = (navigation) => {
    return {  
      headerStyle: styles.header2,
      headerTitleStyle : styles.headerTitleStyle,
      headerBackTitleStyle : styles.headerBackTitleStyle,
      headerLeft: <TouchableOpacity style={{padding:10}} onPress={() => this.goHome(navigation)}>
                <Image source={Images.logo_splash} style={styles.logo} />
              </TouchableOpacity>,
      headerRight: <TouchableOpacity style={{padding:10}} onPress={() => navigation.navigate('DrawerToggle')}>
              <Image source={Images.icon_navigation} style={styles.menu}/>
            </TouchableOpacity> 
    }
  }

  navigationOptions3 = (navigation) => {
    return {  
      headerTransparent: true,
      headerStyle: styles.header3,
      headerTitleStyle : styles.headerTitleStyle,
      headerBackTitleStyle : styles.headerBackTitleStyle,
      headerLeft: <TouchableOpacity style={{padding:10}} onPress={() => this.goHome(navigation)}>
                <Image source={Images.logo_splash} style={styles.logo} />
              </TouchableOpacity>,
      headerRight: <TouchableOpacity style={{padding:10}} onPress={() => navigation.navigate('DrawerToggle')}>
            <Image source={Images.icon_navigation} style={styles.menu}/>
          </TouchableOpacity>
    }
  }

const DrawerStackNav = StackNavigator({
  // ScanScreen: { screen: ScanScreen },
  RootScreen: { screen: RootScreen },
  ScannerScreen: { screen: ScannerScreen },
  ManualScreen: { screen: ManualScreen },
  VoucherUnassignedScreen: { screen: VoucherUnassignedScreen },
  VoucherIssuedScreen: { screen: VoucherIssuedScreen },
  VoucherRedeemedScreen: { screen: VoucherRedeemedScreen },
  VoucherActionIssuedScreen: { screen: VoucherActionIssuedScreen, navigationOptions: ({navigation}) => (this.navigationOptions3(navigation)) 
  },
  VoucherActionRedeemedScreen: { screen: VoucherActionRedeemedScreen, navigationOptions: ({navigation}) => (this.navigationOptions3(navigation)) 
  },

}, {
  headerMode: 'screen',
  navigationOptions: ({navigation}) => (this.navigationOptions1(navigation))
});

const DrawerNav = DrawerNavigator({
    DrawerStackNav: { screen: DrawerStackNav },
   },{
   	drawerPosition: 'right',
    initialRouteName: 'DrawerStackNav',
    contentComponent: SideMenu,
    drawerWidth: 300
  }
);

const LoginNav = StackNavigator({
  LoginScreen: { screen: LoginScreen, navigationOptions : {header: null} },
}, {
  headerMode: 'none',
  initialRouteName: 'LoginScreen',
});

const PrimaryNav = StackNavigator({
  
	LoginNav: { screen: LoginNav },
	DrawerNav: { screen: DrawerNav },
  LaunchScreen: { screen: LaunchScreen },
}, {
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
});



export default PrimaryNav
