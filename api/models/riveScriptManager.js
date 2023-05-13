const databaseManager = require('./databaseManager')
// chatbot_rivescript
// ID, NAME, CONTENT

module.exports.createRiveScript = async function (riveScriptData) {
  let newRiveScriptID = -1
  try {
    newRiveScriptID = await databaseManager.createRiveScript(riveScriptData.name, riveScriptData.content)
  } catch (err) {
    console.error(err)
  }
  return newRiveScriptID
}

module.exports.updateRiveScript = async function (id, riveScriptData) {
  try {
    for (const key in riveScriptData) {
      const res = await databaseManager.updateRiveScript(id, key, riveScriptData[key])
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
    dbRequest = await databaseManager.getRiveScripts()
    if (!dbRequest) {
        dbRequest = {}
    }
  } catch (err) {
    console.error(err)
  }
  return dbRequest
}

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

module.exports.deleteRiveScript = async function (id) {
  let dbRequest
  try {
    dbRequest = await databaseManager.deleteRiveScript(id)
    if (!dbRequest) {
        dbRequest = {}
    }
  } catch (err) {
    console.error(err)
  }
  return dbRequest
}