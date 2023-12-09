import { css, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import numeral from 'numeral'
import { PuzzleToggleWithLit } from '../../../mixins/puzzleToggle'
import {
  examplePuzzle,
  fullPuzzle,
} from './2023-12-4-puzzle'
/* playground-hide */
const elementName = 'day-four-two-three'
export const dayFour2023 = {
  tag: elementName,
  title: '2023 Day Four',
  path: '#/2023/day-four/',
  codeFileName: '2023-12-4.js',
  adventUrl: 'https://adventofcode.com/2023/day/4',
}
/* playground-hide-end */

export class DayFour extends PuzzleToggleWithLit {
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
      fullPuzzle
    })
  }

  parseInput(input) {
    const result = {}
    input.split('\n').forEach((line) => {
      const [cardNameRaw, numbers] = line.split(': ').map((item) => item.trim())
      const [left, right] = numbers.split(' | ').map((item) => item.trim())

      const winningNumbers = left.split(' ').map((item) => Number(item.trim())).filter(item => item !== 0)
      const myNumbers = right.split(' ').map((item) => Number(item.trim())).filter(item => item !== 0)
      const matches = []
      let cardScore = 0

      myNumbers.forEach(number => {
        if (winningNumbers.includes(number)) {
          matches.push(number)

          if (matches.length === 1) {
            cardScore = 1
          } else {
            cardScore *= 2
          }
        }

      })

      const [_, cardName] = cardNameRaw.split(' ').map((item) => item.trim()).filter(item => item)

      result[cardName] = {
        winningNumbers,
        myNumbers,
        matches,
        cardScore,
      }

    })
    return result
  }

  render() {
    const {
      startTime
    } = this

    let totalCardScores = 0
    let totalScratchCards = 0
    let originalCards = {}

    Object.entries(this.puzzle).forEach(([cardName, { matches, cardScore }]) => {
      totalCardScores += cardScore
      originalCards[cardName] = [{ matches, cardScore }]  
    })

    Object.entries(originalCards).forEach(([cardName, instances]) => {
      instances.forEach(({ matches }) => {
        for (let index = 1; index < matches.length + 1; index++) {
          const addToCardName = Number(cardName) + index
          const instanceToCopy = originalCards[addToCardName][0]
          originalCards[addToCardName].push(instanceToCopy)
        }
      })
    })

    Object.entries(originalCards).forEach(([_, instances]) => {
      totalScratchCards += instances.length
    })

    return html`
      <my-card>
        <div class="d-flex-grid justify-between">
          ${this.puzzleSwitcher(dayFour2023.adventUrl)}
        </div>
      </my-card>
      <my-card>
        <table>
          <tr>
            <th>Card</th>
            <th>Matches</th>
            <th>Card Score</th>
            <th>Cards of type Won plus original</th>
          </tr>
          <tbody>
            ${Object.entries(originalCards).map(([cardName, instances]) => {
              const { matches, cardScore } = instances[0]
              return html`
                <tr class=${classMap({
                  'red': matches.length === 0,
                  'green': matches.length > 0,
                })}>
                  <td>Card ${cardName}</td>
                  <td>${matches.length}</td>
                  <td>${cardScore}</td>
                  <td>${numeral(instances.length).format('0,0')}</td>
                </tr>
              `
            })}
            <tr class="total">
              <td>Total</td>
              <td></td>
              <td>${numeral(totalCardScores).format('0,0')}</td>
              <td>${numeral(totalScratchCards).format('0,0')}</td>
            </tr>
          </tbody>
        </table>
      </my-card>
      ${this.timeTaken(startTime)}
    `
  }

}

!window.customElements.get(elementName) && window.customElements.define(elementName, DayFour)
