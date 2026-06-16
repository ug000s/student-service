import express from 'express'
import dotenv from 'dotenv'
// default import can use any name
import studentRouter from './routes/studentRoutes.js'
import {MongoClient} from 'mongodb'
import {init} from './repository/studentRepository.js'

dotenv.config()
const port = process.env.PORT || 8080

const app = express()
const client = new MongoClient(process.env.MONGODB_URI)


// Middleware
app.use(express.json())
// Student routes
app.use(studentRouter)


// 404
app.use((req, res) => res.status(404).type('text/plain', {charset: 'utf-8'}).send('Not Found'))

async function startServer() {
  try {
    await client.connect()
    const database = client.db(process.env.MONGODB_DB_NAME)
    init(database)
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
      console.log(`Press Ctrl+C to stop the server`)
    })
  } catch (error) {
    console.error('Failed to connect to MongoDB', error)
    // process.exit(1)
  }
}

startServer()