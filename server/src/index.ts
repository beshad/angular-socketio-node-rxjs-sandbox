import 'module-alias/register'
import express from 'express'
import { data } from '@data/data'

const port: number = 3000
const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.get('/api', (req, res) => {
    res.send(data)
})

app.listen(port, (): void => {
    console.log(`Listening on *:${port}`)
})
