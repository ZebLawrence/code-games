import { css, html } from 'lit'
import { PuzzleToggleWithLit } from '../../../mixins/puzzleToggle'
import { addNumbers } from '../../../utils/mathHelp'
import {
  examplePartOne,
  fullPuzzle,
  numbersNames,
  examplePartTwo,
  partOneExpectedTotal,
  expectedPartOneCalibration,
  partTwoExpectedTotal,
  expectedPartTwoCalibration
} from './2023-12-1-puzzle'

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
/* playground-hide */
  static styles = [
    ...super.styles,
    css`
    `
  ]
/* playground-hide-end */

  constructor() {
    super({
      examplePartOne,
      examplePartTwo,
      fullPuzzle
    })
    this.selectedPuzzle = 'examplePartOne'
  }
  
  parseInput(input) {
    const parsedInput = input.split('\n')
    return parsedInput
  }

  render() {
    const {
      startTime,
      isPart2
    } = this

    const calibrationNumbers = []
    let totalPartOne = 0

    this.puzzle.forEach((line, index) => {
      let leftNumber = 0
      let rightNumber = 0
      let pointer = 0

      while (pointer < line.length) {
        const firstChar = line[pointer]
        const lastChar = line[line.length - (pointer + 1)]
        const leftSide = line.substring(0, pointer + 1)
        const rightSide = line.substring(line.length - (pointer + 1), line.length)

        // check if first char is a number
        if (!isNaN(firstChar) && leftNumber === 0) {
          leftNumber = firstChar
        }
        
        if (!isNaN(lastChar) && rightNumber === 0) {
          rightNumber = lastChar
        }

        // break out if we have it
        if (leftNumber !== 0 && rightNumber !== 0) {
          calibrationNumbers.push(Number(`${leftNumber}${rightNumber}`))
          return
        }

        if(isPart2) {
          // check if one of the names is in the left side
          numbersNames.forEach((name, index) => {
            if (leftSide.includes(name) && leftNumber === 0) {
              leftNumber = index
            }
            if (rightSide.includes(name) && rightNumber === 0) {
              rightNumber = index
            }
          })
  
          // break out if we have it
          if (leftNumber !== 0 && rightNumber !== 0) {
            calibrationNumbers.push(Number(`${leftNumber}${rightNumber}`))
            return
          }
        }

        pointer++
      }
    })

    if(calibrationNumbers.length > 0) {
      totalPartOne = addNumbers(calibrationNumbers)
    }

    return html`
      <my-card >
        <div class="d-flex space-between">
          <div>
            ${this.puzzleSwitcher(dayOne2023.adventUrl)}
          </div>
          <div>
            <sp-button size="s" quiet @click=${this.togglePart}>Toggle Part</sp-button>
          </div>
          <div>Expected total part 1: ${partOneExpectedTotal}</div>
          <div>Expected total part 2: ${partTwoExpectedTotal}</div>
        </div>
      </my-card>
      <my-card>
        ${isPart2
          ? html`<div>The total Part 2 calibration is: ${totalPartOne}</div>`
          : html`<div>The total Part 1 calibration is: ${totalPartOne}</div>`
        }
      </my-card>
      <my-card>
        <table>
          <thead>
            <tr>
              <th>RAW</th>
              <th>Result</th>
              <th>Expected</th>
            </tr>
          </thead>
          <tbody>
            ${this.puzzle.map((line, index) => {
              return html`
                <tr>
                  <td>${this.puzzle[index]}</td>
                  <td>${calibrationNumbers[index]}</td>
                  ${isPart2
                    ? html `<td>${expectedPartTwoCalibration[index]}</td>`
                    : html`<td>${expectedPartOneCalibration[index]}</td>`}
                </tr>
              `
            })}
            <tr class="total">
              <td>Total</td>
              <td>${totalPartOne}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </my-card>
      ${this.timeTaken(startTime)}
    `
  }
}

!window.customElements.get(elementName) && window.customElements.define(elementName, DayOne)
