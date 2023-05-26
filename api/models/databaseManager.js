const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

sqlite3.verbose()

// this is a top-level await
// TODO: put in a function
const dbPATH = '../database.db';
(async () => {
  // open the database
  global.database = await open({
    filename: dbPATH,
    driver: sqlite3.Database
  })
})()



// chatbot_user

module.exports.getUser = async function (email) {
  let result
  try {
    result = await database.get('SELECT * FROM chatbot_user WHERE chatbot_user.email = ?', email)
  } catch (err) {
    console.log(err)
  }
  return result
}

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

module.exports.deleteUserAccount = async function (id) {
  try {
    await database.run('DELETE FROM chatbot_user WHERE id = ?', id)
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

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



// chatbot_bot

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

module.exports.createBot = async function (name, description, script, image) {
  let res
  try {
    const result = await database.run('INSERT INTO chatbot_bot (name, description, script, image) VALUES (?, ?, ?, ?)', [
      name,
      description,
      script,
      image
    ])
    res = result.lastID
  } catch (err) {
    console.error(err)
  }
  return res
}

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

module.exports.deleteBot = async function (id) {
  try {
    await database.run('DELETE FROM chatbot_bot WHERE id = ?', id)
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}



//chatbot_discussion

module.exports.getDiscussions = async function (user_id) {
  let result
  try {
    result = await database.all('SELECT DISTINCT(bot_id) FROM chatbot_discussion WHERE user_id = ?', user_id)
  } catch (err) {
    console.log(err)
  }
  return result
}

module.exports.getDiscussion = async function (user_id, bot_id) {
  let result
  try {
    result = await database.all('SELECT * FROM chatbot_discussion WHERE user_id = ? AND bot_id = ? ORDER BY timestamp', [user_id, bot_id])
  } catch (err) {
    console.log(err)
  }
  return result
}

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

module.exports.getDiscussionVariables = async function (user_id, bot_id) {
  let result
  try {
    result = await database.get('SELECT variables FROM chatbot_discussion_variables WHERE user_id = ? AND bot_id = ?', [user_id, bot_id])
    result = JSON.parse(result.variables)
  } catch (err) {
    console.log(err)
  }
  return result
}

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



//chatbot_riverscript

module.exports.getRiveScripts = async function () {
  let result
  try {
    result = await database.all('SELECT * FROM chatbot_rivescript')
  } catch (err) {
    console.log(err)
  }
  return result
}

module.exports.getRiveScript = async function (id) {
  let result
  try {
    result = await database.get('SELECT * FROM chatbot_rivescript WHERE id = ?', id)
  } catch (err) {
    console.log(err)
  }
  return result
}

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

module.exports.deleteRiveScript = async function (id) {
  try {
    await database.run('DELETE FROM chatbot_rivescript WHERE id = ?', id)
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

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