import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { Voucher } from '../Models';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  appRequest: ['data'],
  reset: ['data'],
  appFailure: null,
  login: ['data'],
  loginSuccess: ['token'],
  loginFailure: ['error'],
  logout: ['data'],
  logoutSuccess: ['token'],
  logoutFailure: ['error'],
  initSession: ['data'],
  initSessionSuccess: ['companyUser'],
  initSessionFailure: ['error'],
  getVoucher: ['data'],
  assignVoucher: ['data'],
  redeemVoucher: ['data'],
  voucherSuccess: ['voucher'],
  voucherFailure: ['error'],
})

export const AppTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: false,
  payload: null,
  error: null,
  token: null,
  companyUser:null,
  voucher:null,
})

/* ------------- Selectors ------------- */

export const AppSelectors = {
  getUser: state => state.companyUser
}

/* ------------- Reducers ------------- */

export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

export const reset = (state, action) => {
  return state.merge({ error: null })
}

export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })


export const login = (state: Object) => {
  return state.merge({ fetching: true, error: null, token: null})
}

export const loginSuccess = (state: Object, action) => {
  const { token } = action

  return state.merge({ fetching: false, error: null, token: token })
}

export const loginFailure = (state: Object, { error }: Object) => {
  return state.merge({ fetching: false, error })
}

export const logout = (state: Object) => {
  return state.merge({ fetching: true, error: null, token: null})
}

export const logoutSuccess = (state: Object, action) => {
  const { token } = action

  return state.merge({ fetching: false, error: null, token: token })
}

export const logoutFailure = (state: Object, { error }: Object) => {
  return state.merge({ fetching: false, error })
}

export const initSession = (state: Object) => {
  return state.merge({ fetching: true, error: null, voucher:null})
}

export const initSessionSuccess = (state: Object, action) => {
  const { companyUser } = action

  return state.merge({ fetching: false, error: null, companyUser: companyUser, voucher:null })
}

export const initSessionFailure = (state: Object, { error }: Object) => {
  return state.merge({ fetching: false, error })
}

export const getVoucher = (state: Object, action) => {
  return state.merge({ fetching: true, error: null, voucher: null})
}

export const assignVoucher = (state: Object) => {
  return state.merge({ fetching: true, error: null})
}

export const redeemVoucher = (state: Object) => {
  return state.merge({ fetching: true, error: null})
}


export const voucherSuccess = (state: Object, action) => {
  const { voucher } = action;
  return state.merge({ fetching: false, error: null, voucher: voucher })
}

export const voucherFailure = (state: Object, { error }: Object) => {
  return state.merge({ fetching: false, error })
}



/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET]: reset,
  [Types.LOGIN]: login,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.LOGOUT]: logout,
  [Types.LOGOUT_SUCCESS]: logoutSuccess,
  [Types.LOGOUT_FAILURE]: logoutFailure,
  [Types.INIT_SESSION]: initSession,
  [Types.INIT_SESSION_SUCCESS]: initSessionSuccess,
  [Types.INIT_SESSION_FAILURE]: initSessionFailure,


  [Types.GET_VOUCHER]: getVoucher,
  [Types.ASSIGN_VOUCHER]: assignVoucher,
  [Types.REDEEM_VOUCHER]: redeemVoucher,
  [Types.VOUCHER_SUCCESS]: voucherSuccess,
  [Types.VOUCHER_FAILURE]: voucherFailure,
})
