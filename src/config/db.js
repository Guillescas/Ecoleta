const { Pool } = require("pg")

module.exports = new Pool({
  user: "GuiIllescas",
  password: "",
  host: "localhost",
  port: 5432,
  database: "ecoleta"
})