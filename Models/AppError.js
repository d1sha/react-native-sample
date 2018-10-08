

class AppError {
  error: String
  message: String
  stack: String
  hint: String

  constructor (errorObj) {
    this.error = errorObj.error
    this.message = errorObj.message
    this.hint = errorObj.hint

    this.stack = (new Error()).stack
  }
}

export default AppError
