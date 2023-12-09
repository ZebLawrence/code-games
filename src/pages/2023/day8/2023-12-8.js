import { css, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import numeral from 'numeral'
import { lowestCommonMultipleList } from '../../../utils/mathHelp'
import { PuzzleToggleWithLit } from '../../../mixins/puzzleToggle'
import {
  examplePuzzle,
  examplePuzzle2,
  partTwoExamplePuzzle,
  fullPuzzle,
} from './2023-12-8-puzzle'

/* playground-hide */
const elementName = 'day-eight-two-three'
export const dayEight2023 = {
  tag: elementName,
  title: '2023 Day Eight',
  path: '#/2023/day-eight/',
  codeFileName: '2023-12-8.js',
  adventUrl: 'https://adventofcode.com/2023/day/8',
}
/* playground-hide-end */

class ghostNodeTraveler {
  constructor(startNode, nodes) {
    this.startNode = startNode
    this.nodes = nodes
    this.steps = 0
    this.currentNode = startNode
    this.visitedNodes = [startNode]
  }

  travelOneStep(direction) {
    if (this.isAtFinish) {
      return
    }
    const nextNode = this.nodes[this.currentNode][direction]
    this.visitedNodes.push(nextNode)
    this.steps++
    if (nextNode[2] === 'Z') {
      this.isAtFinish = true
      this.currentNode = nextNode
    } else {
      this.currentNode = nextNode
    } 
  }
}

export class DayEight extends PuzzleToggleWithLit {
  static properties = {
    ...super.properties,
    startPuzzle1: { type: Boolean, state: true },
    startPuzzle2: { type: Boolean, state: true },
  }
/* playground-hide */
  static styles = [
    ...super.styles,
    css`
      .table-container{
        padding: 0.5em;
        border-radius: 0.5em;
      }
      table td, table th{
        padding: 0.3em;
        font-size: 0.8em;
      }
    `
  ]
/* playground-hide-end */

  constructor() {
    super({
      examplePuzzle,
      examplePuzzle2,
      partTwoExamplePuzzle,
      fullPuzzle
    })
    this.selectedPuzzle = 'fullPuzzle'
    this.startPuzzle = false
  }

  parseInput(input) {
    const [directionsRaw, nodesRaw] = input.split('\n\n')
    const directions = directionsRaw.split('')
    const nodes = {}
    const ghostNodesStarts = []

    nodesRaw.split('\n').forEach(line => {
      const [node, sidesRaw] = line.split(' = (')
      const sides = sidesRaw.split(', ').map(item => item.trim().replace(')', ''))
      nodes[node] = sides

      if (node[2] === 'A') {
        ghostNodesStarts.push(node)
      }
    })

    const result = {
      directions,
      directionIndexes: directions.map(dir => dir === 'R' ? 1 : 0),
      nodes,
      ghostNodes: ghostNodesStarts.map(node => new ghostNodeTraveler(node, nodes))
    }
    
    return result
  }

  render() {
    const {
      startTime,
      startPuzzle1,
      startPuzzle2
    } = this

    let isAtFinish = false
    let stepsPartOne = 0
    let currentNode = 'AAA'
    let allNodesAtFinish = false
    let stepsPartTwo = 0
    const visitedNodesPartOne = [currentNode]
    const { nodes, directions, directionIndexes } = this.puzzle

    // part one loop
    while (!isAtFinish && startPuzzle1) {
      if (currentNode === 'ZZZ') {
        isAtFinish = true
        console.log('Found the finish!')
        break
      } else{
        currentNode = nodes[currentNode] && nodes[currentNode][directionIndexes[stepsPartOne % directionIndexes.length]]
        visitedNodesPartOne.push(currentNode)
        stepsPartOne++
      }
    }

    // part two loop
    let safety = 0
    while (!allNodesAtFinish && startPuzzle2 && safety < 10000000000) {
      let finished = this.puzzle.ghostNodes.filter(ghostNode => ghostNode.isAtFinish)
      
      if (finished.length === this.puzzle.ghostNodes.length) {
        allNodesAtFinish = true
        console.log('All nodes are at the finish!')
        break
      } else {
        // move all nodes one step
        this.puzzle.ghostNodes.forEach(ghostNode => {
          ghostNode.travelOneStep(directionIndexes[stepsPartTwo % directionIndexes.length])
        })

        stepsPartTwo++
        safety++
      }
    }

    const renderTable = (puzzleNodes, visited, caption) => {
      return html`
        <div class="table-container blur">
          <table>
            <caption>${caption}</caption>
            <thead>
              <tr>
                <th>Node</th>
                <th>Left</th>
                <th>Right</th>
              </tr>
            </thead>
            <tbody>
              ${visited.map((node, index) => {
                const red = ((100 / visited.length) * (index - visited.length) * -1)
                const green = ((200 / visited.length) * (index + 1))
                const blue = ((100 / visited.length) * (index - visited.length) * -1)
                const color = `background-color: rgba(${red}, ${green}, ${blue})`
                const [left, right] = puzzleNodes[node] || []
                const nodeVisited = visited.indexOf(node)
                const leftVisited = visited.indexOf(left)
                const rightVisited = visited.indexOf(right)
                const nodeCell = nodeVisited > -1
                  ? html`<td style=${color}>(${nodeVisited + 1}) ${node}</td>`
                  : html`<td class="blue">${node}</td>`
                const leftCell = leftVisited > -1
                  ? html`<td style=${color}>(${leftVisited + 1}) ${left}</td>`
                  : html`<td>${left}</td>`
                const rightCell = rightVisited > -1
                  ? html`<td style=${color}>(${rightVisited + 1}) ${right}</td>`
                  : html`<td>${right}</td>`
                return html`
                  <tr>
                    ${nodeCell}
                    ${leftCell}
                    ${rightCell}
                  </tr>
                `
              })}
            </tbody>
          </table>
        </div>
      `
    }

    const partTwoTotal = lowestCommonMultipleList(this.puzzle?.ghostNodes?.map(ghostNode => ghostNode.steps) || [])

    return html`
      <my-card>
        <div class="d-flex-grid justify-between">
          ${this.puzzleSwitcher(dayEight2023.adventUrl)}
          <button class="btn btn-primary" @click=${() => {this.startPuzzle1 = !startPuzzle1}}>
            ${startPuzzle1 ? 'Stop Puzzle 1' : 'Start Puzzle 1'}
          </button>
          <button class="btn btn-primary" @click=${() => this.startPuzzle2 = !startPuzzle2}>
            ${startPuzzle2 ? 'Stop Puzzle 2' : 'Start Puzzle 2'}
          </button>
        </div>
      </my-card>
      <my-card>
        Part One total: ${numeral(stepsPartOne).format('0,0')}
      </my-card>
      <my-card>
        Part Two total: ${numeral(partTwoTotal).format('0,0')}
      </my-card>
      <div class="d-flex flex-wrap space-between"> 
        ${this.puzzle?.nodes
          && renderTable(
            this.puzzle?.nodes || [],
            visitedNodesPartOne,
            html`
              <div>Part One</div>
              <div>Total steps: ${numeral(stepsPartOne).format('0,0')}</div>
            `
          )}
        ${this.puzzle?.ghostNodes?.map((ghostNode, index) => {
          return renderTable(
            ghostNode.nodes,
            ghostNode.visitedNodes,
            html`
              <div>Part two ghost ${index + 1}</div>
              <div>Total steps: ${numeral(ghostNode.steps).format('0,0')}</div>
            `
          )
        })}
      </div>
      ${this.timeTaken(startTime)}
    `
  }

}

!window.customElements.get(elementName) && window.customElements.define(elementName, DayEight)
