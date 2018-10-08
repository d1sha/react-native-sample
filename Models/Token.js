
import { findByProp } from 'ramdasauce'


class Token {
  token_type: String
  expires_in: Number
  access_token: String
  refresh_token: String
  expires_on : Number


  static fromJson = (json) => {

    var retval: Token = new Token()
    retval.token_type = json.token_type
    retval.expires_in = json.expires_in
    retval.access_token = json.access_token
    retval.refresh_token = json.refresh_token
    retval.expires_on = Date.now() + (json.expires_in * 1000)
    
    return retval
  }
}

export default Token
