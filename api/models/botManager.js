/**
 * @namespace api\models\botManager
*/
const fs = require('fs')

const RiveScript = require('rivescript')

const databaseManager = require('./databaseManager')
const riveScriptManager = require('./riveScriptManager')


let rivescriptBots = {}

/**
 * Create a new bot
 * @param {{name: String, description: String, script: String, image: String}} botData 
 * @returns Id of the newly created bot, -1 if creation failed
 * @memberof api\models\botManager
*/
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

/**
 * Update Bot attributes
 * @param {Number} id 
 * @param {Array} botData 
 * @returns Bot update success as a Boolean
 * @memberof api\models\botManager
*/
module.exports.updateBot = async function (id, botData) {
  try {
    for (const key in botData) {
      const res = await databaseManager.updateBot(id, key, botData[key])
      if (!res) {
        return false
      }

      // Reload bot if rivescripts changed
      if (key === 'rivescripts') {
        if (this.isBotRunning(id)) {
          this.stopBot(id)
          this.startBot(id)
        }
      }
    }
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

/**
 * Get all the Bots
 * @returns Array of Bots
 * @memberof api\models\botManager
*/
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

/**
 * Get a Bot from "id"
 * @param {Number} id 
 * @returns Bot
 * @memberof api\models\botManager
*/
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

/**
 * Get the RiverScript of Bot with "id"
 * @param {Number} id 
 * @returns RiverScript
 * @memberof api\models\botManager
*/
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

/**
 * Delete Bot with "id"
 * @param {Number} id 
 * @returns Deletion success
 * @memberof api\models\botManager
*/
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

/**
 * Get the status of Bot "bot_id"
 * @param {Number} bot_id 
 * @returns Running status as a Boolean
 * @memberof api\models\botManager
*/
module.exports.isBotRunning = function (bot_id) {
  if (rivescriptBots[bot_id]) return true
  return false
}

/**
 * Allocate the variable value in the discussion between "bot_id" and "user_id"
 * @param {Number} bot_id 
 * @param {Number} user_id 
 * @returns Variable allocation success as a Boolean
 * @memberof api\models\botManager
*/
module.exports.setBotVariables = async function (bot_id, user_id) {
  let bot = rivescriptBots[bot_id]
  if (!bot) {
    await this.startBot(bot_id)
    bot = rivescriptBots[bot_id]
  }

  const variables = await databaseManager.getDiscussionVariables(user_id, bot_id)
  if (!variables) {
    return false
  }

  for (const key in variables) {
    await bot.setUservar(user_id, key, variables[key])
  }

  return true
}

/**
 * Start the bot "bot_id"
 * @param {Number} bot_id 
 * @returns Start success as a Boolean
 * @memberof api\models\botManager
*/
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

/**
 * Stop a bot "bot_id"
 * @param {Number} bot_id 
 * @memberof api\models\botManager
*/
module.exports.stopBot = function (bot_id) {
  delete rivescriptBots[bot_id]
}

/**
 * Get a reply from bot "bot_id" after "user_id" sent "message"
 * @param {Number} bot_id 
 * @param {Number} user_id 
 * @param {String} message 
 * @returns Reply from "bot_id"
 * @memberof api\models\botManager
*/
module.exports.getBotReply = async function (bot_id, user_id, message) {
  let bot = rivescriptBots[bot_id] // bot is already loaded since we call setBotVariables before

  const reply = await bot.reply(user_id, message)
  let vars = await bot.getUservars(user_id)
  const filtered = Object.entries(vars).filter(([k, v]) => k !== 'topic' && !k.startsWith('__'))
  vars = Object.fromEntries(filtered)
  // We have the users variables now, we can save them to the database
  await databaseManager.updateDiscussionVariables(user_id, bot_id, vars)

  return reply
}
