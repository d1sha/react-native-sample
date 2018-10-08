import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TextInput, Text } from 'react-native'
import styles from './Styles/TextBoxLightStyles'
import ExamplesRegistry from '../Services/ExamplesRegistry'


export default class TextBoxLight extends Component {

  constructor(props) {
    super(props)
    this.state = {text: ''}
  }

  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    onInputCompleted: PropTypes.func,
  }

  getText () {
    const buttonText = this.props.text || this.props.children || ''
    return buttonText.toUpperCase()
  }

  format(input__) {
    if (this.props.checkPattern){

      var newInput = ''
      var input_ = ''

      if (input__.length < this.state.text.length){
      	newInput = input__
      	input_ = input__
      } else {
      	newInput = input__.replace(this.state.text, '')
      	input_ = this.state.text + newInput.replace(/[^a-z0-9]/gi,'')
      }
      
      if(input_.length == 19){
        this.setState({text:input_.toUpperCase()})
        this.props.onInputCompleted( input_.split('-').join('').toUpperCase() )
        return input_.toUpperCase();
      } else if (input_.length > 19){
        return this.state.text.toUpperCase();
      } else {
        var input = input_.replace(/-/g, '');
        var format = [4, 4, 4, 4]
        var sep = '-'
        var output = ''
        var idx = 0;
        for (var i = 0; i < format.length && idx < input.length; i++) {
          output += input.substr(idx, format[i]);
          if (idx + format[i] < input.length) output += sep;
          idx += format[i];
        }

        output += input.substr(idx);
        
        return output.toUpperCase();
      }
    } else {
      return input__.toUpperCase()
    }
    
    
  }

  focus () {
    this.refs.textbox.focus()
  }

  render () {
    return (
      <TextInput
        ref='textbox'
        autoCorrect={false}
        autoCapitalize={this.props.autoCapitalize || 'none'}
        underlineColorAndroid='transparent'
        value={this.state.text}
        onChangeText={(text) => this.setState({text:this.format(text)})}
        style={styles.textbox}
        textAlign={'center'}
        placeholder={this.props.placeholder}
      />
    );
  }
}
