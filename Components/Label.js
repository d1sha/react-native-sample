import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TextInput, Text } from 'react-native'
import styles from './Styles/LabelStyles'
import ExamplesRegistry from '../Services/ExamplesRegistry'


export default class Label extends Component {
  static propTypes = {
    text: PropTypes.string,
  }

  getText () {
    const text = this.props.text || this.props.children || ''
    return text
  }

  render () {
    return (
      
      <Text style={[styles.label, this.props.style ]} >{this.getText()}</Text>
      
    )
  }
}
