import { css, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import { PuzzleToggleWithLit } from '../../../mixins/puzzleToggle'
import { addNumbers } from '../../../utils/mathHelp'
import {
  examplePuzzle,
  fullPuzzle
} from './2023-12-2-puzzle'
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
      .small-shadow{
        min-width: 25px;
        border-radius: 5px;
      }
    `
  ]

  constructor() {
    super({
      examplePuzzle,
      fullPuzzle
    })
  }

  parseInput(input) {
    const result = {}
    const games = input.split('\n').map(gameLine => {
      const [game, pulls] = gameLine.split(':')
      const [_, gameNumber] = game.split(' ').map(s => s.trim())
      const colorSets = pulls.split(';')
      result[Number(gameNumber)] = {
        draws: colorSets.map(colorSet => {
          const cubes = colorSet.split(',').map(c => c.trim())
          const cubeObject = {}
          cubes.forEach(cube => {
            const [count, color] = cube.split(' ').map(s => s.trim())
            cubeObject[color] = Number(count)
          })
          return cubeObject
        })
      }
    })

    return result
  }

  render() {
    const {
      startTime
    } = this

    const loadedMap = {
      red: 12,
      green: 13,
      blue: 14,
    }

    const allGames = []
    const invalidGames = []
    const gamePowers = []

    Object.entries(this.puzzle).forEach(([gameNumber, { draws }]) => {
      const gameNumberInt = Number(gameNumber)
      let maxRed = 0
      let maxGreen = 0
      let maxBlue = 0

      allGames.push(gameNumberInt)
      draws.forEach(draw => {

        Object.entries(draw).forEach(([color, count]) => {
          
          if (color === 'red') {
            maxRed = Math.max(maxRed, count)
          }

          if (color === 'green') {
            maxGreen = Math.max(maxGreen, count)
          }

          if (color === 'blue') {
            maxBlue = Math.max(maxBlue, count)
          }

          if (loadedMap[color] < count && invalidGames.indexOf(gameNumberInt) === -1) {
            invalidGames.push(gameNumberInt)
          }
        })
      })

      gamePowers.push(maxRed * maxGreen * maxBlue)
    })

    const possibleGames = allGames.filter(game => invalidGames.indexOf(game) === -1)
    const totalPossibleScore = possibleGames.length > 0 && addNumbers(possibleGames)
    const totalInvalidScore = invalidGames.length > 0 && addNumbers(invalidGames)
    const totalGamePowers = gamePowers.length > 0 && addNumbers(gamePowers)

    return html`
      <my-card>
        <div class="d-flex-grid justify-between">
          ${this.puzzleSwitcher(dayTwo2023.adventUrl)}
          <sp-badge class="red" size="l">Max Red: ${loadedMap.red}</sp-badge>
          <sp-badge class="green" size="l">Max Green: ${loadedMap.green}</sp-badge>
          <sp-badge class="blue" size="l">Max Blue: ${loadedMap.blue}</sp-badge>
        </div>
      </my-card>
      <my-card>
        <div class="table-container">
          <table>
            <thead>
              <tr  class="total">
                <th>Game</th>
                <th>Impossible</th>
                <th>Possible</th>
                <th>Power Score</th>
                <th>Draws</th>
              </tr>
            </thead>
            <tbody>
              ${allGames.map(game => {
                const invalid = invalidGames.indexOf(game) !== -1
                const valid = possibleGames.indexOf(game) !== -1
                const gamePower = gamePowers[game - 1]
                const { draws } = this.puzzle[game]
  
                return html`
                  <tr class=${classMap({ valid, invalid })}>
                    <td>${game}</td>
                    <td>${invalid ? `Impossible ${game}` : ''}</td>
                    <td>${valid ? `Possible ${game}` : ''}</td>
                    <td>${gamePower}</td>
                    <td>
                      ${draws.map((draw, index) => {
                        return html`
                          <div class="d-flex">
                            <span class="mr-1">Draw: ${index + 1}</span>
                            ${Object.entries(draw).map(([color, count]) => {
                              return html`
                                <div class="d-flex">
                                  ${Array(count).fill().map((_, i) => {
                                    return html`<div class="small-shadow ${color}">${i + 1}</div>`
                                  })}
                                </div>
                              `
                            })}
                          </div>
                        `
                      })}
                    </td>
                  </tr>
                `
              })}
              <tr class="total">
                <td>Total</td>
                <td>${totalInvalidScore}</td>
                <td>${totalPossibleScore}</td>
                <td>${totalGamePowers}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </my-card>
      ${this.timeTaken(startTime)}
    `
  }

}

!window.customElements.get(elementName) && window.customElements.define(elementName, DayTwo)
