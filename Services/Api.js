// a library to wrap and simplify api calls
import apisauce from 'apisauce'

import { AppError, Company, CompanyUser, Token, Voucher } from '../Models'

// our "constructor"
const create = (baseURL = 'https://apiurl.com') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  const setAuthToken = (token) => {
    // Logger.log({ function: 'Api.setAuthToken', token: token })
    api.setHeader('Authorization', 'Bearer ' + token)
  }
  
  const processResponse = (response) => {
    // Logger.log({ function: 'Api.processResponse', response: response })
    console.log('processResponse', response);
    if (response.data.error) {
      throw new AppError(response.data.error)
    }

    return response.data
  }

  const processError = (err) => {
    console.log('processError', err);
    if (err instanceof AppError) {
      throw err
    } else {
      throw new AppError(err)
    }
  }

  const login = (data: Object) => {

    var finalData = {
      grant_type : 'password',
      client_id: '0',
      client_secret: 'secret',
      username: data.email,
      password: data.password
    }

    return api.post('/oauth/token', finalData)
    .then((response) => {
      if (response.data.error || response.data.exception) {
        throw new AppError(response.data)
      }

      const retval = Token.fromJson(response.data)

      return retval
    }).catch((err) => {
      processError(err)
    })
  }

  const getCompanies = (data: Object) => {
    return api.get('/api/login')
    .then((response) => {
      if (response.data.error || response.data.exception) {
        throw new AppError(response.data)
      }

      const retval = Company.fromJson(response.data)

      return retval
    }).catch((err) => {
      processError(err)
    })
  }

  const getCompanyUser = (data: Object) => {

    var finalData = {
      company_id : data.company_id,
    }

    return api.post('/api/login', finalData)
    .then((response) => {
      
      if (response.data.error || response.data.exception) {
        throw new AppError(response.data)
      }

      const retval = CompanyUser.fromJson(response.data.data)

      return retval
    }).catch((err) => {
      processError(err)
    })
  }

  const getVoucher = (data: Object) => {
    return api.get('/api/company/' + data.company_id + '/giftcards/' + data.code)
    .then((response) => {
      console.log('getVoucher', response);
      if (response.data.error || response.data.exception) {
        throw new AppError(response.data)
      }

      const retval = Voucher.fromJson(response.data)
      return retval
    }).catch((err) => {
      processError(err)
    })
  }

  const assignVoucher = (data: Object) => {

    var finalData = {
      action: 'issued',
      amount: data.amount,
      promotional: data.promotional
    }
    console.log('parseFormData', finalData)
    return api.patch('/api/company/' + data.company_id + '/giftcards/' + data.code, finalData)
    .then((response) => {
      
      console.log('assignVoucherResponse', response)

      if (response.data.error || response.data.exception) {
        throw new AppError(response.data)
      }

      const retval = Voucher.fromJson(response.data)
      console.log('sucessVoucherAssignedResponse', retval)
      return retval
    }).catch((err) => {
      processError(err)
    })
  }

  const redeemVoucher = (data: Object) => {

    var finalData = {
      action : 'redeemed',
      amount : data.amount,
      promotional: data.promotional
    }
    console.log('parseFormData', finalData)
    return api.patch('/api/company/' + data.company_id + '/giftcards/' + data.code, finalData)
    .then((response) => {
      console.log('redeemVoucher', response);
      if (response.data.error || response.data.exception) {
        throw new AppError(response.data)
      }

      const retval = Voucher.fromJson(response.data)
      console.log('voucherReedemedResponse',retval)
      return retval
    }).catch((err) => {
      processError(err)
    })
  }

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //



  return {
    // a list of the API functions from step 2
    setAuthToken,
    login,
    getCompanies,
    getCompanyUser,
    getVoucher,
    assignVoucher,
    redeemVoucher
  }
}

// let's return back our create method as the default.
export default {
  create
}
