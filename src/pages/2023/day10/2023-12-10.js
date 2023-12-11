import { css, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import numeral from 'numeral'
import { PuzzleToggleWithLit } from '../../../mixins/puzzleToggle'
import {
  examplePuzzlePart1_1,
  examplePuzzlePart1_2,
  examplePart2_1,
  examplePart2_2,
  examplePart2_3,
  fullPuzzle,
} from './2023-12-10-puzzle'

/* playground-hide */
const elementName = 'day-ten-two-three'
export const dayTen2023 = {
  tag: elementName,
  title: '2023 Day Ten',
  path: '#/2023/day-ten/',
  codeFileName: '2023-12-10.js',
  adventUrl: 'https://adventofcode.com/2023/day/10',
}
/* playground-hide-end */

const northChars = ['|', '7', 'F']
const eastChars = ['-', '7', 'J']
const southChars = ['|', 'L', 'J']
const westChars = ['-', 'L', 'F']

const getLetterGrid = (row, col, letter) => {
  if (letter === '|') {
    return [
      ['*', '@', '*'],
      ['*', '@', '*'],
      ['*', '@', '*']
    ][row][col]
  } else if (letter === '-') {
    return [
      ['*', '*', '*'],
      ['@', '@', '@'],
      ['*', '*', '*']
    ][row][col]
  } else if (letter === 'L') {
    return [
      ['*', '@', '*'],
      ['*', '@', '@'],
      ['*', '*', '*']
    ][row][col]
  } else if (letter === 'J') {
    return [
      ['*', '@', '*'],
      ['@', '@', '*'],
      ['*', '*', '*']
    ][row][col]
  } else if (letter === '7') {
    return [
      ['*', '*', '*'],
      ['@', '@', '*'],
      ['*', '@', '*']
    ][row][col]
  } else if (letter === 'F') {
    return [
      ['*', '*', '*'],
      ['*', '@', '@'],
      ['*', '@', '*']
    ][row][col]
  } else if (letter === 'S') {
    return 'S'
  } else if (letter === '.') {
    return '.'
  }
}

const buildLargeGridSquare = (grid, row, col, letter) => {
  for (let rowIndex = row; rowIndex < row + 3; rowIndex++) {
    for (let colIndex = col; colIndex < col + 3; colIndex++) {
      grid[rowIndex] = grid[rowIndex] || []
      grid[rowIndex][colIndex] = getLetterGrid(rowIndex - row, colIndex - col, letter)
    }
  }
  return [row + 1, col + 1]
}

export class DayTen extends PuzzleToggleWithLit {
  static properties = {
    ...super.properties,
  }
/* playground-hide */
  static styles = [
    ...super.styles,
    css`
      table{
        width: 100%;
        aspect-ratio: 1;
      }
      td{
        padding: 0px;
      }
      .large td{
        font-size: 1em;
        width: 1em;
        height: 1em;
      }
      .small td{
        font-size: 0.2em;
        width: 0.2em;
        height: 0.2em;
      }
      
    `
  ]
/* playground-hide-end */

  constructor() {
    super({
      examplePuzzlePart1_1,
      examplePuzzlePart1_2,
      examplePart2_1,
      examplePart2_2,
      examplePart2_3,
      fullPuzzle,
    })
    this.selectedPuzzle = 'fullPuzzle'
  }

  parseInput(input) {
    const pipeMap = {
      grid: [],
      gridCopy: [],
      startIndex: [],
      max: 0,
      largeGrid: [],
    }
    input.split('\n').forEach((line, rowIndex) => {
      const pipes = line.split('')
      const startIndex = pipes.indexOf('S')
      if (startIndex > -1) {
        pipeMap.startIndex = [rowIndex, startIndex]
      }
      pipeMap.grid.push(pipes)
      pipeMap.gridCopy.push(pipes)
    })
    pipeMap.max = pipeMap.grid.length * pipeMap.grid[0].length
    pipeMap.largeGrid = Array.from(Array(pipeMap.grid.length * 3), () => Array(pipeMap.grid[0].length * 3).fill('*'))

    return pipeMap
  }

  render() {
    const {
      startTime,
    } = this

    let totalPipeLength = 0
    let insideCount = 0
    const outsideCoords = {}
    const insideCoords = {}

    const { startIndex, grid, max, gridCopy, largeGrid } = this.puzzle
    if (grid && grid.length) {
      
      let currentLocation = [...startIndex]
      const [rowIndex, colIndex] = currentLocation
      const north = grid[rowIndex - 1] && grid[rowIndex - 1][colIndex]
      const east = grid[rowIndex][colIndex + 1]
      const south = grid[rowIndex + 1] && grid[rowIndex + 1][colIndex]
      const west = grid[rowIndex][colIndex - 1]
      let direction = ''
      // determine start direction
      if (northChars.includes(north)) {
        direction = 'north'
        currentLocation = [rowIndex - 1, colIndex]
      } else if (eastChars.includes(east)) {
        direction = 'east'
        currentLocation = [rowIndex, colIndex + 1]
      } else if (southChars.includes(south)) {
        direction = 'south'
        currentLocation = [rowIndex + 1, colIndex]
      } else if (westChars.includes(west)) {
        direction = 'west'
        currentLocation = [rowIndex, colIndex - 1]
      }
  
      for (let index = 0; index < max; index++) {
        const [row, col] = currentLocation
        const character = grid[row][col]
        buildLargeGridSquare(largeGrid, row * 3, col * 3, character)

        if (character === 'S') {
          break
        }

        totalPipeLength += 1
        gridCopy[row][col] = '@' // mark as visited
        if (direction === 'north') {
          // going north and found character..
          // set next location and travel direction
          if (character === '|') {
            direction = 'north'
            currentLocation = [row - 1, col]
          } else if (character === 'F') {
            direction = 'east'
            currentLocation = [row, col + 1]
          } else if (character === '7') {
            direction = 'west'
            currentLocation = [row, col - 1]
          }
        } else if (direction === 'east') {
          // going east and found character..
          if (character === '-') {
            direction = 'east'
            currentLocation = [row, col + 1]
          } else if (character === '7') {
            direction = 'south'
            currentLocation = [row + 1, col]
          } else if (character === 'J') {
            direction = 'north'
            currentLocation = [row - 1, col]
          }
        } else if (direction === 'south') {
          // going south and found character..
          if (character === '|') {
            direction = 'south'
            currentLocation = [row + 1, col]
          } else if (character === 'J') {
            direction = 'west'
            currentLocation = [row, col - 1]
          } else if (character === 'L') {
            direction = 'east'
            currentLocation = [row, col + 1]
          }
        } else if (direction === 'west') {
          // going west and found character..
          if (character === '-') {
            direction = 'west'
            currentLocation = [row, col - 1]
          } else if (character === 'L') {
            direction = 'north'
            currentLocation = [row - 1, col]
          } else if (character === 'F') {
            direction = 'south'
            currentLocation = [row + 1, col]
          }
        } 
      }
    }

    const getBasinFromCoord = (row, col, foundCoords, gridToExplore) => {
      let tries = 0
      const queue = [[row, col]]
      const visited = {}
      while (queue.length) {
        tries += 1
        const [row, col] = queue.shift()
        visited[`${row},${col}`] = true
        const cell = gridToExplore[row] && gridToExplore[row][col]

        if (cell === '*' && !foundCoords[`${row},${col}`]) {
          foundCoords[`${row},${col}`] = true
          // directions to add to queue
          const directions = [
            [row - 1, col], // north
            [row, col + 1], // east
            [row + 1, col], // south
            [row, col - 1], // west
          ]

          directions.forEach(([newRow, newCol]) => {
            if (!visited[`${newRow},${newCol}`] && gridToExplore[newRow] && gridToExplore[newRow][newCol] === '*') {
              queue.push([newRow, newCol])
            }
          })
        }

        if (tries === 176400) {
          console.log('Too many tries!', [row, col])
          break
        }
      }
    }

    if (largeGrid && largeGrid.length) {
      // fill the outside
      getBasinFromCoord(0, 0, outsideCoords, largeGrid)
      // fill the inside
      if (this.selectedPuzzle === 'fullPuzzle') {
        getBasinFromCoord(210, 210, insideCoords, largeGrid)
      } else if (this.selectedPuzzle === 'examplePuzzlePart1_1') {
        getBasinFromCoord(6, 6, insideCoords, largeGrid)
      } else if (this.selectedPuzzle === 'examplePuzzlePart1_2') {
        getBasinFromCoord(6, 8, insideCoords, largeGrid)
      } else if (this.selectedPuzzle === 'examplePart2_1' || this.selectedPuzzle === 'examplePart2_2') {
        getBasinFromCoord(6, 6, insideCoords, largeGrid)
      } else if (this.selectedPuzzle === 'examplePart2_3') {
        getBasinFromCoord(6, 6, insideCoords, largeGrid)
      }

      grid.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
          if (insideCoords[`${(rowIndex * 3) + 1},${(colIndex * 3) + 1}`]) {
            insideCount += 1
          }
        })
      })
    }

    const renderTable = (tableData, size) => {
      return html`
        <table class=${size}>
          <tbody>
            ${tableData && tableData.map((row, rowIndex) => {
              return html`
                <tr class=${classMap({ bright: this.selectedPuzzle === 'fullPuzzle' })}>
                  ${row.map((col, colIndex) => {
                    const blue = col === '@'
                    const yellow = insideCoords[`${rowIndex},${colIndex}`] != null
                    const red = col === 'S'
                    const green = outsideCoords[`${rowIndex},${colIndex}`] != null
                    return html`
                      <td class=${classMap({
                        blue,
                        red,
                        green,
                        yellow,
                      })}
                      })}>
                        
                      </td>
                    `
                  })}
                </tr>
              `
            })}
          </tbody>
        </table>
      `
    }

    return html`
      <my-card>
        <div class="d-flex center">
          <div>${this.puzzleSwitcher(dayTen2023.adventUrl)}</div>
          <div class="d-flex space-evenly child-ml-1">
            <div>The pipe halfway point <sp-badge>${numeral(Math.floor(totalPipeLength / 2) + 1).format('0,0')}</sp-badge></div>
            <div>The Inside Count <sp-badge>${insideCount}</sp-badge></div>
            <div><sp-badge class="red">Starting Point</sp-badge></div>
            <div><sp-badge class="blue">Pipe Line</sp-badge></div>
            <div><sp-badge class="green">Outside the Line</sp-badge></div>
            <div><sp-badge class="yellow">Inside the Line</sp-badge></div>
          </div>
        </div>
      </my-card>
      <my-card>
        ${renderTable(largeGrid, this.selectedPuzzle === 'fullPuzzle' ? 'small' : 'large')}
      </my-card>
      ${this.timeTaken(startTime)}
    `
  }
}

!window.customElements.get(elementName) && window.customElements.define(elementName, DayTen)
