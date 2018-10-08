/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put, select } from 'redux-saga/effects'
import AppActions from '../Redux/AppRedux'
import { NavigationActions } from 'react-navigation'
import { Voucher } from '../Models';

// import { AppSelectors } from '../Redux/AppRedux'

export function * login (api, action) {

  const { data } = action

  try {

    const token = yield call(api.login, data)
    yield put(AppActions.loginSuccess(token))

  } catch (err) {
    
    yield put(AppActions.loginFailure(err))
  }
}

export function * logout (api, action) {

  const { data } = action

  try {


    const token = {}
    yield put(AppActions.logoutSuccess(token))


    const resetAction = NavigationActions.reset({
        index: 0,
        key: null,
        actions: [
          NavigationActions.navigate({
            routeName: 'LoginNav',
            params: {timeout:0}
          })
        ]
      });

      data.navigation.dispatch(resetAction);

  } catch (err) {
    
    yield put(AppActions.logoutFailure(err))
  }
}

export function * initSession (api, action) {

  const { data } = action
  
  const token = yield select(authToken)

  if (token && Date.now() < token.expires_on){
    try {
 
      yield call(api.setAuthToken, token.access_token)

      const company = yield call(api.getCompanies, {})
      const companyData = { company_id : Object.keys(company)[0]}
      const companyUser = yield call(api.getCompanyUser, companyData)

      yield put(AppActions.initSessionSuccess(companyUser))
      

    } catch (err) {
      yield put(AppActions.initSessionFailure(err))
    }
  } else {
    const company = {}
    yield put(AppActions.initSessionSuccess(company))
  }
  
}

export function * getVoucher (api, action) {

  var { data } = action

  try {
    const companyUsr = yield select(companyUser)

    data.company_id = companyUsr.company_id

    const voucher = yield call(api.getVoucher, data)
    yield put(AppActions.voucherSuccess(voucher))

  } catch (err) {
    yield put(AppActions.voucherFailure(err))
  }
}

export function * assignVoucher (api, action) {

  var { data } = action

  try {
    const companyUsr = yield select(companyUser)

    data.company_id = companyUsr.company_id

    const voucher = yield call(api.assignVoucher, data)

    yield put(AppActions.voucherSuccess(voucher))
    
  } catch (err) {

    yield put(AppActions.voucherFailure(err))
  }
}

export function * redeemVoucher (api, action) {

  var { data } = action

  try {
    const companyUsr = yield select(companyUser)

    data.company_id = companyUsr.company_id

    const voucher = yield call(api.redeemVoucher, data)

    yield put(AppActions.voucherSuccess(voucher))

  } catch (err) {
    
    yield put(AppActions.voucherFailure(err))
  }
}


export function * reset (action) {

  var { data } = action

  yield put(AppActions.reset({}))

  
}


export const authToken = (state: Object) => {
  return state.app.token
}

export const companyUser = (state: Object) => {
  return state.app.companyUser
}
