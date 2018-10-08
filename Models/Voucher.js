
import { findByProp } from 'ramdasauce'
import Moment from 'moment';
import 'moment-timezone';


class Voucher {


  id: Number
  order_id: Number
  company_id: Number
  wrapping_id: String
  code: String
  message: String
  amount: Number
  amount_: String
  status: String
  promotional: Number
  issued_at: Date
  redeemed_at: Date
  created_at: Date
  updated_at: Date
  code_: String
  issued_at_date: String
  issued_at_time: String
  redeemed_at_date: String
  redeemed_at_time: String

  constructor() {
    this.amount_ = '19.49'
  }

  static fromJson = (json) => {

    var retval: Voucher = new Voucher()
    retval.id = json.id
    retval.order_id = json.order_id
    retval.company_id = json.company_id
    retval.wrapping_id = json.wrapping_id
    retval.code = json.code
    retval.message = json.message
    retval.amount = json.amount
    retval.status = json.status
    retval.promotional = json.promotional
    retval.issued_at = json.issued_at
    retval.redeemed_at = json.redeemed_at
    retval.created_at = json.created_at
    retval.updated_at = json.updated_at
    retval.code_ = json.code.match(/.{1,4}/g).join('-')
    
    if(json.issued_at){
      var iDate = Moment(json.issued_at, "YYYY-MM-DD HH:mm:ss").tz('Europe/Amsterdam')
      retval.issued_at_date = iDate.format("DD-MM-YYYY")
      retval.issued_at_time = iDate.format("HH:mm")
    }

    if(json.redeemed_at){
      var iDate = Moment(json.redeemed_at, "YYYY-MM-DD HH:mm:ss").tz('Europe/Amsterdam')
      retval.redeemed_at_date = iDate.format("DD-MM-YYYY") 
      retval.redeemed_at_time = iDate.format("HH:mm")
    }

    if (json.amount && json.amount > 0){
      retval.amount_ = json.amount/100
      retval.amount_ = retval.amount_.toFixed(2).toString().replace('.',',')
    } else {
      retval.amount_ = json.amount
    }


    return retval
  }
}

export default Voucher
