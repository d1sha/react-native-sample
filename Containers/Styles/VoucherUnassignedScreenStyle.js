import { StyleSheet, Dimensions } from 'react-native'
import { Colors, ApplicationStyles } from '../../Themes/'

const window = Dimensions.get('window');

export default StyleSheet.create({
  ...ApplicationStyles,
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  contentHeader: {
    marginTop: 20,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentHeaderNotes: {
    marginTop: 5,
    textAlign: 'center',
    backgroundColor: Colors.transparent,
    fontFamily: 'OpenSans-Regular',
    lineHeight: 20,
    fontSize: 16,
    marginHorizontal: 10,
    color: Colors.grey,
    alignSelf: 'stretch',
  },
  voucherColumnContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
  },
  voucherColumnContentInnerPart: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingTop: 10,
  },
  euroSymbol: {
    backgroundColor: Colors.transparent,
    fontSize: 60,
    color: Colors.white,
    marginHorizontal: 4,
    fontFamily: 'Nexa Bold',
  },
  textInput1: {
    flex: 2,
    fontWeight: 'bold',
    fontSize: 90,
    color: Colors.white,
    marginHorizontal: 1,
    marginLeft: 5,
    fontFamily: 'Nexa Bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commaSymbol: {
    backgroundColor: Colors.transparent,
    fontSize: 50,
    marginBottom: 40,
    marginHorizontal: 4,
    fontFamily: 'Nexa Bold',
  },
  textInput2: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 50,
    marginBottom: 40,
    color: Colors.white,
    marginHorizontal: 1,
    fontFamily: 'Nexa Bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsView: {
    flex: 3.2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
  },
  borderStyle:{
    backgroundColor: Colors.pinkDark2,
    width: window.width - 100,
    height: 3,
    borderRadius: 2,
    marginVertical: 10,
  },
  checkboxView: {
    height: 25,
    marginTop: 15,
  },
  checkboxTextColor: {
    fontFamily: 'OpenSans-Regular',
    lineHeight: 20,
    fontSize: 16,
    color: Colors.white,
    alignSelf: 'stretch',
  },
  checkboxImageView: {
    backgroundColor: '#fff',
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3
  },
  checkboxImage: {
    height: 15,
    width: 15
  },
});
