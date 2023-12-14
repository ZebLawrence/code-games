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

const pivotTable = (pattern) => {
  const result = Array(pattern[0].length).fill('')
  for (const row of pattern) {
      [...row].forEach((char, i) => result[i] += char)
  }
  return result
}

const compareBothDirections = (pattern, rowIndex) => {
  const startLeft = rowIndex - 1
  for (
    let left = startLeft, right = rowIndex;
    left >= 0 && right < pattern.length;
    left--, right++
  ) {
      if (pattern[left] !== pattern[right]){
        return false
      }
  }
  return true
}

const compareSmudges = (pattern, rowIndex) => {
  let smudgeRowIndex = NaN
  let smudgeColIndex = NaN

  for (let left = rowIndex - 1, right = rowIndex; left >= 0
    && right < pattern.length; left--, right++) {
    const patternLeft = pattern[left]
    const patternRight = pattern[right]

    for (let charIndex = 0; charIndex < patternLeft.length; charIndex++) {
      if (patternLeft[charIndex] !== patternRight[charIndex]) {
        if (!isNaN(smudgeRowIndex)) {
          return
        };
        smudgeRowIndex = left
        smudgeColIndex = charIndex
      }
    }
  }

  if (!isNaN(smudgeRowIndex)) {
    return {
      row: smudgeRowIndex,
      col: smudgeColIndex,
    }
  }
}

export class DayThirteen extends PuzzleToggleWithLit {
  static properties = {
    ...super.properties,
  }
/* playground-hide */
  static styles = [
    ...super.styles,
    css`
      .vert{
        border-left: 2px solid blue;
      }
      .horz{
        border-top: 2px solid blue;
      }
      table td{
        padding: 0.0em;
        font-size: 0.8em;
        vertical-align: middle;
        max-height: 0.8em;
      }
    `
  ]
/* playground-hide-end */

  constructor() {
    super({
      examplePuzzle,
      fullPuzzle,
    })
  }

  parseInput(input) {
    //console.log('input', input)
    const patternsRaw = input.trim().split('\n\n').map(m => m.split('\n'))
    const mirrorsPartOne = []
    const mirrorsPartTwo = []
    let totalPartOne = 0
    let totalPartTwo = 0

    for (const pattern of patternsRaw) {
      for (let i = 1; i < pattern.length; i++) {
        if (compareBothDirections(pattern, i)) {
          mirrorsPartOne.push({ pattern, direction: 'horizontal', position: i })
          totalPartOne += 100 * i
        }

        const smudge = compareSmudges(pattern, i)
        if (smudge) {
          mirrorsPartTwo.push({ pattern, direction: 'horizontal', position: i, smudge })
          totalPartTwo += 100 * i
        }
      }

      const pivoted = pivotTable(pattern)
      for (let i = 1; i < pivoted.length; i++) {
        if (compareBothDirections(pivoted, i)) {
          mirrorsPartOne.push({ pattern, direction: 'vertical', position: i })
          totalPartOne += i
        }

        const smudge = compareSmudges(pivoted, i)
        if (smudge) {
          mirrorsPartTwo.push({ pattern, direction: 'vertical', position: i, smudge })
          totalPartTwo += i
        }
      }
    }

    return {
      mirrorsPartOne,
      mirrorsPartTwo,
      totalPartOne,
      totalPartTwo,
      patternsRaw,
    }
  }

  render() {
    const {
      startTime,
    } = this

    console.log('this.puzzle', this.puzzle)
    const {
      mirrorsPartOne,
      mirrorsPartTwo,
      totalPartOne,
      totalPartTwo,
    } = this.puzzle

    const renderTable = mirrors => {
      return mirrors && mirrors.map(({ pattern, direction, position, smudge }) => {
        const { col, row } = smudge || {}
        return html`
          <table class="table mirrors mx-1 small-shadow">
            ${pattern.map((line, rowIndex) => {
              return html`
                <tr>
                  ${line.split('').map((char, colIndex) => {
                    const isMirrorVert = direction === 'vertical' && (colIndex === position)
                    const isMirrorHorz = direction === 'horizontal' && (rowIndex === position)
                    const isSmudge = colIndex === col && rowIndex === row
                    const classes = {
                      vert: isMirrorVert,
                      horz: isMirrorHorz,
                      black: !isSmudge,
                      red: isSmudge,
                    }
                    return html`
                      <td class=${classMap(classes)}>${char === '.' ? '-' : '@'}</td>
                    `
                  })}
                </tr>
              `
            })}
          </table>
        `
      })
    }

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
            <div class="d-flex space-evenly child-ml-1 mt-1">
              <div><sp-badge class="blue">Mirror Center</sp-badge></div>
              <div><sp-badge class="red">Smudge Location</sp-badge></div>
            </div>
          </div>
        </div>
      </my-card>
      <my-card label="part one">
        <div class="d-flex space-evenly flex-wrap">
          ${renderTable(mirrorsPartOne)}
        </div>
      </my-card>
      <my-card label="part two">
        <div class="d-flex space-evenly flex-wrap">
          ${renderTable(mirrorsPartTwo)}
        </div>
      </my-card>
      ${this.timeTaken(startTime)}
    `

  }
}
!window.customElements.get(elementName) && window.customElements.define(elementName, DayThirteen)
