import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../../Themes/';

export default StyleSheet.create({
	backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  footerContainer: {
    padding: 20,
    backgroundColor: 'lightgrey'
  },
  closeButtonImage: {
    height:20,
    width:20,
    resizeMode: 'contain'
  },
  logoutButtonImage: {
  	height:30,
    width:30,
    resizeMode: 'contain'
  },
  logo : {
  	height:30,
    resizeMode: 'contain'
  },
  userBlock: {
    flexDirection: 'row',
    backgroundColor: Colors.transparent,
  },
  userNameView: {
    paddingVertical: 30,
    paddingLeft: 30,
    flexDirection: 'column',
    flex: 10,
    backgroundColor: Colors.transparent,
  },
  userName: {
    fontFamily: 'Nexa Light',
    fontSize: 16,
    lineHeight: 20,
    color: Colors.greyDark,
  },
  companyName: {
    fontFamily: 'Nexa Bold',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.black,
  },
  closeButton: {
    flex: 1,
    padding: 30,
  },
  logoutButton: {
    padding: 30,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: Colors.grey,
  },
  logoutButtonTextView: {
    marginLeft: 20,
    flexDirection: 'column',
    flex: 1,
  },
  logoutButtonText: {
    fontFamily: 'Nexa Light',
    fontSize: 18,
    lineHeight: 24,
    color: Colors.pink,
  },
  columnView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  text1: {
    fontFamily: 'Nexa Bold',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.black,
    marginTop: 25,
  },
  text2: {
    fontFamily: 'Nexa Light',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.greyDark,
    marginTop: 5,
  },
  infoText: {
    fontFamily: 'Nexa Light',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.greyDark,
    marginTop: 5,
    marginBottom: 70,
  },
})
