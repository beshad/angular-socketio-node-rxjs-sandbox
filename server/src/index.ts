import 'module-alias/register'
import express, { Express, Application, Request, Response } from 'express'
import { countries } from '@data/data'
// import * as socketio from 'socket.io'
// import * as http from 'http'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import cors from 'cors'
import { updateData } from '@data/update.data'

const port: number = parseInt(process.env.PORT || '3000', 10)

const httpServer = createServer()
const io = new Server(httpServer, {
    cors: {
        origin: '*',
    },
})

httpServer.listen(port)

io.on('connection', (socket: Socket) => {
    let counter: number = 0
    console.log('successful socketio connection!')

    socket.on('data', () => {
        console.log('socket received!')
    })

    setInterval(() => {
        console.log(countries[counter])
        socket.emit('data', countries[counter])
        counter++
    }, 3000)
})

// setInterval(() => {
//     updateData()
//     io.sockets.emit('data', data)
// }, 3000)

// const app: Application = express()
// const app: Express = express()
// const httpServer: http.Server = http.createServer(app)
// const io: socketio.Server = new socketio.Server({
//     cors: { origin: '*' },
// })
// io.attach(httpServer)

// app.use(cors())

// app.use((_: Request, res: Response, next) => {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//     next()
// })

// app.get('/', async (_: Request, res: Response): Promise<Response> => {
//     console.log('hello world')
//     return res.status(200).send(data)
// })

// try {
//     app.listen(port, (): void => {
//         console.log(`Connected successfully on port ${port}`)
//     })
// } catch (error) {
//     console.error(`Error occured: ${error.message}`)
// }
