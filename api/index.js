const PORT_SERVER = 3001

const userAccount = require('./models/userAccount')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
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

app.post('/users', (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password

    /*
			TODO: User database interface to authenticate login requests
		*/
  } catch (err) {
    console.log(`Error ${err} thrown`)
    res.status(404).send('NOT FOUND')
  }
})

app.post('/users/login', (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password

    /*
			TODO: User database interface to authenticate login requests
		*/
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
