const databaseManager = require('./databaseManager')
const passwordCryptographer = require('./passwordCryptographer')

module.exports.createAccount = async function (email, plainPassword) {
  // TODO: verify email is valid

  // Verify provided email is not in the database
  let res
  try {
    const dbRequest = await databaseManager.getUser(email)
    if (dbRequest) {
      res = false
      throw 'Email already in database'
    }
    const hashedPassword = passwordCryptographer.hashPassword(plainPassword)

    const dbExecution = await databaseManager.createUserAccount(email, hashedPassword)
    res = dbExecution
  } catch (err) {
    console.error(err)
  }
  return res
}

module.exports.loginAccount = async function (email, plainPassword) {

}
