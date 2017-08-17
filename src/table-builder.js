let d3 = require('d3')

export class TableBuilder {
  constructor(url) {
    this.load(url)
    this.table = d3.select('body').append('table').attr('class', 'table')
    this.tableHeader = this.table.append('thead')
    this.tableBody = this.table.append('tbody')
  }

  load(url) {
    d3.csv(url, data => {
      //The retrieved data is attached to the class object
      this.data = data
      // window.data = data --> add it to the window so you can directly manipulate it in the console of the browser
      this.redraw()
    })
  }

  redraw() {
    let nested = d3.nest().key(d => d['Raw_Guest_List']).entries(this.data)

    window.data = nested

    this.data = nested.map(d => {
      let earliest = d.values
        .sort((a, b) => d3.ascending(a.YEAR, b.YEAR))
        .shift()
      return {
        name: d.key,
        category: earliest.Group,
        'earliest appearance': earliest.YEAR
      }
    })

    this.rows = this.tableBody.selectAll('tr').data(this.data)

    this.rows.enter().append('tr')
    this.rows.exit().remove()

    this.rows
      .selectAll('td')
      .data(d => d3.values(d))
      .enter()
      .append('td')
      .text(d => d)

    //In order for you to count the size of the elements given back by
    //d3.selectAll it is better to use .size() instead of .length because
    //the function call return an array of arrays and the length is 1, because
    //all the tr's returned are in the first array, nl. array[0],
    //writing d3.selectAll('tr')[0].length = d3.selectAll('tr').size()
    console.log(d3.selectAll('tr').size())
  }
}
