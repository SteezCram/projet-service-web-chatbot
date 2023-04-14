const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports.hashPassword = async function (plainPassword) {
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds)
  return hashedPassword
}

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