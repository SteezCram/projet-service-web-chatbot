const databaseManager = require('./databaseManager')

module.exports.getAll = async function (email) {
  let dbRequest
  try {
    dbRequest = await databaseManager.getBots(email)
    if (!dbRequest) {
        dbRequest = []
    }
  } catch (err) {
    console.error(err)
  }
  return dbRequest
}