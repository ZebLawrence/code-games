import { css, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import { PuzzleToggleWithLit } from '../../../mixins/puzzleToggle'
import { addNumbers } from '../../../utils/mathHelp'
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
    css``
  ]

  constructor() {
    super({
      examplePuzzle,
      fullPuzzle
    })
  }

  parseInput(input) {
    console.log('Raw input', input)
    return []
  }

  render() {
    const {
      startTime
    } = this

    return html`
      <my-card>
        <div class="d-flex-grid justify-between">
          ${this.puzzleSwitcher(dayThree2023.adventUrl)}
        </div>
      </my-card>
      <my-card>
        Day three content
      </my-card>
      ${this.timeTaken(startTime)}
    `
  }

}

!window.customElements.get(elementName) && window.customElements.define(elementName, DayThree)
