const databaseManager = require('./databaseManager')
const botManager = require('./botManager')

/**
 * Create a new RiverScript
 * @param {name: String, content: String} riveScriptData 
 * @returns Id of the newly created RiverScript, -1 if creation failed
 */
module.exports.createRiveScript = async function (riveScriptData) {
  let newRiveScriptID = -1
  try {
    newRiveScriptID = await databaseManager.createRiveScript(riveScriptData.name, riveScriptData.content)
  } catch (err) {
    console.error(err)
  }
  return newRiveScriptID
}

/**
 * Update RiverScript attributes
 * @param {Number} id 
 * @param {Array} riveScriptData 
 * @returns RiverScript update status success as a Boolean
 */
module.exports.updateRiveScript = async function (id, riveScriptData) {
  id = parseInt(id, 10)
  try {
    for (const key in riveScriptData) {
      const res = await databaseManager.updateRiveScript(id, key, riveScriptData[key])
      if (!res) {
        return false
      }

      // Reload all the bots that use this rivescript
      const bots = await databaseManager.getBotsByRiveScript(id)
      for (const bot of bots) {
        // Restart the bot if it was running (to reload the rivescript)
        if (botManager.isBotRunning(bot.id)) {
          botManager.stopBot(bot.id)
          botManager.startBot(bot.id)
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
 * Get all the RiverScripts
 * @returns Array of RiverScripts
 */
module.exports.getAll = async function () {
  let dbRequest
  try {
    dbRequest = await databaseManager.getRiveScripts()
    if (!dbRequest) {
        dbRequest = {}
    }
  } catch (err) {
    console.error(err)
  }
  return dbRequest
}

/**
 * Get a RiverScript from "id"
 * @param {Number} id 
 * @returns RiverScript
 */
module.exports.getRiveScript = async function (id) {
  let dbRequest
  try {
    dbRequest = await databaseManager.getRiveScript(id)
    if (!dbRequest) {
        dbRequest = {}
    }
  } catch (err) {
    console.error(err)
  }
  return dbRequest
}

/**
 * Delete RiverScript with "id"
 * @param {Number} id 
 * @returns Deletion success
 */
module.exports.deleteRiveScript = async function (id) {
  id = parseInt(id, 10)
  let dbRequest
  try {
    dbRequest = await databaseManager.deleteRiveScript(id)
    if (!dbRequest) {
      dbRequest = {}
    }
    // Reload all the bots that use this rivescript
    const bots = await databaseManager.getBotsByRiveScript(id)
    for (const bot of bots) {
      bot.rivescripts = bot.rivescripts.filter(rivescript => rivescript !== id)
      await databaseManager.updateBot(bot.id, 'rivescripts', JSON.stringify(bot.rivescripts))

      // Restart the bot if it was running (to reload the rivescript)
      if (botManager.isBotRunning(bot.id)) {
        botManager.stopBot(bot.id)
        botManager.startBot(bot.id)
      }
    }
  } catch (err) {
    console.error(err)
  }
  return dbRequest
}