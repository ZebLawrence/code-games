import { html } from 'lit'
import { PuzzleToggleWithLit } from '../../../mixins/puzzleToggle'
import { examplePuzzle, fullPuzzle } from './2020-12-1-puzzle'

/* playground-hide */
const elementName = 'day-one-two-zero'

export const dayOne2020 = {
  tag: elementName,
  title: '2020 Day One',
  path: '#/2020/day-one/',
  codeFileName: '2020-12-1.js',
  adventUrl: 'https://adventofcode.com/2020/day/1',
}
/* playground-hide-end */

export class DayOne extends PuzzleToggleWithLit {
  static properties = {
    ...super.properties,
  }
  
  static styles = [...super.styles]
  
  parseInput(raw) {
    return raw.split('\n').map(Number)
  }

  constructor() {
    super({
      examplePuzzle,
      fullPuzzle,
    })
  }
  
  render() {
    const {
      puzzle
    } = this

    let pair2020 = []
    let three2020 = []
    let totalPart1 = 0;
    let totalPart2 = 0;

    for (let index = 0; index < puzzle.length; index++) {
      const num1 = puzzle[index];

      for (let index2 = 0; index2 < puzzle.length; index2++) {
        const num2 = puzzle[index2];
        
        if (index !== index2 && (num1 + num2 === 2020)) {
          pair2020 = [num1, num2]
          totalPart1 = num1 * num2
        }

        for (let index3 = 0; index3 < puzzle.length; index3++) {
          const num3 = puzzle[index3];
          
          if (index !== index2
            && index2 !== index3
            && index3 !== index
            && (num1 + num2 + num3 === 2020) ) {
              three2020 = [num1, num2, num3]
              totalPart2 = num1 * num2 * num3
            }
        }
      }
    }

    return html`
      <div class="d-flex-grid">
        <my-card>
          ${this.puzzleSwitcher(dayOne2020.adventUrl)}
        </my-card>
        <my-card label="Part 1">
          ${this.badge('Pair found')}
          <pre>${JSON.stringify(pair2020, null, 2)}</pre>
          ${this.badge('Total')}
          <pre>${totalPart1}</pre>
        </my-card>
        <my-card label="Part 2">
          ${this.badge('Three found')}
          <pre>${JSON.stringify(three2020, null, 2)}</pre>
          ${this.badge('Total')}
          <pre>${totalPart2}</pre>
        </my-card>
      </div>
      ${this.timeTaken(this.startTime)}
    `
  }

}

!window.customElements.get(elementName) && window.customElements.define(elementName, DayOne)
