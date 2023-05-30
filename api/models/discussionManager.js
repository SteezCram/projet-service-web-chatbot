/**
 * @namespace api\models\discussionManager
*/

const databaseManager = require('./databaseManager')

/**
 * Get the Discussions of User with "user_id"
 * @param {Number} user_id 
 * @returns Array of Discussions
 * @memberof api\models\discussionManager
*/
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

/**
 * Get the Discussion between "user_id" and "bot_id"
 * @param {Number} user_id 
 * @param {Number} bot_id 
 * @returns Discussion
 * @memberof api\models\discussionManager
*/
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

/**
 * Delete the Discussion between "user_id" and "bot_id"
 * @param {*} user_id 
 * @param {*} bot_id 
 * @returns Deletion success as a Boolean
 * @memberof api\models\discussionManager
*/
module.exports.deleteDiscussion = async function (user_id, bot_id) {
    try {
        await databaseManager.deleteDiscussion(user_id, bot_id)
        return true;
    } catch (err) {
        console.error(err)
        return false;
    }
}

/**
 * Add a new message to the Discussion between "user_id" and "bot_id"
 * @param {Number} user_id 
 * @param {Number} bot_id 
 * @param {Message} messageData 
 * @returns Update success
 * @memberof api\models\discussionManager
*/
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
