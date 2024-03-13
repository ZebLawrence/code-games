
import { LitElement, css, html } from 'lit'
import * as d3 from 'd3'
import '@spectrum-web-components/button/sp-button.js'

export class PortfolioChart extends LitElement {
  static properties = {
    data: { type: Array, state: true }
  }

  constructor() {
    super()
    this.defaultData = [{ date: Date.now(), total: 0 }]
    this.data = this.defaultData
    setInterval(() => {
      const portfolioData = JSON.parse(localStorage.getItem('portfolioData'))
      this.data = portfolioData
    }, 1000)
  }

  render() {
    return html`
      <div>
        <sp-button variant="cta" @click=${() => localStorage.setItem('portfolioData', JSON.stringify(this.defaultData))}>Clear</sp-button>
        <div id="portfolio-chart"></div>
      </div>
    `
  }

  renderChart(w) {
    const { data } = this
    data.shift()
    //console.log('renderChart', data)
    const margin = {top: 10, right: 30, bottom: 30, left: 60}
    const width = w - margin.left - margin.right
    const height = 400 - margin.top - margin.bottom
    const container = this.shadowRoot.getElementById('portfolio-chart')
    container.innerHTML = '';
    // append the svg object to the body of the page
    const svg = d3.select(this.shadowRoot.getElementById('portfolio-chart'))
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    const x = d3.scaleLinear()
      .domain(d3.extent(data, function(d) {
        if (d.date !== 0) {
          return d.date;
        }
      }))
      .range([ 0, width ])
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))

    // Add Y axis
    const y = d3.scaleLinear()
      .domain(d3.extent(data, function(d) {
        if (d.total !== 0) {
          return d.total;
        }
      }))
      .range([height, 0])
    svg.append("g")
      .call(d3.axisLeft(y))
    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d",
        d3.line()
          .x(function(d) {
            const xResult = x(d.date)
            return xResult
          })
        .y(function(d) {
          const yResult = y(d.total)
          // console.log('yResult', yResult)
          return yResult
        })
      )
  }

  updated(updated) {
    const { width } = this.getBoundingClientRect()
    super.updated(updated)
    this.renderChart(width)
  }
}

!window.customElements.get('portfolio-chart') && window.customElements.define('portfolio-chart', PortfolioChart)
