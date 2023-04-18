const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

sqlite3.verbose()

// this is a top-level await
// TODO: put in a function
const dbPATH = '../database.db';
(async () => {
  // open the database
  global.database = await open({
    filename: dbPATH,
    driver: sqlite3.Database
  })
})()

module.exports.getUser = async function (email) {
  let result
  try {
    result = await database.get(`SELECT * FROM chatbot_user WHERE chatbot_user.email = '${email}'`)
  } catch (err) {
    console.log(err)
  }
  return result
}

module.exports.getHashedPassword = async function (email) {
  let hashedPassword
  try {
    const result = await database.get(`SELECT chatbot_user.password FROM chatbot_user WHERE chatbot_user.email = '${email}'`)
    if (result) {
      hashedPassword = result.password
    }
  } catch (err) {
    console.log(err)
  }
  return hashedPassword
}

module.exports.getAdminStatus = async function (email) {
  let adminStatus = 0
  try {
    const result = await database.get(`SELECT chatbot_user.isAdmin FROM chatbot_user WHERE chatbot_user.email = '${email}'`)
    if (result) {
      adminStatus = result.isAdmin
    }
  } catch (err) {
    console.log(err)
  }
  return adminStatus
}

module.exports.createUserAccount = async function (email, hashedPassword) {
  try {
    await database.exec(`INSERT INTO chatbot_user (email, password) VALUES ('${email}', '${hashedPassword}')`)
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

module.exports.getBots = async function () {
  let result
  try {
    result = await database.all(`SELECT * FROM chatbot_bot`)
  } catch (err) {
    console.log(err)
  }
  return result
}

module.exports.getBot = async function (id) {
  let result
  try {
    result = await database.all(`SELECT * FROM chatbot_bot WHERE id=${id}`)
  } catch (err) {
    console.log(err)
  }
  return result
}