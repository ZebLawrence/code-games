import { css, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import numeral from 'numeral'
import { addNumbers } from '../../../utils/mathHelp'
import { memoize } from '../../../utils/funcHelpers'
import { PuzzleToggleWithLit } from '../../../mixins/puzzleToggle'
import {
  examplePuzzle,
  fullPuzzle,
} from './2023-12-16-puzzle'

/* playground-hide */
const elementName = 'day-sixteen-two-three'
export const daySixteen2023 = {
  tag: elementName,
  title: '2023 Day Sixteen',
  path: '#/2023/day-sixteen/',
  codeFileName: '2023-12-16.js',
  adventUrl: 'https://adventofcode.com/2023/day/16',
}
/* playground-hide-end */

const getNextDirection = memoize((direction, row, col, right, down, left, up) => {
  const result = []
  if (direction === 'R') {
    if (right === '.' || right === '-') {
      result.push([row, col + 1, 'R'])
    } else if (right === '\\') {
      result.push([row, col + 1, 'D'])
    } else if (right === '/') {
      result.push([row, col + 1, 'U'])
    } else if (right === '|') {
      result.push([row, col + 1, 'D'])
      result.push([row, col + 1, 'U'])
    }
  } else if (direction === 'D') {
    if (down === '.' || down === '|') {
      result.push([row + 1, col, 'D'])
    } else if (down === '\\') {
      result.push([row + 1, col, 'R'])
    } else if (down === '/') {
      result.push([row + 1, col, 'L'])
    } else if (down === '-') {
      result.push([row + 1, col, 'R'])
      result.push([row + 1, col, 'L'])
    }
  } else if (direction === 'L') {
    if (left === '.' || left === '-') {
      result.push([row, col - 1, 'L'])
    } else if (left === '\\') {
      result.push([row, col - 1, 'U'])
    } else if (left === '/') {
      result.push([row, col - 1, 'D'])
    } else if (left === '|') {
      result.push([row, col - 1, 'D'])
      result.push([row, col - 1, 'U'])
    }
  } else if (direction === 'U') {
    if (up === '.' || up === '|') {
      result.push([row - 1, col, 'U'])
    } else if (up === '\\') {
      result.push([row - 1, col, 'L'])
    } else if (up === '/') {
      result.push([row - 1, col, 'R'])
    } else if (up === '-') {
      result.push([row - 1, col, 'R'])
      result.push([row - 1, col, 'L'])
    }
  }
  return result
})

const energizeLaserGrid = (table, startFrom) => {
  const max = 90000
  let iterations = 0
  const visited = {}
  const visitedCache = {}
  let queue = [startFrom]

  while(queue.length > 0 && iterations < max) {
    const [row, col, direction] = queue.shift()

    if (visitedCache[`${row},${col},${direction}`] && visitedCache[`${row},${col},${direction}`].length > 1) { 
      continue
    }

    if (row > -1 && col > -1) {        
      visited[`${row},${col}`] = visited[`${row},${col}`] || []
      visited[`${row},${col}`].push([row, col, direction])
      visitedCache[`${row},${col},${direction}`] = visitedCache[`${row},${col},${direction}`] || []
      visitedCache[`${row},${col},${direction}`].push([row, col, direction])
    }
    
    const right = table[row] && table[row][col + 1]
    const down = table[row + 1] && table[row + 1][col]
    const left = table[row] && table[row][col - 1]
    const up = table[row - 1] && table[row - 1][col]
    const nextCells = getNextDirection(direction, row, col, right, down, left, up)

    queue.push(...nextCells)
    iterations++
  }

  return {
    startFrom,
    visited,
    energized: Object.keys(visited).length,
    iterations,
  }
}

export class DaySixteen extends PuzzleToggleWithLit {
  static properties = {
    ...super.properties,
  }
/* playground-hide */
  static styles = [
    ...super.styles,
    css`
      table{
        aspect-ratio: 1;
        margin: 0.2em;
        // width: 100%;
      }
      table td{
        padding: 0em;
        font-size: 2em;
        width: 1em;
        height: 0.5em;
      }
      table.large td{
        padding: 0em;
        font-size: 0.4em;
        width: 1em;
        height: 0.5em;
      }
    `
  ]
/* playground-hide-end */

  constructor() {
    super({
      examplePuzzle,
      fullPuzzle,
    })
  }

  parseInput(input) {
    const table = input[0].split('\n').map(row => row.split(''))

    const {
      visited,
      energized,
      iterations,
      startFrom,
    } = energizeLaserGrid(table, [0, -1, 'R'])

    const startPositions = []
    const height = table.length
    const width = table[0].length

    for (let index = 0; index < height; index++) {
      startPositions.push([index, -1, 'R'])
      startPositions.push([-1, index, 'D'])
      startPositions.push([height, index, 'U'])
      startPositions.push([index, height, 'L'])
    }

    const energizedTables = startPositions.map(startPosition => {
      return energizeLaserGrid(table, startPosition)
    })

    let energizedPartTwo = 0
    let startFromPartTwo = null
    let mostEnergizedTable = null
    energizedTables.forEach(energizedTable => {
      if (energizedTable.energized > energizedPartTwo) {
        energizedPartTwo = energizedTable.energized
        mostEnergizedTable = energizedTable
        startFromPartTwo = energizedTable.startFrom
      }
    })

    return {
      table,
      visitedPartOne: visited,
      startFromPartOne: startFrom,
      energizedPartOne: energized,
      energizedPartTwo,
      visitedPartTwo: mostEnergizedTable.visited,
      startFromPartTwo,
      energizedTables,
    }
  }

  render() {
    const {
      startTime,
    } = this

    let totalPartOne = 0
    let totalPartTwo = 0
    const {
      table,
      visitedPartOne,
      energizedPartOne,
      startFromPartOne,
      energizedPartTwo,
      visitedPartTwo,
      startFromPartTwo,
      energizedTables,
    } = this.puzzle

    const renderTable = (visited, startLocation = []) => {
      const [startRow, startCol, startDirection] = startLocation
      return html`
        <table class=${classMap({ large: this.selectedPuzzle === 'fullPuzzle' })}>
          <tr>
            <td></td>
            ${table && table[0].map((col, colIndex) => {
              return html`<td class=${classMap({ blue: startRow === -1 && startCol === colIndex })}></td>`
            })}
            <td></td>
          </tr>
          ${table && table.map((row, rowIndex) => {
            return html`
              <tr>
                <td class=${classMap({ blue: startRow === rowIndex && startCol === -1 })}></td>
                ${row.map((col, colIndex) => {
                  let cell = col
                  return html`
                    <td class=${classMap({ red: visited && visited[`${rowIndex},${colIndex}`] })}>${cell}</td>
                  `
                })}
                <td class=${classMap({ blue: startRow === rowIndex && startCol ===  table.length })}></td>
              </tr>
            `
          })}
          <tr>
            <td></td>
            ${table && table[0].map((col, colIndex) => {
              return html`<td class=${classMap({ blue: startRow === table.length && startCol === colIndex })}></td>`
            })}
            <td></td>
          </tr>
        </table>
      `
    }

    const partTwoTable = this.selectedPuzzle === 'fullPuzzle'
      ? renderTable(visitedPartTwo || {}, startFromPartTwo)
      : energizedTables && energizedTables.map(({ visited, startFrom }) => {
        return renderTable(visited || {}, startFrom)
      })

    return html`
      <my-card>
        <div class="d-flex center">
          <div>
            ${this.puzzleSwitcher(daySixteen2023.adventUrl)}
          </div>
          <div>
            <div class="d-flex space-evenly child-ml-1">
              <div>The energized part one<sp-badge>${numeral(energizedPartOne).format('0,0')}</sp-badge></div>
              <div>The most energized part two<sp-badge>${numeral(energizedPartTwo).format('0,0')}</sp-badge></div>
              <div><sp-badge class="blue">Laser Start</sp-badge></div>
              <div><sp-badge class="red">Laser Path !</sp-badge></div>
            </div>
          </div>
        </div>
      </my-card>
      <my-card label="Part 1">
        <div class="d-flex space-evenly flex-wrap">
          ${renderTable(visitedPartOne || {}, startFromPartOne)}
        </div>
      </my-card>
      <my-card label="Part 2">
        <div class="d-flex space-evenly flex-wrap">
          ${partTwoTable}
        </div>
      </my-card>
      ${this.timeTaken(startTime)}
    `
  }
}
!window.customElements.get(elementName) && window.customElements.define(elementName, DaySixteen)
