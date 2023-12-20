import { css, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import numeral from 'numeral'
import { calcPolygonArea } from '../../../utils/mathHelp'
import { memoize } from '../../../utils/funcHelpers'
import { PuzzleToggleWithLit } from '../../../mixins/puzzleToggle'
import {
  examplePuzzle,
  fullPuzzle,
} from './2023-12-20-puzzle'

/* playground-hide */
const elementName = 'day-twenty-two-three'
export const dayTwenty2023 = {
  tag: elementName,
  title: '2023 Day Twenty',
  path: '#/2023/day-Twenty/',
  codeFileName: '2023-12-20.js',
  adventUrl: 'https://adventofcode.com/2023/day/20',
}
/* playground-hide-end */


export class DayTwenty extends PuzzleToggleWithLit {
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
   
    return {}
  }

  render() {
    const {
      startTime,
    } = this

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
            ${this.puzzleSwitcher(dayTwenty2023.adventUrl)}
          </div>
          <div>
            <div class="d-flex space-evenly child-ml-1">
              <div>The part one<sp-badge>${numeral(0).format('0,0')}</sp-badge></div>
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
!window.customElements.get(elementName) && window.customElements.define(elementName, DayTwenty)
