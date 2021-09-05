import { Injectable } from '@angular/core'
import { DataType } from '@app/models/data.type'
import { CountryType } from '@app/models/country.type'
import { Observable } from 'rxjs/internal/Observable'

import { Subject, from, BehaviorSubject } from 'rxjs'
import io, { Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io-client/build/typed-events'

@Injectable({
    providedIn: 'root',
})
export class SocketioService {
    readonly #url: string = 'ws://192.168.178.99:3000'
    private socket: Socket<DefaultEventsMap, DefaultEventsMap>
    public subject$: Subject<CountryType> = new Subject()

    constructor() {
        this.socket = io(this.#url, {
            path: '/socket.io/',
            transports: ['websocket'],
        })

        this.socket.on('connect', () => {
            console.log('socketio connected!')
            this.socket.emit('data', { message: 'Hello Server!' })
        })
    }

    public readonly listen = (): Observable<CountryType> => {
        this.socket.on('data', (country: CountryType) => {
            this.subject$.next(country)
        })

        return this.subject$.asObservable()
    }

    public emit = (data: DataType) => {
        this.socket.emit('data', 'hello from client')
        this.socket.on('data', () => {
            console.log(data)
        })
    }
}
