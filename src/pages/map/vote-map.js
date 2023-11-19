import { LitElement, css, html } from 'lit'
import * as d3 from 'd3'
import numeral from 'numeral'
/* playground-hide */
const elementName = 'vote-map'
export const voteMap = {
  tag: elementName,
  title: 'Vote Map',
  path: '#/your-vote-worth',
  codeFileName: 'vote-map.js',
}
/* playground-hide-end */
export class VoteMap extends LitElement {
  static properties = {
    statesData: { state: true },
    lowestPop: { state: true },
    chartData: { state: true },
  }

  static styles = [
    css`
      .main{
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 0;
        overflow: hidden;
      }
      #map{
        width: 100%;
        height: 100%;
        z-index: 0;
        transition: all 0.25s;
      }
      svg {
        z-index: 0;
        filter: drop-shadow(20px 20px 10px black);
      }
      path {
        z-index: 1;
        stroke: #00cc00;
        stroke-width: 0.25px;
      }
      path:hover {
        fill-opacity: .7;
        stroke: #00cc00 !important;
        stroke-width: 3px !important;
        z-index: 5 !important;
      }
      div.tooltip {
        position: absolute;
        text-align: center;
        padding: 10px;
        font: 12px sans-serif;
        background: white;
        border: 0px;
        border-radius: 8px;
        pointer-events: none;
        color: #000;
        transition: all 0.25s;
        translate: -75% -150%;
        box-shadow: rgb(0, 0, 0) 0px 5px 5px 0px;
      }
      .legend {
        background: #FFF;
        padding: 1em;
        position:absolute;
        right: 2em;
        top: 0em;
        color: #000;
        margin-bottom: 5em;

      }
      .legend li{
        list-style-type: none;
        line-height: 0.75em;
        font-size: 0.75em;
        padding: 0.1em;
      }
      .legend li span{
        display: inline-block;
        width: 0.75em;
        height: 0.75em;
        border: 0.25px solid #00cc00;
      }
      .amount{
        font-weight: bold;
      }
      @media screen and (max-width: 768px){
        .legend{
          display: none;
        }
      }
    `
  ]

  constructor() {
    super()
    this.chartData = {}
    this.statesData = []
    this.lowestPop = Infinity
  }

  async getChartData() {
    const [csvVotes, csvPopulation, statesJson] = await Promise.all([
      d3.csv('./statesvotes.csv'),
      d3.csv('./statesPopulation.csv'),
      d3.json('./us-states.json'),
    ])
    const states = []
    let lowestPop = Infinity
    csvVotes.forEach(({ state, votes }) => {
      const populationObj = csvPopulation.find(x => x.state === state)
      const population = Number(populationObj.population)
      const electoralVotes = Number(votes)

      if (population < lowestPop) {
        lowestPop = population
      }

      for (let j = 0; j < statesJson.features.length; j++) {
        const { name } = statesJson.features[j].properties
        if (state  === name) {
          const val = (350 / electoralVotes)
          const color = `rgb(${0},${val},${0})`
          statesJson.features[j].properties.votes = electoralVotes
          statesJson.features[j].properties.color = color
          statesJson.features[j].properties.population = population
          states.push([state , electoralVotes, color, population])
          break
        }
      }
    })

    this.statesData = states.sort((a, b) => a[3] - b[3])
    this.lowestPop = lowestPop
    this.chartData = statesJson
  }

  initChart() {
    const {
      chartData,
      lowestPop
    } = this
    const mapElement = this.shadowRoot.getElementById('map')
    mapElement.innerHTML = ''

    const { width, height } = mapElement.getBoundingClientRect()

    const scale = width > 738
      ? width - 500
      : width

    const projection = d3.geoAlbersUsa()
      .translate([width / 2, height / 2])
      .scale([scale])
    const path = d3.geoPath().projection(projection)
    const svg = d3.select(mapElement)
      .append("svg")
      .attr("width", '100%')
      .attr("height", '100%')
    const tooltip = d3.select(mapElement)
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)

    svg.selectAll("path")
      .data(chartData.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("fill", function (d) {
        return d.properties.color
      })
      .on("mouseover", function (d, { properties: { name, votes, population } }) {
        tooltip.transition()
          .duration(200)
          .style("opacity", .9)
        tooltip.text(`${name} electoral votes: ${votes}`)
          .style("left", (d.pageX) + "px")
          .style("top", (d.pageY - 28) + "px")
        tooltip.append('div')
          .attr('class', 'population')
          .text(`People per electoral vote: `)
          .append('span')
          .attr('class', 'amount')
          .text(numeral(population / votes).format('0,0.0'))
        tooltip.append('div')
          .attr('class', 'percent')
          .text(`Percent of a person your vote is worth: `)
          .append('span')
          .attr('class', 'amount')
          .text(numeral((lowestPop / votes) / (population / votes)).format('0.[00]%'))
        tooltip.append('div')
          .attr('class', 'worth')
          .text(`Total people per one person:`)
          .append('span')
          .attr('class', 'amount')
          .text(numeral((population / votes) / (lowestPop / votes)).format('0.[0000]'))
      })
      .on("mouseout", function (d) {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0)
      })
  }

  firstUpdated() {
    this.getChartData().then(() => this.initChart())
  }

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener('resize', () => this.initChart())
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('resize', () => this.initChart())
  }

  handleMouseOver(event) {
    const { currentTarget, clientX, clientY } = event

    const centerX = currentTarget.offsetLeft + currentTarget.offsetWidth / 2
    const centerY = currentTarget.offsetTop + currentTarget.offsetHeight / 2

    const tiltX = (centerX - clientX) / 30
    const tiltY = (centerY - clientY) / 30

    currentTarget.style.transform = `perspective(1000px) rotateX(${(tiltY * -1)}deg) rotateY(${(tiltX)}deg)`
  }

  render() {
    const {
      statesData
    } = this

    return html`
      <div class="main">
        <div @mouseover=${this.handleMouseOver} id="map"></div>
        <ul class="legend">
          ${statesData.map(([state, votes, color]) => {
            return html`
              <li>
                <span style="background-color:${color}"></span>
                ${state}: ${votes}
              </li>
            `
          })}
        </ul>
      </div>
    `
  }
}

!window.customElements.get(elementName) && window.customElements.define(elementName, VoteMap)
