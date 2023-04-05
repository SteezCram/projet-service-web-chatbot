const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports.hashPassword = async function (plainPassword) {
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds)
  return hashedPassword
}

module.exports.testPassword = async function (plainPassword, hashedPassword) {
  const res = await bcrypt.compare(plainPassword, hashedPassword)
  return res
}
