import { css, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import numeral from 'numeral'
import { PuzzleToggleWithLit } from '../../../mixins/puzzleToggle'
import {
  examplePuzzle,
  fullPuzzle,
} from './2023-12-11-puzzle'

/* playground-hide */
const elementName = 'day-eleven-two-three'
export const dayEleven2023 = {
  tag: elementName,
  title: '2023 Day Eleven',
  path: '#/2023/day-eleven/',
  codeFileName: '2023-12-11.js',
  adventUrl: 'https://adventofcode.com/2023/day/11',
}
/* playground-hide-end */

export class DayEleven extends PuzzleToggleWithLit {
  static properties = {
    ...super.properties,
    expansionFactor: { type: Number },
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
        font-size: 1em;
        width: 0.2em;
        height: 0.2em;
      }
      .large td{
        padding: 0px;
        font-size: 0.3em;
        width: 0.2em;
        height: 0.2em;
      }
    `
  ]
/* playground-hide-end */

  constructor() {
    super({
      examplePuzzle,
      fullPuzzle,
    })
    this.expansionFactor = 1000000
  }

  parseInput(input) {
    const result = []
    let galaxyNumber = 0
    const columnsToExpand = []
    const rowsToExpand = []
    const universe = []
    const galaxyMap = {}

    input.split('\n').forEach((line, index) => {
      const pointsRaw = line.split('')
      const galaxiesFound = pointsRaw.includes('#')

      const points = pointsRaw.map((point) => {
        if(point === '#') {
          galaxyNumber++
          return galaxyNumber
        } else {
          return point
        }
      })

      result.push(points)

      if (!galaxiesFound) {
        rowsToExpand.push(index)
      }

    })

    result[0].forEach((point, colIndex) => {
      if (point === '.') {
        const length = result.length
        const foundPoints = []
        for (let rowIndex = 0; rowIndex < length; rowIndex++) {
          const colPoint = result[rowIndex][colIndex];
          if (colPoint === '#') {
            break
          } else if (colPoint === '.') {
            foundPoints.push(colPoint)
          }
        }
        if (foundPoints.length === length) {
          columnsToExpand.push(colIndex)
        }
      }
    })

    result.forEach((row, rowIndex) => {
      columnsToExpand.forEach((colIndex, index) => {
        const adjustColIndex = colIndex + index
      })
      universe.push(row)
      row.forEach((point, colIndex) => {
        if (point !== '.') {
          galaxyMap[point] = [rowIndex, colIndex]
        }
      })
    })

    return {
      universe,
      galaxyMap,
      rowsToExpand,
      columnsToExpand,
    }
  }

  render() {
    const {
      startTime,
      expansionFactor,
    } = this

    const { galaxyMap, universe, columnsToExpand, rowsToExpand } = this.puzzle
    let totalDistance = 0
    let totalDistanceV2 = 0
    const examinedGalaxies = {}
    galaxyMap && Object.entries(galaxyMap).forEach(([galaxyNumber, [rowIndex, colIndex]]) => {
      Object.entries(galaxyMap).forEach(([galaxyNumber2, [rowIndex2, colIndex2]]) => {
        if (examinedGalaxies[`${galaxyNumber}-${galaxyNumber2}`] == null && examinedGalaxies[`${galaxyNumber2}-${galaxyNumber}`] == null) {
          let addForRows = []
          let addForCols = []
          // path crosses these rows
          rowsToExpand.forEach((rowToExpand) => {
            if (rowToExpand > rowIndex && rowToExpand < rowIndex2
              || rowToExpand < rowIndex && rowToExpand > rowIndex2) {
              addForRows.push(rowToExpand)
            }
          })
          // path crosses these columns
          columnsToExpand.forEach((colToExpand) => {
            if (colToExpand > colIndex && colToExpand < colIndex2
              || colToExpand < colIndex && colToExpand > colIndex2) {
              addForCols.push(colToExpand)
            }
          })

          const distanceV1 = Math.abs(rowIndex - rowIndex2)
            + Math.abs(colIndex - colIndex2)
            + (addForRows.length)
            + (addForCols.length)
          const distanceV2 = Math.abs(rowIndex - rowIndex2)
            + Math.abs(colIndex - colIndex2)
            + (addForRows.length * (expansionFactor - 1))
            + (addForCols.length * (expansionFactor - 1))
          examinedGalaxies[`${galaxyNumber}-${galaxyNumber2}`] = distanceV2
          totalDistance += distanceV1
          totalDistanceV2 += distanceV2
        }
      })
    })

    return html`
      <my-card>
        <div class="d-flex center">
          <div>
            ${this.puzzleSwitcher(dayEleven2023.adventUrl)}
          </div>
          <div>
            <div class="d-flex space-evenly child-ml-1">
              <div>The part one distance <sp-badge>${numeral(totalDistance).format('0,0')}</sp-badge></div>
              <div>The part two distance<sp-badge>${numeral(totalDistanceV2).format('0,0')}</sp-badge></div>
            </div>
            <div class="d-flex space-evenly child-ml-1 mt-1">
              <div><sp-badge class="blue">Galaxy Location</sp-badge></div>
              <div><sp-badge class="black">Empty space</sp-badge></div>
              <div><sp-badge class="green">1,000,000 unit gaps of empty space</sp-badge></div>
            </div>
          </div>
        </div>
      </my-card>
      <my-card>
        <table class=${classMap({
          large: this.selectedPuzzle === 'fullPuzzle',
        })}>
          <tbody>
            ${universe && universe.map((row, rowIndex) => {
              return html`
                <tr>
                  ${row.map((point, colIndex) => {
                    return html`
                      <td class=${classMap({
                        blue: !isNaN(point),
                        green: columnsToExpand.includes(colIndex) || rowsToExpand.includes(rowIndex),
                      })}>
                        ${point}
                      </td>
                    `
                  })}
                </tr>
              `
            })}
          </tbody>
        </table>
      </my-card>
      ${this.timeTaken(startTime)}
    `
  }
}

!window.customElements.get(elementName) && window.customElements.define(elementName, DayEleven)
