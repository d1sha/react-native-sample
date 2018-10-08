
import { findByProp } from 'ramdasauce'


class CompanyUser {
    id : Number
    company_id : String
    company : {
      name : String
    }
    email : String
    first_name : String
    last_name : String
    administrator : Boolean
    giftcard_issue : Boolean
    giftcard_redeem : Boolean
    financials : Boolean
    statistics : Boolean
    admin_gifty : Boolean
  

  static fromJson = (json) => {

    var retval: CompanyUser = new CompanyUser()
    retval.id = json.id
    retval.company_id = json.company_id
    retval.company = json.company
    retval.company.name = json.company.name
    retval.email = json.email
    retval.first_name = json.first_name
    retval.last_name = json.last_name
    retval.administrator = json.administrator
    retval.giftcard_issue = json.giftcard_issue
    retval.giftcard_redeem = json.giftcard_redeem
    retval.financials = json.financials
    retval.statistics = json.statistics
    retval.admin_gifty = json.admin_gifty
    
    return retval
  }
}

export default CompanyUser
