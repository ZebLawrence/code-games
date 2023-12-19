import { css, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import numeral from 'numeral'
import { calcPolygonArea } from '../../../utils/mathHelp'
import { memoize } from '../../../utils/funcHelpers'
import { PuzzleToggleWithLit } from '../../../mixins/puzzleToggle'
import {
  examplePuzzleSmall,
  examplePuzzle,
  fullPuzzle,
} from './2023-12-18-puzzle'

/* playground-hide */
const elementName = 'day-eighteen-two-three'
export const dayEighteen2023 = {
  tag: elementName,
  title: '2023 Day Eighteen',
  path: '#/2023/day-Eighteen/',
  codeFileName: '2023-12-18.js',
  adventUrl: 'https://adventofcode.com/2023/day/18',
}
/* playground-hide-end */

const getDirectionFromNumber = number => {
  switch (number) {
    case 0:
      return 'R'
      break;
    case 1:
      return 'D'
    case 2:
      return 'L'
    case 3:
      return 'U'
    default:
      break;
  }
}

export class DayEighteen extends PuzzleToggleWithLit {
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
    this.selectedPuzzle = 'fullPuzzle'
  }

  parseInput(input) {
    // console.log('input', input)
    const directionTotals = {}
    let pathTotal = 0
    let pathTotalTwo = 0
    const digInstructions = input.split('\n').map(row => {
      const [direction, distanceRaw, colorRaw] = row.split(' ').map(item => item.trim())
      const distance = Number(distanceRaw)
      const color = colorRaw.replace('(', '').replace(')', '')
      const directionNumber = Number(color.substring(color.length - 1, color.length))
      const hexDistance = color.substring(0, color.length - 1).replace('#', '')
      const directionTwo = getDirectionFromNumber(directionNumber)
      const distanceTwo = parseInt(hexDistance, 16)

      pathTotal += distance
      pathTotalTwo += distanceTwo
      directionTotals[direction] = directionTotals[direction] != null ? directionTotals[direction] + Number(distance) : Number(distance)

      return {
        direction,
        distance: Number(distance),
        color: color.replace('(', '').replace(')', ''),
        directionTwo,
        distanceTwo,
      }
    })

    const pointPartOne = [[0, 0]]
    const pointPartTwo = [[0, 0]]

    digInstructions.forEach(instruction => {
      const {
        direction,
        distance,
        directionTwo,
        distanceTwo,
        color,
      } = instruction
      // part one coords
      const [lastRow, lastCol] = pointPartOne[pointPartOne.length - 1]
      if (direction === 'U') {
        const newRow = lastRow - distance
        pointPartOne.push([newRow, lastCol])
      } else if (direction === 'D') {
        const newRow = lastRow + distance
        pointPartOne.push([newRow, lastCol])
      } else if (direction === 'L') {
        const newCol = lastCol - distance
        pointPartOne.push([lastRow, newCol])
      } else if (direction === 'R') {
        const newCol = lastCol + distance
        pointPartOne.push([lastRow, newCol])
      }
      //part two coords
      const [lastRowTwo, lastColTwo] = pointPartTwo[pointPartTwo.length - 1]
      if (directionTwo === 'U') {
        const newRow = lastRowTwo - distanceTwo
        pointPartTwo.push([newRow, lastColTwo])
      } else if (directionTwo === 'D') {
        const newRow = lastRowTwo + distanceTwo
        pointPartTwo.push([newRow, lastColTwo])
      } else if (directionTwo === 'L') {
        const newCol = lastColTwo - distanceTwo
        pointPartTwo.push([lastRowTwo, newCol])
      } else if (directionTwo === 'R') {
        const newCol = lastColTwo + distanceTwo
        pointPartTwo.push([lastRowTwo, newCol])
      }

    })

    const innerArea = calcPolygonArea(pointPartOne)
    const pathArea = pathTotal * 0.5
    const totalAreaPartOne = pathArea + innerArea + 1
    console.log('totalAreaPartOne', totalAreaPartOne)

    const innerAreaTwo = calcPolygonArea(pointPartTwo)
    const pathAreaTwo = pathTotalTwo * 0.5
    const totalAreaPartTwo = pathAreaTwo + innerAreaTwo + 1
    console.log('totalAreaPartTwo', totalAreaPartTwo)

    return {
      totalAreaPartOne,
      totalAreaPartTwo,
      pointPartOne,
      pointPartTwo,
    }
  }

  drawPolygon(context, polygon, strokeStyle, fillStyle) {
    context.clearRect(0, 0, 500, 500);
    context.strokeStyle = strokeStyle
    context.fillStyle = fillStyle
    context.beginPath()
    
    const minRow = Math.abs(Math.min(...polygon.map(item => item[0])))
    const minCol = Math.abs(Math.min(...polygon.map(item => item[1])))
    context.moveTo((polygon[0][1] + minCol), (polygon[0][0] + minRow)) //first vertex

    for (var i = 1; i < polygon.length; i++) {
      context.lineTo((polygon[i][1] + minCol), (polygon[i][0] + minRow))
    }

    // context.lineTo((polygon[0][1] + minCol), (polygon[0][0] + minRow)) //back to start
    context.fill()
    context.stroke()
    context.closePath()
  }

  updated(updatedProps) {
    super.updated(updatedProps)
    const canvasContext = this.shadowRoot.getElementById('canvas').getContext("2d")
    const { pointPartOne, pointPartTwo } = this.puzzle
    this.drawPolygon(canvasContext, pointPartOne, "#888", "#88f")
  }

  render() {
    const {
      startTime,
    } = this

    console.log('this.puzzle', this.puzzle)
    const {
      totalAreaPartOne,
      totalAreaPartTwo,
      pointPartOne,
      pointPartTwo,
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
            ${this.puzzleSwitcher(dayEighteen2023.adventUrl)}
          </div>
          <div>
            <div class="d-flex space-evenly child-ml-1">
              <div>The part one<sp-badge>${numeral(totalAreaPartOne).format('0,0')}</sp-badge></div>
              <div>The part two<sp-badge>${numeral(totalAreaPartTwo).format('0,0')}</sp-badge></div>
            </div>
          </div>
        </div>
      </my-card>
      <my-card label="Canvas">
        <canvas id="canvas" width="500" height="500"></canvas>
      </my-card>
      <my-card label="Part 1">
        ${renderTable(pointPartOne || [])}
      </my-card>
      <my-card label="Part 2">
        ${renderTable(pointPartTwo || [])}
      </my-card>
      ${this.timeTaken(startTime)}
    `
  }
}
!window.customElements.get(elementName) && window.customElements.define(elementName, DayEighteen)
