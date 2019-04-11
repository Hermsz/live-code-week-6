require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({ encoded: false }))
app.use(cors())

app.use('/', routes)

const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/classic_fox_live_code__1", { useNewUrlParser: true })

app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})