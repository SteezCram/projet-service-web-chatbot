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

module.exports.getBot = async function (id) {
  let dbRequest
  try {
    dbRequest = await databaseManager.getBot(id)
    if (!dbRequest) {
        dbRequest = []
    }
  } catch (err) {
    console.error(err)
  }
  return dbRequest
}