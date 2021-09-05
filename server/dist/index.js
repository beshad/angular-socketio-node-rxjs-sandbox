"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const data_1 = require("@data/data");
// import * as socketio from 'socket.io'
// import * as http from 'http'
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const port = parseInt(process.env.PORT || '3000', 10);
const httpServer = (0, http_1.createServer)();
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
    },
});
httpServer.listen(port);
io.on('connection', (socket) => {
    let counter = 0;
    console.log('successful socketio connection!');
    socket.on('data', () => {
        console.log('socket received!');
    });
    setInterval(() => {
        console.log(data_1.countries[counter]);
        socket.emit('data', data_1.countries[counter]);
        counter++;
    }, 3000);
});
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
//# sourceMappingURL=index.js.map