const PORT_SERVER = 3001

const userAccount = require('./models/userAccount')
const botManager = require('./models/botManager')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(require('cors')({
  origin: '*',
}))
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  try {
    res.status(200).json()
  } catch (err) {
    console.log(`Error ${err} thrown`)
    res.status(404).send('NOT FOUND')
  }
})

app.get('/users/:id', (req, res) => {
  const id = req.params.id
  if (!isInt(id)) {
    // not the expected parameter
    res.status(400).send('BAD REQUEST')
  } else {
    try {
      /*
			TODO: database interface
			*/
      let userInformation
      res.status(200).json(userInformation)
    } catch (err) {
      console.log(`Error ${err} thrown`)
      res.status(404).send('NOT FOUND')
    }
  }
})

app.post('/users', async (req, res) => {
  try {
    console.log(req.body)
    const email = req.body.email
    const password = req.body.password
    let goodCreation = await userAccount.createAccount(email, password)
    if (goodCreation) {
      res.sendStatus(201)
    } else {
      res.sendStatus(409)
    }
    
  } catch (err) {
    console.log(`Error ${err} thrown`)
    res.status(404).send('NOT FOUND')
  }
})

app.post('/users/login', async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password
    const goodLogin = await userAccount.loginAccount(email, password)
    let isAdmin = false
    if (goodLogin==0) {
      isAdmin = await userAccount.isAdmin(email)
    }
    res.status(200).send({response:goodLogin, isAdmin:isAdmin})
  } catch (err) {
    console.log(`Error ${err} thrown`)
    res.status(404).send('NOT FOUND')
  }
})

app.get('/bots', async (req, res) => {
  try {
    let bots = await botManager.getAll()
    if (bots) {
      res.status(200).send(bots)
    } else {
      res.sendStatus(409)
    }
  } catch (err) {
    console.log(`Error ${err} thrown`)
    res.status(404).send('NOT FOUND')
  }
})

function isInt (value) {
  const x = parseFloat(value)
  return !isNaN(value) && (x | 0) === x
}

app.listen(PORT_SERVER, () => {
  console.log(`Web task app is listening on port ${PORT_SERVER} and is available on http://localhost:${PORT_SERVER}.`)
})
