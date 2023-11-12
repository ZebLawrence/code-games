import { LitElement, css, html } from 'lit'
import * as d3 from 'd3'
import numeral from 'numeral'


const elementName = 'vote-map'

export const voteMap = {
  tag: elementName,
  title: 'Vote Map',
  path: '#/your-vote-worth',
}

export class VoteMap extends LitElement {
  static properties = {
    title: { type: String },
    statesData: { state: true },
    votesMax: { state: true },
    votesMin: { state: true },
    popSorted: { state: true },
  }

  static styles = [
    css`
      .main{
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 0;
      }
      #map{
        width: 100%;
        height: 100%;
        z-index: 0;
      }
      svg {
        z-index: 0;
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
        translate: -50% -200%;
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
    `
  ]

  constructor() {
    super()
    this.title = voteMap.title
    this.statesData = []
    this.popSorted = 0
    this.votesMin = 0
    this.votesMax = Infinity
  }

  initChart() {
    const mapElement = this.shadowRoot.getElementById('map')
    mapElement.innerHTML = ''
    const { width, height } = mapElement.getBoundingClientRect()
    const projection = d3.geoAlbersUsa()
      .translate([width/2, height/2])
      .scale([width - 300])
    const path = d3.geoPath().projection(projection)

    const svg = d3.select(mapElement)
      .append("svg")
      .attr("width", '100%')
      .attr("height", '100%')
            
    const tooltip = d3.select(mapElement)
      .append("div")   
      .attr("class", "tooltip")               
      .style("opacity", 0)

    Promise.all([
      d3.csv('./statesvotes.csv'),
      d3.csv('./statesPopulation.csv'),
      d3.json('./us-states.json')
    ]).then(([csvData, csvPopulation, statesJson]) => {

        const votes = []
        const states = []
        for (let i = 0; i < csvData.length; i++) {
          const dataState = csvData[i].state
          const populationObj = csvPopulation.find(x => x.state === dataState)
          const { population } = populationObj
          const dataValue = Number(csvData[i].votes)
          const val = (350 / dataValue)
          const color = `rgb(${0},${val},${0})`
          states.push([dataState, dataValue, color, Number(population)])
          if (votes.indexOf(dataValue) === -1) {
            votes.push(dataValue)
          }

          for (let j = 0; j < statesJson.features.length; j++)  {
            const jsonState = statesJson.features[j].properties.name
            if (dataState === jsonState) {
              statesJson.features[j].properties.votes = dataValue 
              statesJson.features[j].properties.population = Number(population)
              break
            }
          }
        }
        const sorted = votes.sort((a, b) => a - b)
        const sortedStates = states.sort((a, b) => b[1] - a[1])
        const colors = sorted.map(v => {
          const val = (350 / v)
          return `rgb(${0},${val},${0})`
        })
        const popSorted = states.sort((a, b) => a[3] - b[3])
        const lowestPop = popSorted[0][3]

        this.votesMin = sorted[0]
        this.votesMax = sorted[sorted.length - 1]
        this.statesData = sortedStates

        const color = d3.scaleLinear().range(colors)
        color.domain(sorted)

        svg.selectAll("path")
          .data(statesJson.features)
          .enter()
          .append("path")
          .attr("d", path)
          .style("fill", function(d) {
            const value = d.properties.votes

            if (value) {
              return color(value)
            } else {
              return "rgb(213,222,217)"
            }
          })
          .on("mouseover", function(d, { properties: { name, votes, population } }) {
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
          .on("mouseout", function(d) {       
            tooltip.transition()        
              .duration(500)
              .style("opacity", 0)
          })
      })    
  }

  firstUpdated() {
    this.initChart()
  }
  
  connectedCallback() {
    super.connectedCallback()
    window.addEventListener('resize', () => this.initChart())
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('resize', () => this.initChart())
  }

  render() {
    const {
      statesData,
      votesMin,
      votesMax
    } = this
    return html`
      <div class="main">
        <div id="map"></div>
        <ul class="legend">
          ${statesData.map(([state, votes, color], index) => {
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
