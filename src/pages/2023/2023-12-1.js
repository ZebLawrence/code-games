import { css, html } from 'lit'
import { PuzzleToggleWithLit } from '../../mixins/puzzleToggle'
import { examplePuzzle, fullPuzzle } from './puzzles/2023-12-1-puzzle'

/* playground-hide */
const elementName = 'day-one-two-three'
export const dayOne2023 = {
  tag: elementName,
  title: '2023 Day One',
  path: '#/2023/day-one/',
  codeFileName: '2023-12-1.js',
  adventUrl: 'https://adventofcode.com/2023/day/1',
}
/* playground-hide-end */

export class DayOne extends PuzzleToggleWithLit {
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
      startTime,
    } = this

    return html`
      <my-card>
        ${this.puzzleSwitcher(dayOne2023.adventUrl)}
      </my-card>
      <my-card>
        Actual page content day 1
      </my-card>
      ${this.timeTaken(startTime)}
    `
  }
}

!window.customElements.get(elementName) && window.customElements.define(elementName, DayOne)
