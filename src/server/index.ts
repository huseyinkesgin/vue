import express from 'express'
import cors from 'cors'
import cityRoutes from './routes/CityRoute'
import { errorHandler } from './middleware/errorHandler'
import { requestLogger } from './middleware/requestLogger'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(requestLogger)

// Routes
app.use('/api/cities', cityRoutes)

// Error handling
app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
