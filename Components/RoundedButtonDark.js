import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, Text } from 'react-native'
import styles from './Styles/RoundedButtonDarkStyles'
import ExamplesRegistry from '../Services/ExamplesRegistry'
import { Colors } from '../Themes/'


export default class RoundedButtonDark extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    children: PropTypes.string,
    navigator: PropTypes.object
  }

  getText () {
    const buttonText = this.props.text || this.props.children || ''
    return buttonText.toUpperCase()
  }

  render () {
    return (
      <TouchableHighlight
        underlayColor={Colors.greenDark}
        activeOpacity={0.8}
        style={[styles.button, this.props.style ]}
        onPress={this.props.onPress}
      >
        <Text style={styles.buttonText}>{this.getText()}</Text>
      </TouchableHighlight>
    )
  }
}
