import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TextInput, Text, View } from 'react-native'
import styles from './Styles/LinkStyles'
import ExamplesRegistry from '../Services/ExamplesRegistry'


export default class Link extends Component {
  static propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
  }

  getText () {
    const text = this.props.text || this.props.children || ''
    return text
  }

  render () {
    return (
      <View>
        <Text style={[styles.link, this.props.style ]} onPress={this.props.onPress}>{this.getText()}</Text>
        <View style={[styles.bottom, this.props.bottomStyle ]}></View>
      </View>
      
    )
  }
}
