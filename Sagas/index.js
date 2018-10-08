import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { AppTypes } from '../Redux/AppRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'

import { login, logout, initSession, getVoucher, assignVoucher, redeemVoucher, reset } from './AppSagas'


/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(AppTypes.RESET, reset),
		takeLatest(AppTypes.LOGIN, login, api),
		takeLatest(AppTypes.LOGOUT, logout, api),
		takeLatest(AppTypes.INIT_SESSION, initSession, api),
		takeLatest(AppTypes.GET_VOUCHER, getVoucher, api),
		takeLatest(AppTypes.ASSIGN_VOUCHER, assignVoucher, api),
		takeLatest(AppTypes.REDEEM_VOUCHER, redeemVoucher, api),
  ])
}
