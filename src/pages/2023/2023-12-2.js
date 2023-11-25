import { css, html } from 'lit'
import { PuzzleToggleWithLit } from '../../mixins/puzzleToggle'
import { examplePuzzle, fullPuzzle } from './puzzles/2023-12-1-puzzle'
/* playground-hide */
const elementName = 'day-two-two-three'
export const dayTwo2023 = {
  tag: elementName,
  title: '2023 Day Two',
  path: '#/2023/day-two/',
  codeFileName: '2023-12-2.js',
  adventUrl: 'https://adventofcode.com/2023/day/2',
}
/* playground-hide-end */

export class DayTwo extends PuzzleToggleWithLit {
  static properties = {
    ...super.properties,
  }

  static styles = [
    ...super.styles,
    css`
    `
  ]

  constructor() {
    super({
      examplePuzzle,
      fullPuzzle
    })
  }

  parseInput(input) {
    console.log('The puzzle input raw is:', input)
    return []
  }

  render() {
    const {
      startTime
    } = this
    return html`
      <my-card>
        ${this.puzzleSwitcher(dayTwo2023.adventUrl)}
      </my-card>
      <my-card>
        Actual page content day 2
      </my-card>
      ${this.timeTaken(startTime)}
    `
  }

}

!window.customElements.get(elementName) && window.customElements.define(elementName, DayTwo)
