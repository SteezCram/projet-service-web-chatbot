const databaseManager = require('./databaseManager')

module.exports.getAll = async function () {
  let dbRequest
  try {
    dbRequest = await databaseManager.getBots()
    if (!dbRequest) {
        dbRequest = []
    }
  } catch (err) {
    console.error(err)
  }
  return dbRequest
}