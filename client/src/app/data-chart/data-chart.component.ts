import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core'
import { DataType } from '@app/models/data.type'
import * as d3 from 'd3'
// import { DataStatusService } from '@app/data-status.service'
import { take, map } from 'rxjs/operators'
import { SocketioService } from '@app/socketio.service'
import { CountryType } from '@app/models/country.type'

@Component({
    selector: 'app-data-chart',
    templateUrl: './data-chart.component.html',
    styleUrls: ['./data-chart.component.scss'],
})
export class DataChartComponent implements OnInit {
    constructor(private socketioService: SocketioService) {}

    countries: CountryType[] = []

    ngOnInit(): void {
        this.connectSocketio()
    }

    private connectSocketio = (): void => {
        // this.socketioService.listen().subscribe((data) => {
        //     this.data = data
        // })
        this.socketioService
            .listen()
            .subscribe((country) => {
                this.countries.push(country)
            })
    }

    @ViewChild('chart') chartElement: ElementRef

    parseDate = d3.timeParse('%d-%m-%Y')

    @Input() dataStatus: Array<DataType>

    #svgElement: HTMLElement
    #chartProps: any

    ngOnChanges() {}

    formatDate = () => {
        this.dataStatus.forEach((ms) => {
            if (typeof ms.date === 'string') {
                ms.date = this.parseDate(ms.date)
            }
        })
    }
}
