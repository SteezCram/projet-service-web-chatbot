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
    let botImage = botData.image
    if (!botImage) {
      const response = await fetch(`https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${botName}`);
      if (response.ok) {
        // Get the generated avatar
        botImage = `data:image/svg+xml;base64,${Buffer.from(await response.text()).toString('base64')}`
      }
    }

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

module.exports.deleteBot = async function (id) {
  let dbRequest
  try {
    dbRequest = await databaseManager.deleteBot(id)
    if (!dbRequest) {
        dbRequest = {}
    }
  } catch (err) {
    console.error(err)
  }
  return dbRequest
}