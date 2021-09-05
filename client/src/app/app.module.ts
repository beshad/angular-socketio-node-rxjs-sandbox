import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from '@app/app.component'
import { DataChartComponent } from '@app/data-chart/data-chart.component'
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io'
import { SocketioService } from '@app/socketio.service'

const config: SocketIoConfig = { url: 'http://192.168.178.99:3000', options: {} }

@NgModule({
    declarations: [AppComponent, DataChartComponent],
    imports: [BrowserModule, HttpClientModule, SocketIoModule.forRoot(config)],
    providers: [SocketioService],
    bootstrap: [AppComponent],
})
export class AppModule {}
