import express from 'express'
import dotenv from 'dotenv'
// default import can use any name
import studentRouter from './routes/studentRoutes.js'

dotenv.config()
const port = process.env.PORT || 8080

const app = express()


// Middleware
app.use(express.json())
// Student routes
app.use(studentRouter)


// 404
app.use((req, res) => res.status(404).type('text/plain', { charset: 'utf-8' }).send('Not Found'))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
  console.log(`Press Ctrl+C to stop the server`)
})