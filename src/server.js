const express = require('express')
const server = express()

const db = require('./config/db')

server.use(express.static("public"))

// Habilitar o uso do post com o express
server.use(express.urlencoded({ extended: true }))

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
server.post("/save-point", (req, res) => {
  const query = (`
  INSERT NTO places (
    name,
    image_url,
    adress,
    adress2,
    state,
    city,
    items
  ) VALUES ($1, $2, $3, $4, $5, $6, $7);
  `)

  const values = [
    req.body.name,
    req.body.image_url,
    req.body.adress,
    req.body.adress2,
    req.body.state,
    req.body.city,
    req.body.items
  ]

  function afterInsertData(err) {
    if(err) {
      console.error(err)
      return res.render('create-point.njk', { saved: false })
    }

    console.log('Cadastro realizado com sucesso!')

    return res.render('create-point.njk', { saved: true })
  }

  db.query(query, values, afterInsertData)
})

server.get("/search", (req, res) => {
  const search = req.query.search

  if(search == "") {
    return res.render('search-results.njk', { total: 0 })
  }

  db.query(`SELECT * FROM places WHERE city ILIKE '%${search}%'`, function(err, result) {
    if(err) {
      return console.error(err)
    }

    const total = result.rows.length

    return res.render('search-results.njk', { places: result.rows, total })
  })
})

server.listen(3000)