const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.static('mp3'))

require('./routes')(app)

app.set('port', 3000)

app.listen(app.get('port'))

module.exports = app
