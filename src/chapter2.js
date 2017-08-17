import { TableBuilder } from './table-builder'
import { BasicChart } from './basic-chart'

let d3 = require('d3')

export default function() {
  let chart = new BasicChart()
  let svg = chart.chart
  svg
    .append('text')
    .text('A Picture!')
    .attr({ x: 10, y: 150, 'text-anchor': 'start' })

  svg.append('line').attr({
    x1: 10,
    y1: 10,
    x2: 100,
    y2: 100,
    stroke: 'blue',
    'stroke-width': 3
  })
}

export function renderDailyShowGuestTable() {
  let url =
    'https://cdn.rawgit.com/fivethirtyeight/data/master/daily-show-guests/daily_show_guests.csv'
  let table = new TableBuilder(url)
}
