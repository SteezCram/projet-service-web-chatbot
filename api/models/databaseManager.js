/**
 * @namespace api\models\databaseManager
*/

/**
 * Contains the direct interface to run CRUD operations on the database
 * The database contains tables related to :
 * - users
 * - (chat)bots
 * - discussion histories
 * - Rivescripts
 * @memberof api\models\databaseManager
*/

/**
 * User settings
 * @memberof api\models\databaseManager
*/

const dbPATH = '../database.db'; // Path to the database file

/**
 * EDIT AT YOUR OWN RISK
 * @memberof api\models\databaseManager
*/

const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

sqlite3.verbose();

// this is a top-level await
(async () => {
  // open the database
  global.database = await open({
    filename: dbPATH,
    driver: sqlite3.Database
  })
  // enable foreign keys
  await database.run('PRAGMA foreign_keys = ON')
})()



/**
 * 
 * CRUD operation for the table "chatbot_user"
 * @memberof api\models\databaseManager
*/

/**
 * Get a User with the attribute "email"
 * @param {String} email 
 * @returns User with the associated email if referenced in the database, otherwise undefined value
 * @memberof api\models\databaseManager
*/
module.exports.getUser = async function (email) {
  let result
  try {
    result = await database.get('SELECT * FROM chatbot_user WHERE chatbot_user.email = ?', email)
  } catch (err) {
    console.log(err)
  }
  return result
}

/**
 * Get a Hasher Password with the attribute "email"
 * @param {String} email 
 * @returns Hashed password associated to the email if referenced in the database, otherwise undefined value
 * @memberof api\models\databaseManager
*/
module.exports.getHashedPassword = async function (email) {
  let hashedPassword
  try {
    const result = await database.get('SELECT chatbot_user.password FROM chatbot_user WHERE chatbot_user.email = ?', email)
    if (result) {
      hashedPassword = result.password
    }
  } catch (err) {
    console.log(err)
  }
  return hashedPassword
}

/**
 * Get the administration status with the attribute "email"
 * @param {String} email 
 * @returns Admin status associated to the email if referenced in the database, otherwise undefined value
 * @memberof api\models\databaseManager
*/
module.exports.getAdminStatus = async function (email) {
  let adminStatus = 0
  try {
    const result = await database.get('SELECT chatbot_user.isAdmin FROM chatbot_user WHERE chatbot_user.email = ?', email)
    if (result) {
      adminStatus = result.isAdmin
    }
  } catch (err) {
    console.log(err)
  }
  return adminStatus
}

/**
 * Create a new User in the database
 * @param {String} email 
 * @param {String} hashedPassword 
 * @param {String} nickname 
 * @param {String} image 
 * @returns INSERT query result as a Boolean
 * @memberof api\models\databaseManager
*/
module.exports.createUserAccount = async function (email, hashedPassword, nickname, image) {
  try {
    await database.run('INSERT INTO chatbot_user (email, password, nickname, image) VALUES (?, ?, ?, ?)', [
      email,
      hashedPassword,
      nickname,
      image
    ])
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

/**
 * Delete an User from the database
 * @param {Number} id 
 * @returns DELETE query result as a Boolean
 * @memberof api\models\databaseManager
*/
module.exports.deleteUserAccount = async function (id) {
  try {
    await database.run('DELETE FROM chatbot_user WHERE id = ?', id)
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

/**
 * Update a specific attribute of a given User "id"
 * @param {Number} id 
 * @param {String} key 
 * @param {*} value 
 * @returns UPDATE query result as a Boolean
 * @memberof api\models\databaseManager
*/
module.exports.updateUserAccount = async function (id, key, value) {
  try {
    await database.run('UPDATE chatbot_user SET ${key} = ? WHERE id = ?', [
      value,
      id
    ])
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}



/**
 * 
 * CRUD operation for the table "chatbot_user"
 * @memberof api\models\databaseManager
*/

/**
 * Get all the Bots stored in the database
 * @returns An array of Bots
 * @memberof api\models\databaseManager
*/
module.exports.getBots = async function () {
  let result
  try {
    result = await database.all('SELECT * FROM chatbot_bot')
    result.map(bot => {
      bot.rivescripts = JSON.parse(bot.rivescripts)
      return bot
    })
  } catch (err) {
    console.log(err)
  }
  return result
}

/**
 * Get a Bot with the attribute "id"
 * @param {Number} id 
 * @returns Bot with the associated id if referenced in the database, otherwise undefined
 * @memberof api\models\databaseManager
*/
module.exports.getBot = async function (id) {
  let result
  try {
    result = await database.get('SELECT * FROM chatbot_bot WHERE id = ?', id)
    result.rivescripts = JSON.parse(result.rivescripts)
  } catch (err) {
    console.log(err)
  }
  return result
}

/**
 * Get the Riverscript associated to the bot with the attribute "id"
 * @param {Number} id 
 * @returns RiverScript associated with the bot id if referenced in the database, otherwise undefined
 * @memberof api\models\databaseManager
*/
module.exports.getBotRiveScripts = async function (id) {
  let result
  try {
    result = await database.get('SELECT rivescripts FROM chatbot_bot WHERE id = ?', id)
    result = JSON.parse(result.rivescripts)
  } catch (err) {
    console.log(err)
  }
  return result
}

/**
 * Create a new Bot in the database
 * @param {String} name 
 * @param {String} description 
 * @param {String} script 
 * @param {String} image 
 * @returns INSERT query result as a Boolean
 * @memberof api\models\databaseManager
*/
module.exports.createBot = async function (name, description, rivescripts, image) {
  let res
  try {
    const result = await database.run('INSERT INTO chatbot_bot (name, description, rivescripts, image) VALUES (?, ?, ?, ?)', [
      name,
      description,
      rivescripts,
      image
    ])
    res = result.lastID
  } catch (err) {
    console.error(err)
  }
  return res
}

/**
 * Update a specific attribute of a given Bot through "id"
 * @param {Number} id 
 * @param {String} key 
 * @param {*} value 
 * @returns UPDATE query result as a Boolean
 * @memberof api\models\databaseManager
*/
module.exports.updateBot = async function (id, key, value) {
  try {
    await database.run(`UPDATE chatbot_bot SET ${key} = ? WHERE id = ?`, [
      value,
      id
    ])
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

/**
 * Delete a Bot from the database
 * @param {Number} id 
 * @returns DELETE query result as a Boolean
 * @memberof api\models\databaseManager
*/
module.exports.deleteBot = async function (id) {
  try {
    await database.run('DELETE FROM chatbot_bot WHERE id = ?', id)
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}



/**
 * 
 * CRUD operation for the table "chatbot_discussion"
 * @memberof api\models\databaseManager
*/

/**
 * Get the discussions associated with User of id "user_id"
 * @param {Number} user_id 
 * @returns An array of Discussions
 * @memberof api\models\databaseManager
*/
module.exports.getDiscussions = async function (user_id) {
  let result
  try {
    result = await database.all('SELECT DISTINCT(bot_id) FROM chatbot_discussion WHERE user_id = ?', user_id)
  } catch (err) {
    console.log(err)
  }
  return result
}

/**
 * Get a Discussion between "user_id" and "bot_id"
 * @param {Number} user_id 
 * @param {Number} bot_id 
 * @returns An (timely-)ordered array of messages between user_id & bot_id, otherwise undefined
 * @memberof api\models\databaseManager
*/
module.exports.getDiscussion = async function (user_id, bot_id) {
  let result
  try {
    result = await database.all('SELECT * FROM chatbot_discussion WHERE user_id = ? AND bot_id = ? ORDER BY timestamp', [user_id, bot_id])
  } catch (err) {
    console.log(err)
  }
  return result
}

/**
 * Delete the discussion between "user_id" and "bot_id"
 * @param {Number} user_id 
 * @param {Number} bot_id 
 * @returns DELETE query result as a Boolean
 * @memberof api\models\databaseManager
*/
module.exports.deleteDiscussion = async function (user_id, bot_id) {
  try {
    await database.run('DELETE FROM chatbot_discussion WHERE user_id = ? AND bot_id = ?', [user_id, bot_id])
    await database.run('DELETE FROM chatbot_discussion_variables WHERE user_id = ? AND bot_id = ?', [user_id, bot_id])
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

/**
 * Insert a new message in the discussion between "user_id" and "bot_id"
 * @param {Number} user_id 
 * @param {Number} bot_id 
 * @param {String} messageData 
 * @returns INSERT query result as a Boolean
 * @memberof api\models\databaseManager
*/
module.exports.addMessage = async function (user_id, bot_id, messageData) {
  try {
    await database.run('INSERT INTO chatbot_discussion (user_id, bot_id, is_bot, message, timestamp) VALUES (?, ?, ?, ?, ?)', [
      user_id,
      bot_id,
      messageData.is_bot,
      messageData.message,
      Date.now(),
    ])
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

/**
 * Get the variables from the discussion between "user_id" and "bot_id"
 * @param {Number} user_id 
 * @param {Number} bot_id 
 * @returns A map of variables
 * @memberof api\models\databaseManager
*/
module.exports.getDiscussionVariables = async function (user_id, bot_id) {
  let result
  try {
    result = await database.get('SELECT variables FROM chatbot_discussion_variables WHERE user_id = ? AND bot_id = ?', [user_id, bot_id])
    if (!result) {
      return {}
    }
    result = JSON.parse(result.variables)
  } catch (err) {
    console.log(err)
  }
  return result
}

/**
 * Update a variable in the discussion between "user_id" and "bot_id"
 * @param {Number} user_id 
 * @param {Number} bot_id 
 * @param {Map} variables 
 * @returns INSERT/UPDATE query result as a Boolean
 * @memberof api\models\databaseManager
*/
module.exports.updateDiscussionVariables = async function (user_id, bot_id, variables) {
  try {
    const hasLine = await database.get('SELECT COUNT(id) as c_id FROM chatbot_discussion_variables WHERE user_id = ? AND bot_id = ?', [user_id, bot_id])
    if (hasLine.c_id === 0) {
      await database.run('INSERT INTO chatbot_discussion_variables (user_id, bot_id, variables) VALUES (?, ?, ?)', [
        user_id,
        bot_id,
        JSON.stringify(variables)
      ])
      return true
    }

    await database.run('UPDATE chatbot_discussion_variables SET variables = ? WHERE user_id = ? AND bot_id = ?', [
      JSON.stringify(variables),
      user_id,
      bot_id
    ])
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}



/**
 * 
 * CRUD operation for the table "chatbot_riverscript"
 * @memberof api\models\databaseManager
*/

/**
 * Get all the RiverScripts stored in the database
 * @returns An array of RiverScripts
 * @memberof api\models\databaseManager
*/
module.exports.getRiveScripts = async function () {
  let result
  try {
    result = await database.all('SELECT * FROM chatbot_rivescript')
  } catch (err) {
    console.log(err)
  }
  return result
}

/**
 * Get a RiverScript with the attribute "id"
 * @param {Number} id 
 * @returns The rivescript associated with the id if referenced in the database, otherwise undefined
 * @memberof api\models\databaseManager
*/
module.exports.getRiveScript = async function (id) {
  let result
  try {
    result = await database.get('SELECT * FROM chatbot_rivescript WHERE id = ?', id)
  } catch (err) {
    console.log(err)
  }
  return result
}

/**
 * Create a new RiverScript in the database
 * @param {String} name 
 * @param {String} content 
 * @returns INSERT query result as a Boolean
 * @memberof api\models\databaseManager
*/
module.exports.createRiveScript = async function (name, content) {
  let res
  try {
    const result = await database.run('INSERT INTO chatbot_rivescript (name, content) VALUES (?, ?)', [
        name,
        content
    ])
    res = result.lastID
  } catch (err) {
    console.error(err)
  }
  return res
}

/**
 * Update a specific attribute of a given RiverScript through "id"
 * @param {Number} id 
 * @param {String} key 
 * @param {*} value 
 * @returns UPDATE query result as a Boolean
 * @memberof api\models\databaseManager
*/
module.exports.updateRiveScript = async function (id, key, value) {
  try {
    await database.run(`UPDATE chatbot_rivescript SET ${key} = ? WHERE id = ?`, [
      value,
      id
    ])
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

/**
 * Delete a RiverScript from the database
 * @param {Number} id 
 * @returns DELETE query result as a Boolean
 * @memberof api\models\databaseManager
*/
module.exports.deleteRiveScript = async function (id) {
  try {
    await database.run('DELETE FROM chatbot_rivescript WHERE id = ?', id)
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

/**
 * Get the bots with the RiverScript "id"
 * @param {Number} id RiverScript identifier 
 * @returns An array of bots
 * @memberof api\models\databaseManager
*/
module.exports.getBotsByRiveScript = async function (id) {
  let result
  try {
    result = await database.all('SELECT * FROM chatbot_bot')
    result = result.filter(bot => {
      bot.rivescripts = JSON.parse(bot.rivescripts)
      return bot.rivescripts.includes(id)
    })
  } catch (err) {
    console.log(err)
  }
  return result
}