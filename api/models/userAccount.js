const databaseManager = require('./databaseManager')
const passwordCryptographer = require('./passwordCryptographer')

module.exports.createAccount = async function (email, plainPassword, nickname, image) {
  // TODO: verify email is valid

  // Verify provided email is not in the database
  if (!image) {
    const response = await fetch(`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${nickname}`);
    if (response.ok) {
      // Get the generated avatar
      image = `data:image/svg+xml;base64,${Buffer.from(await response.text()).toString('base64')}`
    }
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
    res = await databaseManager.createUserAccount(email, hashedPassword, nickname)
  } catch (err) {
    console.error(err)
  }
  return res
}

module.exports.deleteAccount = async function (id) {
  try {
    const res = await databaseManager.deleteUserAccount(id)
    return res
  } catch (err) {
    console.error(err)
  }
}

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

module.exports.getUser = async function (email) {
  try {
    const user = await databaseManager.getUser(email)
    return user
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