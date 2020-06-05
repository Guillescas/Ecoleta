const express = require('express')
const server = express()

server.use(express.static("public"))

const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
  express: server,
  noCache: true
})

server.get("/", (req, res) => {
  return res.render('index.njk', { title: 'Opa'})
})

server.get("/create-point", (req, res) => {
  return res.render('create-point.njk')
})

server.get("/search", (req, res) => {
  return res.render('search-results.njk')
})

server.listen(3000)