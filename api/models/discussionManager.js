const databaseManager = require('./databaseManager')

module.exports.getDiscussions = async function (user_id) {
    let dbRequest
    try {
        dbRequest = await databaseManager.getDiscussions(user_id)
        if (!dbRequest) {
            dbRequest = []
        }
    } catch (err) {
        console.error(err)
    }
    return dbRequest
}

module.exports.getDiscussion = async function (user_id, bot_id) {
    let dbRequest
    try {
        dbRequest = await databaseManager.getDiscussion(user_id, bot_id)
        if (!dbRequest) {
            dbRequest = []
        }
    } catch (err) {
        console.error(err)
    }
    return dbRequest
}

module.exports.deleteDiscussion = async function (user_id, bot_id) {
    try {
        await databaseManager.deleteDiscussion(user_id, bot_id)
        return true;
    } catch (err) {
        console.error(err)
        return false;
    }
}

module.exports.addMessage = async function (user_id, bot_id, messageData) {
    let dbRequest
    try {
        dbRequest = await databaseManager.addMessage(user_id, bot_id, messageData)
        if (!dbRequest) {
            dbRequest = []
        }
    } catch (err) {
        console.error(err)
    }
    return dbRequest
}
