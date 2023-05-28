const databaseManager = require('./databaseManager')
const passwordCryptographer = require('./passwordCryptographer')

/**
 * Create a new Account
 * @param {String} email 
 * @param {String} plainPassword 
 * @param {String} nickname 
 * @returns Account creation success as a Boolean
 */
module.exports.createAccount = async function (email, plainPassword, nickname) {

  // Verify provided email is not in the database
  let image = null
  const response = await fetch(`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${nickname}`);
  if (response.ok) {
    // Get the generated avatar
    image = `data:image/svg+xml;base64,${Buffer.from(await response.text()).toString('base64')}`
  }
  
  let res
  try {
    const dbRequest = await databaseManager.getUser(email)
    //console.log(dbRequest)
    if (dbRequest) {
      res = false
      //throw 'Email already in database'
    }
    const hashedPassword = await passwordCryptographer.hashPassword(plainPassword)
    res = await databaseManager.createUserAccount(email, hashedPassword, nickname, image)
  } catch (err) {
    console.error(err)
  }
  return res
}

/**
 * Delete an Account with "id"
 * @param {Number} id 
 * @returns Deletion success
 */
module.exports.deleteAccount = async function (id) {
  try {
    const res = await databaseManager.deleteUserAccount(id)
    return res
  } catch (err) {
    console.error(err)
  }
}

/**
 * Update an Account attributes
 * @param {Number} id 
 * @param {Array} data 
 * @returns Account update success as a Boolean
 */
module.exports.updateAccount = async function (id, data) {
  try {
    for (const key in data) {
      const res = await databaseManager.updateUserAccount(id, key, data[key])
      if (!res) {
        return false
      }
    }
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

/**
 * Authenticate an User
 * @param {String} email 
 * @param {String} plainPassword 
 * @returns User if "email" and "plainPassword" matches a User, otherwise an error code, 1 : "email" not found, 2 : wrong "plainPassword"
 */
module.exports.loginAccount = async function (email, plainPassword) {
  try {
    const hashedPassword = await databaseManager.getHashedPassword(email)
    if (!hashedPassword) {
      return 1
    }
    if (!await passwordCryptographer.comparePlainHashed(plainPassword, hashedPassword)) {
      return 2
    }
    return await databaseManager.getUser(email)
  } catch (err) {
    console.error(err)
  }
}

/**
 * Get an User from "email"
 * @param {String} email 
 * @returns User
 */
module.exports.getUser = async function (email) {
  try {
    const user = await databaseManager.getUser(email)
    return user
  } catch (err) {
    console.error(err)
  }
}

/**
 * Get the administration status of User with "email"
 * @param {String} email 
 * @returns Administration status as a Boolean
 */
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