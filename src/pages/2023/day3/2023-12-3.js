import { css, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import { PuzzleToggleWithLit } from '../../../mixins/puzzleToggle'
import { addNumbers, multiplyNumbers } from '../../../utils/mathHelp'
import {
  examplePuzzle,
  fullPuzzle
} from './2023-12-3-puzzle'
/* playground-hide */
const elementName = 'day-three-two-three'
export const dayThree2023 = {
  tag: elementName,
  title: '2023 Day Three',
  path: '#/2023/day-three/',
  codeFileName: '2023-12-3.js',
  adventUrl: 'https://adventofcode.com/2023/day/3',
}
/* playground-hide-end */

export class DayThree extends PuzzleToggleWithLit {
  static properties = {
    ...super.properties,
  }

  static styles = [
    ...super.styles,
    css`
      .table-container td{
        font-size: .5em;
        padding: 0;
        text-align: center;
        width: 10px;
        height: 10px;
        font-weight: bold;
      }
      .table-container td.green, .table-container td.red{
        border: none;
      }
    `
  ]

  constructor() {
    super({
      examplePuzzle,
      fullPuzzle
    })
    this.selectedPuzzle = 'examplePuzzle'
  }

  parseInput(input) {
    console.log('Raw input', input)
    
    return input.split('\n').map((row) => row.split(''))
  }

  render() {
    const {
      startTime
    } = this

    const isSymbol = (char) => {
      return char !== undefined && isNaN(char) && char !== '.'
    }

    const addGearCoordinate = (array, symbol, coords) => {
      if (symbol === '*') {
        array.push(coords)
      }
    }

    let allFoundPartNumbers = []
    let validPartNumbers = []
    let totalValidPartNumbers = 0
    let totalGearRatios = 0
    let gearRatiosMultiplied = []
    const gearMap = {}
    const adjacentCoordsMap = {}

    this.puzzle.forEach((row, rowIndex) => {
      let numberFoundInThisRow = []
      let topLeft = false
      let top = false
      let topRight = false
      let right = false
      let bottomRight = false
      let bottom = false
      let bottomLeft = false
      let left = false
      let hasAdjacent = false
      let adjacentGears = []
      let numberCoords = []

      row.forEach((char, colIndex) => {
        // have a number look all around it for not . and not undefined
        if (!isNaN(char)) {
          numberCoords.push(`${rowIndex},${colIndex}`)
          numberFoundInThisRow.push(char)

          topLeft = this.puzzle[rowIndex - 1] && this.puzzle[rowIndex - 1][colIndex - 1]
          const topLeftCoords = `${rowIndex - 1},${colIndex - 1}`
          addGearCoordinate(adjacentGears, topLeft, topLeftCoords)

          top = this.puzzle[rowIndex - 1] && this.puzzle[rowIndex - 1][colIndex]
          const topCoords = `${rowIndex - 1},${colIndex}`
          addGearCoordinate(adjacentGears, top, topCoords)

          topRight = this.puzzle[rowIndex - 1] && this.puzzle[rowIndex - 1][colIndex + 1]
          const topRightCoords = `${rowIndex - 1},${colIndex + 1}`
          addGearCoordinate(adjacentGears, topRight, topRightCoords)

          right = this.puzzle[rowIndex][colIndex + 1]
          const rightCoords = `${rowIndex},${colIndex + 1}`
          addGearCoordinate(adjacentGears, right, rightCoords)

          bottomRight = this.puzzle[rowIndex + 1] && this.puzzle[rowIndex + 1][colIndex + 1]
          const bottomRightCoords = `${rowIndex + 1},${colIndex + 1}`
          addGearCoordinate(adjacentGears, bottomRight, bottomRightCoords)

          bottom = this.puzzle[rowIndex + 1] && this.puzzle[rowIndex + 1][colIndex]
          const bottomCoords = `${rowIndex + 1},${colIndex}`
          addGearCoordinate(adjacentGears, bottom, bottomCoords)

          bottomLeft = this.puzzle[rowIndex + 1] && this.puzzle[rowIndex + 1][colIndex - 1]
          const bottomLeftCoords = `${rowIndex + 1},${colIndex - 1}`
          addGearCoordinate(adjacentGears, bottomLeft, bottomLeftCoords)

          left = this.puzzle[rowIndex][colIndex - 1]
          const leftCoords = `${rowIndex},${colIndex - 1}`
          addGearCoordinate(adjacentGears, left, leftCoords)
          
          if (isSymbol(topLeft)
            || isSymbol(top)
            || isSymbol(topRight)
            || isSymbol(right)
            || isSymbol(bottomRight)
            || isSymbol(bottom)
            || isSymbol(bottomLeft)
            || isSymbol(left)) {
            hasAdjacent = true;
          }

        } 
        
        if (isNaN(char) || colIndex === row.length - 1) {
          if (numberFoundInThisRow.length) {
            const partNumber = Number(numberFoundInThisRow.join(''))
            allFoundPartNumbers.push(partNumber)

            if (hasAdjacent) {
              validPartNumbers.push(partNumber)

              if (adjacentGears.length) {
                adjacentGears.forEach((coords) => {
                  gearMap[coords] = gearMap[coords] || []
                  if (gearMap[coords] && gearMap[coords].indexOf(partNumber) === -1) {
                    gearMap[coords].push(partNumber)
                  }
                })
              }

              numberCoords.forEach((coords) => {
                adjacentCoordsMap[coords] = true
              })
            }
            
          }
          numberCoords = []
          adjacentGears = []
          numberFoundInThisRow = []
          hasAdjacent = false
        }
      })

    })

    // look at all the locations where gears were found and how many numbers wer touching them
    Object.entries(gearMap).forEach(([coords, parts]) => {
      if (parts.length > 1) {
        gearRatiosMultiplied.push(multiplyNumbers(parts))
      }
    })

    totalValidPartNumbers = validPartNumbers.length && addNumbers(validPartNumbers)
    totalGearRatios = gearRatiosMultiplied.length && addNumbers(gearRatiosMultiplied)

    return html`
      <my-card>
        <div class="d-flex-grid justify-between">
          ${this.puzzleSwitcher(dayThree2023.adventUrl)}
          <div>
            <ul>
              <li class="green">Valid Part Number touching symbol</li>
              <li class="red">Invalid Part Number</li>
              <li class="blue">⚙️ gear connecting part numbers</li>
              <li>🔧 Symbol</li>
            </ul>
          </div>
        </div>
      </my-card>
      <my-card>
        Valid part number total: ${totalValidPartNumbers}
      </my-card>
      <my-card>
        Gear ratios total: ${totalGearRatios}
      </my-card>
      <my-card>
        <div class="table-container">
          <table>
            <tbody>
              ${this.puzzle.map((row, rowIndex) => {
                return html`
                  <tr>
                    ${row.map((char, colIndex) => {
                      const coords = `${rowIndex},${colIndex}`
                      const isAdjacent = adjacentCoordsMap[coords] === true
                      const isGear = gearMap[coords] && gearMap[coords].length > 1
                      let display = char

                      switch (char) {
                        case '*':
                          display = isGear ? '⚙️': '🔧'
                          break;
                        case '.':
                          display = ''
                          break;
                        default:
                          display = isNaN(char) ? '🔧' : char
                      }

                      return html`
                        <td class=${classMap({
                          'green': isAdjacent,
                          'blue': isGear,
                          'red': !isNaN(char) && !isAdjacent 
                        })}>
                          ${display}
                        </td>
                      `
                    })}
                  </tr>
                `
              })}
            </tbody>
          </table>
        </div>
      </my-card>
      ${this.timeTaken(startTime)}
    `
  }

}

!window.customElements.get(elementName) && window.customElements.define(elementName, DayThree)
