// Why does this file exist?
// The production server is mounted inside Nuxt's default express server,
// loading all of that inside a test meant a nightmare of injecting
// dependencies and mocking literally the entire univserse. Instead, we
// have this very simple express server that just mounts our routes and
// allow us to test _just_ their implementation
const express = require('express')
const apiRouter = require('../../server/api')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/', apiRouter)

module.exports = app
