const databaseManager = require('./databaseManager')

module.exports.createBot = async function (botData) {
  let newBotID = -1
  try {
    let botName = "Unnamed bot"
    if (botData.name){
      botName = botData.name
    }
    const botDescription = botData.description
    const botScript = botData.script
    const botImage = botData.image

    newBotID = await databaseManager.createBot(botName, botDescription, botScript, botImage)
  } catch (err) {
    console.error(err)
  }
  return newBotID
}

module.exports.getAll = async function () {
  let dbRequest
  try {
    dbRequest = await databaseManager.getBots()
    if (!dbRequest) {
        dbRequest = {}
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
        dbRequest = {}
    }
  } catch (err) {
    console.error(err)
  }
  return dbRequest
}