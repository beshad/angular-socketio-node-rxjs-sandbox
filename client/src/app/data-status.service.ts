import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { DataType } from '@app/models/data.type'
import { Observable } from 'rxjs/internal/Observable'

import { Subject, from } from 'rxjs'
import socketio, { Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io-client/build/typed-events'

@Injectable({
    providedIn: 'root',
})
export class DataStatusService {
    readonly #baseUrl: string = 'ws://192.168.178.99:3000/'
    private socket: Socket<DefaultEventsMap, DefaultEventsMap>

    constructor(private httpClient: HttpClient) {}

    public getInitialDataStatus = (): Observable<DataType[]> => {
        return this.httpClient.get<DataType[]>(this.#baseUrl)
    }

    getUpdates = () => {
        this.socket = socketio(this.#baseUrl, {
            path: '/socket.io',
            reconnectionDelay: 1000,
            reconnection: true,
            transports: ['polling'],
            agent: false,
            upgrade: false,
            rejectUnauthorized: false,
        })

        let dataSubject$ = new Subject<DataType>()

        this.socket.on('data', (data: DataType) => {
            console.log(' data received from backend.')
            dataSubject$.next(data)
        })

        return from(dataSubject$)
    }
}
