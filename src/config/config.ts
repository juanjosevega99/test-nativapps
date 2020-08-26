require('dotenv').config()

const config = {
  db: process.env.DATABASE_MONGO
}

module.exports = config