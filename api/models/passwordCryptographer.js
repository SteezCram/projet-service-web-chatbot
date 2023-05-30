/**
 * @namespace api\models\passwordCryptographer
*/

const bcrypt = require('bcrypt')
const saltRounds = 10

/**
 * Hash "plainPassword" using BCrypt algorithm
 * @param {String} plainPassword 
 * @returns Hashed password
 * @memberof api\models\passwordCryptographer
*/
module.exports.hashPassword = async function (plainPassword) {
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds)
  return hashedPassword
}

/**
 * Check "plainPassword" against "hashedPassword" using BCrypt algorithm
 * @param {String} plainPassword 
 * @param {String} hashedPassword 
 * @returns Match between the provided password as a Boolean
 * @memberof api\models\passwordCryptographer
*/
module.exports.comparePlainHashed = async function (plainPassword, hashedPassword) {
  let match = false
  try {
    match = await bcrypt.compare(plainPassword, hashedPassword)
  } catch ( err ) {
    console.error(err)
    return false
  }
  return match
}