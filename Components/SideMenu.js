import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Styles/SideMenuStyles'
import { connect } from 'react-redux'

import {NavigationActions} from 'react-navigation';
import { Text, View, Image, TouchableOpacity} from 'react-native';
import { Images,Colors,Metrics, } from '../Themes'
import AppActions from '../Redux/AppRedux'


class SideMenu extends Component {

	constructor (props) {
    	super(props)

    	this.state = {
      		companyUser: props.companyUser,
    	}
    }


  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  handleLogout = () => {

    this.props.logout({navigation : this.props.navigation})

  }

  componentDidMount() {
    this.props.initSession({})
  }

  componentWillReceiveProps = (newProps) => {
    
    const { companyUser = null } = newProps

    this.setState({companyUser:companyUser})
    
  }

  render () {
    var username = ''
    var companyname = ''

    if (this.state.companyUser && this.state.companyUser.first_name && this.state.companyUser.last_name){
      username = this.state.companyUser.first_name +' '+ this.state.companyUser.last_name
    }

    if (this.state.companyUser && this.state.companyUser.company && this.state.companyUser.company.name){
      companyname = this.state.companyUser.company.name
    }

    return (
      <View style={{flex:1}}>
        <Image source={Images.bg_pattern} style={styles.backgroundImage} />
        <View style={{flex:1}}>
          <View style={styles.userBlock}>
            <View style={styles.userNameView}>
              <Text style={styles.userName}>
                {username}
              </Text>
              <Text style={styles.companyName}>
                {companyname}
              </Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={() => this.props.navigation.navigate('DrawerToggle')}>
              <Image source={Images.icon_close} style={styles.closeButtonImage} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={this.handleLogout} style={styles.logoutButton}>
            <View>
              <Image source={Images.icon_logout} style={styles.logoutButtonImage} />
            </View>
            <View style={styles.logoutButtonTextView}>
              <Text style={styles.logoutButtonText}>
                Uitloggen
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style= {styles.columnView}>
          <Image source={Images.logo_menu} style={styles.logo} />
          <Text style={styles.text1}>
            Heb je vragen? 
          </Text>
          <Text style={styles.text2}>
            Bel ons op 085 - 0161620 of
          </Text>
          <Text style={styles.infoText}>
            mail naar info@gifty.nl
          </Text>
        </View>
      </View>
    ) 
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    companyUser: state.app.companyUser,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (data) => dispatch(AppActions.logout(data)),
    getCompanyUser: (data) => dispatch(AppActions.getCompanyUser(data)),
    initSession: (data) => dispatch(AppActions.initSession(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)
