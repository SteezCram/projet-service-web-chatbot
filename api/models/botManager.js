const databaseManager = require('./databaseManager')

module.exports.getAll = async function (email) {
  let dbRequest
  try {
    dbRequest = await databaseManager.getBots(email)
    //console.log(dbRequest)
    if (!dbRequest) {
        dbRequest = []
    }
  } catch (err) {
    console.error(err)
  }
  return res
}