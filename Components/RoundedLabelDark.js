import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import styles from './Styles/RoundedLabelDarkStyles'
import ExamplesRegistry from '../Services/ExamplesRegistry'


export default class RoundedLabelDark extends Component {
  static propTypes = {
    text: PropTypes.string,
  }

  getText () {
    const buttonText = this.props.text || ''
    return buttonText
  }

  render () {
    return (
      <View style={[styles.button, this.props.style ]}>
        <Text style={styles.buttonText}>{this.getText()}</Text>
      </View>
    )
  }
}
