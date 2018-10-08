import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TextInput, Text, View } from 'react-native'
import styles from './Styles/HeaderStyles'
import ExamplesRegistry from '../Services/ExamplesRegistry'


export default class Header extends Component {
  static propTypes = {
    text: PropTypes.string,
  }

  getText () {
    var text = this.props.text

    if (text.length > 1){
      text = text.substr(0, text.length - 1)
    } 

    return text
    
  }
  getTextLast () {
    var text = this.props.text

    if (text.length > 1){
      text = text.substr(text.length - 1, text.length - 1)
    } else {
      text = ''
    }

    return text
    
  }

  render () {
    return (
      <View style={{flexDirection:'row'}}>
        <Text style={styles.header}>{this.getText()}</Text>
        <Text style={styles.headerLast}>{this.getTextLast()}</Text>
      </View>
      
    )
  }
}
