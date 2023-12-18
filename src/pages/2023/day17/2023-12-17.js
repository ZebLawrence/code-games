import { css, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import numeral from 'numeral'
import { addNumbers } from '../../../utils/mathHelp'
import { memoize } from '../../../utils/funcHelpers'
import { PuzzleToggleWithLit } from '../../../mixins/puzzleToggle'
import {
  examplePuzzleSmall,
  examplePuzzle,
  fullPuzzle,
} from './2023-12-17-puzzle'
import { min } from 'lodash'

/* playground-hide */
const elementName = 'day-seventeen-two-three'
export const daySeventeen2023 = {
  tag: elementName,
  title: '2023 Day Seventeen',
  path: '#/2023/day-seventeen/',
  codeFileName: '2023-12-17.js',
  adventUrl: 'https://adventofcode.com/2023/day/17',
}
/* playground-hide-end */

export class DaySeventeen extends PuzzleToggleWithLit {
  static properties = {
    ...super.properties,
  }
/* playground-hide */
  static styles = [
    ...super.styles,
    css``
  ]
/* playground-hide-end */

  constructor() {
    super({
      examplePuzzleSmall,
      examplePuzzle,
      fullPuzzle,
    })
    this.selectedPuzzle = 'examplePuzzleSmall'
  }

  parseInput(input) {
    console.log('input', input)
    const cellTemps = {}
    const queue = []
    const table = input.split('\n').map((row, rowIndex) => {
      return row.split('').map((col, colIndex) => {
        const heat = Number(col.trim())
        // fill the queue with every cell in the table and it's coords and default
        cellTemps[`${rowIndex}-${colIndex}`] = Infinity
        queue.push([rowIndex, colIndex, heat, Infinity])
        return heat
      })
    })
    console.log('table', table)
    console.log('queue', queue)
    console.log('cellTemps', cellTemps)
    // start the temps array with every cell set to infinity
    const shortestPathPositions = []
    // try filling the queue with every cell in the table and it's coords
    const targetPosition = queue.length - 1
    let totalHeatLoss = 0
    let iterations = 0

    while (queue.length > 0 && iterations < 9) {
      let minHeatLoss = Infinity
      let minIndex = 0
      console.log('While loop', iterations)
      // go through the whole queue and find the cell with the lowest heat loss
      for (let queueIndex = 0; queueIndex < queue.length; queueIndex++) {
        const [row, col, heat, heatLoss] = queue[queueIndex]
        const cellTemp = cellTemps[`${row}-${col}`]
        if (cellTemp < minHeatLoss) {
          minHeatLoss = cellTemp
          minIndex = queueIndex
          console.log('New lowest heat loss', minHeatLoss, 'queue[queueIndex]', queue[queueIndex])
        }
        // look to see if the  matching index in the cell temps is less than the min heat loss
        console.log('queue[queueIndex]', queue[queueIndex])
      }

      // get all the neighbors of the lowest heat loss cell
      const [row, col, heat, heatLoss] = queue[minIndex]
      const neighbors = [
        [row - 1, col],
        [row + 1, col],
        [row, col - 1],
        [row, col + 1],
      ]

      // remove the one lowest
      console.log('minIndex', minIndex)
      queue.splice(minIndex, 1)

      // check if the end has been reached and break out of the loop
      if (minIndex === targetPosition) {
        console.log('the end has been reasched', minIndex, targetPosition)
        break
      }


      // look though all the neighbors of the lowest heat loss cell
      for (const neighbor of neighbors) {
        const [neighborRow, neighborCol] = neighbor
        const neighborHeat = table[neighborRow]?.[neighborCol] || Infinity
        const cellHeat = cellTemps[`${row}-${col}`]
        console.log('neighborHeat', neighborHeat)
        console.log('cellHeat', cellHeat)
        const altHeatLoss = cellHeat + neighborHeat
        // if the neighbor is not in the queue, add it
        if (altHeatLoss < cellTemps[`${neighborRow}-${neighborCol}`]) {
          cellTemps[`${neighborRow}-${neighborCol}`] = altHeatLoss
          //queue.add([neighborRow, neighborCol, neighborHeat, altHeatLoss])
          console.log('neighbor heat loss plus current minHeatLoss, reset neighbor heat loss', altHeatLoss, 'neighbor', neighbor)
        }
      }

      iterations++
    }

    console.log('iterations', iterations)
    // console.log('shortestPathPositions', shortestPathPositions)
    console.log('cellTemps', cellTemps)
    console.log('queue', queue)

    return {
      table,
      shortestPathPositions,
    }
  }

  render() {
    const {
      startTime,
    } = this

    let totalPartOne = 0
    let totalPartTwo = 0

    console.log('this.puzzle', this.puzzle)

    const {
      table,
      shortestPathPositions,
    } = this.puzzle

    const renderTable = data => {
      return html`
        <table>
          ${data && data.map((row, rowIndex) => {
            return html`
              <tr>
                ${row.map((col, colIndex) => {
                  let cell = col
                  return html`
                    <td class="black">${cell}</td>
                  `
                })}
              </tr>
            `
          })}
        </table>
      `
    }

    return html`
      <my-card>
        <div class="d-flex center">
          <div>
            ${this.puzzleSwitcher(daySeventeen2023.adventUrl)}
          </div>
          <div>
            <div class="d-flex space-evenly child-ml-1">
              <div>The  part one<sp-badge>${numeral(0).format('0,0')}</sp-badge></div>
              <div>The part two<sp-badge>${numeral(0).format('0,0')}</sp-badge></div>
            </div>
          </div>
        </div>
      </my-card>
      <my-card>
        ${renderTable(table || [])}
      </my-card>
      ${this.timeTaken(startTime)}
    `
  }
}
!window.customElements.get(elementName) && window.customElements.define(elementName, DaySeventeen)
