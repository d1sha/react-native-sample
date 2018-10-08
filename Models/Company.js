
import { findByProp } from 'ramdasauce'


class Company {
 
  static fromJson = (json) => {

    var retval: Company = new Company()
    retval = json
    
    return retval
  }
}

export default Company
