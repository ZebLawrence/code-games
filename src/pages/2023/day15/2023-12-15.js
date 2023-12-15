import { css, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import numeral from 'numeral'
import { addNumbers } from '../../../utils/mathHelp'
import { PuzzleToggleWithLit } from '../../../mixins/puzzleToggle'
import {
  examplePuzzle,
  fullPuzzle,
} from './2023-12-15-puzzle'

/* playground-hide */
const elementName = 'day-fifteen-two-three'
export const dayFifteen2023 = {
  tag: elementName,
  title: '2023 Day Fifteen',
  path: '#/2023/day-Fifteen/',
  codeFileName: '2023-12-15.js',
  adventUrl: 'https://adventofcode.com/2023/day/15',
}
/* playground-hide-end */

const hashAlgorithm = chars => {
  let hashResult = 0

  for (let index = 0; index < chars.length; index++) {
    const asciiCode = chars.charCodeAt(index)
    hashResult += asciiCode
    hashResult *= 17
    hashResult %= 256
  }
  return hashResult
}

const indexOfLens = (box, lens) => {
  const [targetLabel] = lens
  for (let i = 0; i < box.length; i++) {
    const [label] = box[i]
    if (label === targetLabel) {
      return i
    }
  }
  return -1
}

export class DayFifteen extends PuzzleToggleWithLit {
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
    this.selectedPuzzle = 'fullPuzzle'
  }

  parseInput(input) {
    console.log('input', input)
    let hashTotal = 0
    let focusLensTotal = 0
    const boxes = Array.apply(null, Array(256)).map((y, i) => { return []; });

    const steps = input.split(',').map(x => x.trim()).map(step => {
      const entireStepHash = hashAlgorithm(step)
      let lensLabel = null
      let focalLength = null
      let operation = null
      if(step.includes('=')) {
        [lensLabel, focalLength] = step.split('=')
        operation = '='
      } else if(step.includes('-')) {
        [lensLabel, focalLength] = step.split('-')
        operation = '-'
      }

      const newLens = [lensLabel, Number(focalLength)]
      const boxIndex = hashAlgorithm(lensLabel)
      const lensIndex = indexOfLens(boxes[boxIndex], newLens)

      if (operation === '=') {
        //update or add to the box
        if (lensIndex === -1) {
          boxes[boxIndex].push(newLens)
        } else {
          boxes[boxIndex][lensIndex] = newLens
        }
      } else if (operation === '-') {
        //remove from the box
        if (lensIndex !== -1) {
          boxes[boxIndex].splice(lensIndex, 1)
        }
      }

      return {
        stepHash: entireStepHash,
        step,
      }
    })

    hashTotal = addNumbers(steps.map(step => step.stepHash))
    boxes.forEach((box, index) => {
      let boxTotal = 0
      const boxNumber = index + 1
      box.forEach((lens, lIndex) => {
        const slotNumber = lIndex + 1
        const [, focalLength] = lens
        boxTotal += boxNumber * slotNumber * focalLength
      })
      focusLensTotal += boxTotal
      box.push(['boxTotal', boxTotal])
    })

    return {
      boxes,
      steps,
      hashTotal,
      focusLensTotal,
    }
  }

  render() {
    const {
      startTime,
    } = this

    const {
      boxes,
      steps,
      hashTotal,
      focusLensTotal,
    } = this.puzzle

    const renderTable = table => {
      return html`
        <table>
          <thead>
            <tr>
              <th>Box</th>
              <th>Lens</th>
            </tr>
          </thead>
          ${table.map((row, rowIndex) => {
            return html`
              <tr>
                <td>${rowIndex + 1}</td>
                <td>
                  <div class="d-flex items-center">
                    ${row.map((col, colIndex) => {
                      const [label, focalLength] = col
                      const isBoxTotal = label === 'boxTotal'
                      return html`
                        ${colIndex > 0 ? '➡️' : ''}
                        <sp-tags class=${classMap({
                            red: isBoxTotal,
                            blue: !isBoxTotal,
                          })}>
                          <sp-tag ?invalid=${isBoxTotal}>${label}</sp-tag>
                          ${
                            isBoxTotal
                              ? html`<sp-badge size="s">${focalLength}</sp-badge>`
                              : html`<sp-tag>${focalLength}</sp-tag>`
                          }
                        </sp-tags>
                      `
                    })}
                  </div>
                </td>
              </tr>
            `
          })}
          <tr class="total">
            <td>total</td>
            <td>${numeral(focusLensTotal).format('0,0')}</td>
          </tr>
        </table>
      `
    }

    return html`
      <my-card>
        <div class="d-flex center">
          <div>
            ${this.puzzleSwitcher(dayFifteen2023.adventUrl)}
          </div>
          <div>
            <div class="d-flex space-evenly child-ml-1">
              <div>The part one<sp-badge>${numeral(hashTotal).format('0,0')}</sp-badge></div>
              <div>The part two<sp-badge>${numeral(focusLensTotal).format('0,0')}</sp-badge></div>
            </div>
          </div>
        </div>
      </my-card>
      <my-card>
        ${renderTable(boxes || [])}
      </my-card>
      ${this.timeTaken(startTime)}
    `
  }
}
!window.customElements.get(elementName) && window.customElements.define(elementName, DayFifteen)
