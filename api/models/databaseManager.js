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

module.exports.createUserAccount = async function (email, hashedPassword) {
  try {
    await database.exec(`INSERT INTO chatbot_user (email, password) VALUES ('${email}', '${hashedPassword}')`)
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}
