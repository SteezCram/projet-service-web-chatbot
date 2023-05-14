const fs = require('fs')

const RiveScript = require('rivescript')
const tmp = require('tmp');

const databaseManager = require('./databaseManager')
const riveScriptManager = require('./riveScriptManager')


let rivescriptBots = {}

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

module.exports.updateBot = async function (id, botData) {
  try {
    for (const key in botData) {
      const res = await databaseManager.updateBot(id, key, botData[key])
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

module.exports.getBotRiveScripts = async function (id) {
  let dbRequest
  try {
    dbRequest = await databaseManager.getBotRiveScripts(id)
    if (!dbRequest) {
      dbRequest = []
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

module.exports.isBotRunning = function (bot_id) {
  if (rivescriptBots[bot_id]) return true
  return false
}

module.exports.startBot = async function (bot_id) {
  const botRiveScripts = await this.getBotRiveScripts(bot_id)
  if (!botRiveScripts) {
    return false
  }

  const bot = new RiveScript()

  for (const riveScript of botRiveScripts) {
    bot.stream((await riveScriptManager.getRiveScript(riveScript)).content)
  }

  bot.sortReplies()

  rivescriptBots[bot_id] = bot
}

module.exports.stopBot = function (bot_id) {
  delete rivescriptBots[bot_id]
}

module.exports.getBotReply = function (bot_id, user_id, message) {
  const bot = rivescriptBots[bot_id]
  if (!bot) {
    return false
  }

  return bot.reply(user_id, message)
}
