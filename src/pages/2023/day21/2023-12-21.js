import { css, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import numeral from 'numeral'
import { calcPolygonArea } from '../../../utils/mathHelp'
import { memoize } from '../../../utils/funcHelpers'
import { PuzzleToggleWithLit } from '../../../mixins/puzzleToggle'
import {
  examplePuzzle,
  fullPuzzle,
} from './2023-12-21-puzzle'

/* playground-hide */
const elementName = 'day-twentyone-two-three'
export const dayTwentyOne2023 = {
  tag: elementName,
  title: '2023 Day TwentyOne',
  path: '#/2023/day-TwentyOne/',
  codeFileName: '2023-12-21.js',
  adventUrl: 'https://adventofcode.com/2023/day/21',
}
/* playground-hide-end */

export class DayTwentyOne extends PuzzleToggleWithLit {
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
      examplePuzzle,
      fullPuzzle,
    })
  }

  parseInput(input) {
    console.log('input', input)
    const startCoords = []
    const visited = {}
    const coordsGenerations = []

    const gardenMap = input.split('\n').map((row, rowIndex) => {
      return row.split('').map((col, colIndex) => {
        if (col === 'S') {
          startCoords.push(rowIndex, colIndex)
          coordsGenerations.push([[rowIndex, colIndex]])
          visited[`${rowIndex}-${colIndex}`] = true
        }
        return col
      })
    })
    //console.log('gardenMap', gardenMap)
    console.log('startCoords', startCoords)

    const steps = gardenMap.length < 12 ? 6 : 64

    let rightCount = 0
    let downCount = 0
    let leftCount = 0
    let upCount = 0

    for (let index = 0; index < steps; index++) {
      const previousCoords = coordsGenerations[coordsGenerations.length - 1]
      //console.log('previousCoords', previousCoords)
      const newCoords = []
      previousCoords.forEach(([row, col]) => {
        const length = gardenMap.length
        const rowMod = row % length
        const colMod = col % length

        const right = gardenMap[rowMod][colMod + 1]
        //const realRight = gardenMap[row][col + 1]
        const down = gardenMap[rowMod + 1] && gardenMap[rowMod + 1][colMod]
        //const realDown = gardenMap[row + 1] && gardenMap[row + 1][col]
        const left = gardenMap[rowMod][colMod - 1]
        //const realLeft = gardenMap[row][col - 1]
        const up = gardenMap[rowMod - 1] && gardenMap[rowMod - 1][colMod]
        //const realUp = gardenMap[row - 1] && gardenMap[row - 1][col]
        // console.log('right', right)
        // console.log('down', down)
        // console.log('left', left)
        // console.log('up', up)

        // if (!realRight) {
        //   rightCount++
        // }
        // if (!realDown) {
        //   downCount++
        // }
        // if (!realLeft) {
        //   leftCount++
        // }
        // if (!realUp) {
        //   upCount++
        // }

        if (right === '.' && !visited[`${row}-${col + 1}`]) {
          newCoords.push([row, col + 1])
          visited[`${row}-${col + 1}`] = true
        }
        if (down === '.' && !visited[`${row + 1}-${col}`]) {
          newCoords.push([row + 1, col])
          visited[`${row + 1}-${col}`] = true
        }
        if (left === '.' && !visited[`${row}-${col - 1}`]) {
          newCoords.push([row, col - 1])
          visited[`${row}-${col - 1}`] = true
        }
        if (up === '.' && !visited[`${row - 1}-${col}`]) {
          newCoords.push([row - 1, col])
          visited[`${row - 1}-${col}`] = true
        }    
      })
      // console.log('upCount', upCount)
      // console.log('downCount', downCount)
      // console.log('leftCount', leftCount)
      // console.log('rightCount', rightCount)
      coordsGenerations.push(newCoords)
    }

    //console.log('visited', visited)
    console.log('coordsGenerations', coordsGenerations)

    const totalGardens = coordsGenerations.reduce((acc, coords, index) => {
      //console.log('index', index)
      //console.log('coords', coords)
      if ((index + 1) %2) {
        //console.log('coords.length added', coords.length)
        return acc += coords.length
      }
      return acc
    }, 0)
    //const totalGardens = Object.keys(visited).length
    console.log('totalGardens', totalGardens)

    return {
      partOne: totalGardens,
    }
  }

  render() {
    const {
      startTime,
    } = this

    const {
      partOne,
    } = this.puzzle
    
    console.log('this.puzzle', this.puzzle)

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
            ${this.puzzleSwitcher(dayTwentyOne2023.adventUrl)}
          </div>
          <div>
            <div class="d-flex space-evenly child-ml-1">
              <div>The part one<sp-badge>${numeral(partOne).format('0,0')}</sp-badge></div>
              <div>The part two<sp-badge>${numeral(0).format('0,0')}</sp-badge></div>
            </div>
          </div>
        </div>
      </my-card>
      <my-card label="Canvas">
        <canvas id="canvas" width="500" height="500"></canvas>
      </my-card>
      <my-card label="Part 1">
        ${renderTable([])}
      </my-card>

      ${this.timeTaken(startTime)}
    `
  }
}
!window.customElements.get(elementName) && window.customElements.define(elementName, DayTwentyOne)
