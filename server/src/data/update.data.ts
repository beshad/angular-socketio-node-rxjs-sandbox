import moment from 'moment'
import { data } from '@data/data'

let counter: number = 0


export const updateData = (): void => {
    const diff = Math.floor(Math.random() * 1000) / 100
    const lastDay = moment(data[0].date, 'DD-MM-YYYY').add(1, 'days')
    let open
    let close

    if (counter % 2 === 0) {
        open = data[0].open + diff
        close = data[0].close + diff
    } else {
        open = Math.abs(data[0].open - diff)
        close = Math.abs(data[0].close - diff)
    }

    data.unshift({
        date: lastDay.format('DD-MM-YYYY'),
        open,
        close,
    })
    counter++
}
