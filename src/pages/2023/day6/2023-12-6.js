import { css, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import numeral from 'numeral'
import { PuzzleToggleWithLit } from '../../../mixins/puzzleToggle'
import {
  examplePuzzle,
  fullPuzzle,
} from './2023-12-6-puzzle'
/* playground-hide */
const elementName = 'day-six-two-three'
export const daySix2023 = {
  tag: elementName,
  title: '2023 Day Six',
  path: '#/2023/day-six/',
  codeFileName: '2023-12-6.js',
  adventUrl: 'https://adventofcode.com/2023/day/6',
}
/* playground-hide-end */

export class DaySix extends PuzzleToggleWithLit {
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
    const [timeRaw, distancesRaw] = input.split('\n')
    
    const [time, distances] =  [timeRaw, distancesRaw].map(item => {
      const [name, rest] = item.split(':')
      return rest.split(' ').map(item => Number(item.trim())).filter(item => item)
    })

    const [longTime, longDistances] = [timeRaw, distancesRaw].map(item => {
      const [name, rest] = item.split(':')
      return Number(rest.split(' ').map(item => item.trim()).filter(item => item).join(''))
    })

    return {
      time,
      distances,
      longTime,
      longDistances
    }
  }

  render() {
    const {
      startTime
    } = this

    const partOneWaysToWin = {}
    const partTwoWaysToWin = {
      long: []
    }
    let partOneTotal = 0
    let partTwoTotal = 0

    const runRace = (race, milliseconds, goalDistance, winMap) => {
      for (let i = 0; i < milliseconds; i++) {
        const speed = i
        const millisecondsRemaining = milliseconds - i
        const distanceTraveled = speed * millisecondsRemaining

        if (distanceTraveled > goalDistance) {
          winMap[race] = winMap[race] || []
          winMap[race].push(distanceTraveled)
        }
      }
    }

    this.puzzle?.time?.forEach((milliseconds, index) => {
      const race = index + 1
      const goalDistance = this.puzzle?.distances[index]
      runRace(race, milliseconds, goalDistance, partOneWaysToWin)
    })


    partOneTotal = Object.values(partOneWaysToWin).reduce((acc, item) => {
      return acc * item.length
    }, 1)

    if (this.puzzle?.longTime && this.puzzle?.longDistances) {
      runRace('long', this.puzzle?.longTime, this.puzzle?.longDistances, partTwoWaysToWin)
    }

    partTwoTotal = partTwoWaysToWin.long.length

    const renderTable = (waysToWin, total) => {
      return html`
        <table>
          <thead>
            <th>Race</th>
            <th>Ways</th>
          </thead>
          <tbody>
            ${Object.entries(waysToWin).map(([race, winningDistances]) => {
              return html`
                <tr class="green">
                  <td>#${race}</td>
                  <td>${numeral(winningDistances.length).format('0,0')}</td>
                </tr>
              `
            })}
            <tr class="total">
              <td>Total</td>
              <td>${numeral(total).format('0,0')}</td>
            </tr>
          </tbody>
        </table>
      `
    }

    return html`
      <div class="d-flex-grid">
        <my-card>
          ${this.puzzleSwitcher(daySix2023.adventUrl)}
        </my-card>
        <my-card label="Part One">
          Part One
          ${renderTable(partOneWaysToWin, partOneTotal)}
        </my-card>
        <my-card label="Part two">
          Part Two
          ${renderTable(partTwoWaysToWin, partTwoTotal)}
        </my-card>
      </div>
      ${this.timeTaken(startTime)}
    `
  }

}

!window.customElements.get(elementName) && window.customElements.define(elementName, DaySix)
