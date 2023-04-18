const databaseManager = require('./databaseManager')
const passwordCryptographer = require('./passwordCryptographer')

module.exports.createAccount = async function (email, plainPassword, nickname) {
  // TODO: verify email is valid

  // Verify provided email is not in the database
  let res
  try {
    const dbRequest = await databaseManager.getUser(email)
    //console.log(dbRequest)
    if (dbRequest) {
      res = false
      //throw 'Email already in database'
    }
    const hashedPassword = await passwordCryptographer.hashPassword(plainPassword)
    res = await databaseManager.createUserAccount(email, hashedPassword, nickname)
  } catch (err) {
    console.error(err)
  }
  return res
}

module.exports.loginAccount = async function (email, plainPassword) {
  try {
    const hashedPassword = await databaseManager.getHashedPassword(email)
    if (!hashedPassword) {
      return undefined
    }
    if  (!await passwordCryptographer.comparePlainHashed(plainPassword, hashedPassword)) {
      return undefined
    }
    return await databaseManager.getUser(email)
  } catch (err) {
    console.error(err)
  }
}

module.exports.isAdmin = async function (email) {
  try {
    const isAdmin = await databaseManager.getAdminStatus(email)
    if (isAdmin == 1) {
      return true
    } else {
      return false
    }
  } catch ( err ) {

  }
}