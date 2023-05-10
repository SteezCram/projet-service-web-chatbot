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
    const email = req.body.email
    const password = req.body.password
    const nickname = req.body.nickname
    const image = req.body.image
    let goodCreation = await userAccount.createAccount(email, password, nickname, image)
    if (goodCreation) {
      const user = await userAccount.getUser(email)
      res.status(201).send({user: {id:user.id, image:user.image}})
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
    const userInformation = await userAccount.loginAccount(email, password)
    let id, isAdmin, nickname, image
    if (userInformation) {
      isAdmin = userInformation.isAdmin
      nickname = userInformation.nickname
      image = userInformation.image
      id = userInformation.id
    }
    res.status(200).send({response: userInformation.id ? 0 : userInformation, user: {id:id, email:email, image:image, isAdmin:isAdmin, nickname:nickname}})
  } catch (err) {
    console.log(`Error ${err} thrown`)
    res.status(404).send('NOT FOUND')
  }
})

app.delete('/users/:id', async (req, res) => {
  const id = req.params.id
  if (!isInt(id)) {
    // not the expected parameter
    res.status(400).send('BAD REQUEST')
  } else {
    try {
      let goodDeletion = await userAccount.deleteAccount(id)
      if (goodDeletion) {
        res.sendStatus(200)
      } else {
        res.sendStatus(409)
      }
    } catch (err) {
      console.log(`Error ${err} thrown`)
      res.status(404).send('NOT FOUND')
    }
  }
})

app.patch('/users/:id', async (req, res) => {
  const id = req.params.id
  if (!isInt(id)) {
    // not the expected parameter
    res.status(400).send('BAD REQUEST')
  } else {
    try {
      const goodUpdate = await userAccount.updateAccount(id, req.body)
      if (!goodUpdate) {
        res.sendStatus(500)
        return;
      }
      res.sendStatus(200);
    } catch (err) {
      console.log(`Error ${err} thrown`)
      res.status(404).send('NOT FOUND')
    }
  }
})

app.get('/bots/:id', async (req, res) => {
  const id = req.params.id
  try {
    let bot = await botManager.getBot(id)
    //console.log(bot)
    if (bot) {
      res.status(200).send(bot)
    } else {
      res.sendStatus(409)
    }
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

app.post('/bots', async (req, res) => {
  try {
    const botData = {
      name: req.body.name,
      description: req.body.description,
      script: req.body.script,
      image: req.body.image
    }
    newBotId = await botManager.createBot(botData)
    if (!newBotId) {
      throw "Couldn't create new bot"
    }
    res.status(200).send({id:newBotId})
  } catch (err) {
    console.log(`Error ${err} thrown`)
    res.status(404).send('NOT FOUND')
  }
})

app.patch('/bots/:id', async (req, res) => {
  const id = req.params.id
  if (!isInt(id)) {
    // not the expected parameter
    res.status(400).send('BAD REQUEST')
  } else {
    try {
      const goodUpdate = await botManager.updateBot(id, req.body)
      if (!goodUpdate) {
        res.sendStatus(500)
      } else {
        res.sendStatus(200)
      }
    } catch (err) {
      console.log(`Error ${err} thrown`)
      res.status(404).send('NOT FOUND')
    }
  }
})

app.delete('/bots/:id', async (req, res) => {
  const id = req.params.id
  if (!isInt(id)) {
    // not the expected parameter
    res.status(400).send('BAD REQUEST')
  } else {
    try {
      let goodDeletion = await botManager.deleteBot(id)
      if (goodDeletion) {
        res.sendStatus(200)
      } else {
        res.sendStatus(409)
      }
    } catch (err) {
      console.log(`Error ${err} thrown`)
      res.status(404).send('NOT FOUND')
    }
  }
})

function isInt (value) {
  const x = parseFloat(value)
  return !isNaN(value) && (x | 0) === x
}

app.listen(PORT_SERVER, () => {
  console.log(`Web task app is listening on port ${PORT_SERVER} and is available on http://localhost:${PORT_SERVER}.`)
})
