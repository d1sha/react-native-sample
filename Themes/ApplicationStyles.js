
import Colors from './Colors'

import { Platform } from 'react-native';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.transparent
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: null,
      height: null,
      resizeMode: 'stretch'
    },
    fullBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: null,
      height: null,
    },
    fullBackgroundScanner: {
      position: 'absolute',
      top: Platform.OS === 'ios' ? APPBAR_HEIGHT + 20 : APPBAR_HEIGHT ,
      left: 0,
      bottom: 0,
      right: 0,
      width: null,
      height: null,
    },
    container2:{
      flex: 1,
      paddingTop:  Platform.OS === 'ios' ? APPBAR_HEIGHT + 20 : APPBAR_HEIGHT,
      backgroundColor: Colors.white
    },
    container: {
      flex: 1,
      backgroundColor: Colors.white
    },
    container_: {
      flex: 1,
    },
    section: {
      margin: 25,
      padding: 10
    },
    sectionText: {
      paddingVertical: 20,
      color: Colors.white,
      marginVertical: 5,
      textAlign: 'center'
    },
    subtitle: {
      color: Colors.grey,
      padding: 5,
      marginBottom: 5,
      marginHorizontal: 5
    },
    titleText: {
      fontSize: 14,
      lineHeight:16,
      color: Colors.white
    },
  darkLabelContainer: {
    padding: 5,
    paddingBottom: 20,
    borderBottomColor: Colors.pink,
    borderBottomWidth: 1,
    marginBottom: 10
  },
  darkLabel: {
    color: Colors.grey
  },
  groupContainer: {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  sectionTitle: {
    color: Colors.white,
    backgroundColor: Colors.pink,
    padding: 5,
    marginTop: 5,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.ember,
    alignItems: 'center',
    textAlign: 'center'
  },
  logo: {
    height:60,
    resizeMode: 'contain'
  },
  scanButton: {
    height:170,
    width:170,
    resizeMode: 'contain',
    margin:10,
  },
  errorIcon :{
    height:20,
    width: 20,
    resizeMode: 'contain'
  },
  scannerButton: {
    height:200,
    width:200,
    resizeMode: 'contain'
  },
  scannerInnerButton: {
    height:100,
    width:100,
    resizeMode: 'contain'
  },
}

export default ApplicationStyles
