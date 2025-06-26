import express from "express"
import dotenv from "dotenv"

import cors from "cors"

import notesRoutes from "./routes/notesRoute.js"
import authRoutes from './routes/authRoutes.js'

import { connectDB } from "./config/db.js"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173"
}))

app.use('/auth', authRoutes)
app.use("/api/notes", notesRoutes)

connectDB().then(
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
)