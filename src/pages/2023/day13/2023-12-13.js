import { css, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import numeral from 'numeral'
import { PuzzleToggleWithLit } from '../../../mixins/puzzleToggle'
import {
  examplePuzzle,
  fullPuzzle,
} from './2023-12-13-puzzle'

/* playground-hide */
const elementName = 'day-thirteen-two-three'
export const dayThirteen2023 = {
  tag: elementName,
  title: '2023 Day Thirteen',
  path: '#/2023/day-Thirteen/',
  codeFileName: '2023-12-13.js',
  adventUrl: 'https://adventofcode.com/2023/day/13',
}
/* playground-hide-end */

export class DayThirteen extends PuzzleToggleWithLit {
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

    return []
  }

  render() {
    const {
      startTime,
    } = this

    let totalPartOne = 0
    let totalPartTwo = 0

    console.log('this.puzzle', this.puzzle)
    return html`
      <my-card>
        <div class="d-flex center">
          <div>
            ${this.puzzleSwitcher(dayThirteen2023.adventUrl)}
          </div>
          <div>
            <div class="d-flex space-evenly child-ml-1">
              <div>The part one<sp-badge>${numeral(totalPartOne).format('0,0')}</sp-badge></div>
              <div>The part two<sp-badge>${numeral(totalPartTwo).format('0,0')}</sp-badge></div>
            </div>
          </div>
        </div>
      </my-card>
      ${this.timeTaken(startTime)}
    `

  }
}
!window.customElements.get(elementName) && window.customElements.define(elementName, DayThirteen)
