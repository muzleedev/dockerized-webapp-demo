import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import Redis from 'ioredis'

const PORT = Number(process.env.PORT) || 5000
const redisPort = Number(process.env.REDIS_PORT) || 6379
const redisUrl = process.env.REDIS_URL

const app = express()

const redis = new Redis({
    host: redisUrl,
    port: redisPort,
})

app.use(cors())

app.get('/api/test', async (req, res) => {
    try {
        console.log('GET endpoint hit')

        await redis.setnx('webapp-key', 'hello from redis')
        const value = await redis.get('webapp-key')

        res.json({ message: 'Hello from backend', redisValue: value, envValue: process.env.PORT })
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Something went wrong' })
    }
})

app.get('/', (req, res) => {
    console.log('Not found')
    res.status(404).json({ message: 'Not found from backend' })
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
