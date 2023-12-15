import { css, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import numeral from 'numeral'
import { pivotTable, rotateTable } from '../../../utils/funcHelpers'
import { PuzzleToggleWithLit } from '../../../mixins/puzzleToggle'
import {
  examplePuzzle,
  fullPuzzle,
} from './2023-12-14-puzzle'

/* playground-hide */
const elementName = 'day-fourteen-two-three'
export const dayFourteen2023 = {
  tag: elementName,
  title: '2023 Day Fourteen',
  path: '#/2023/day-fourteen/',
  codeFileName: '2023-12-14.js',
  adventUrl: 'https://adventofcode.com/2023/day/14',
}
/* playground-hide-end */

const getIndexFromLeft = (row, startIndex) => {
  for (let i = startIndex; i < row.length; i++) {
    const char = row[i]
    if ((char === '.' || char === 'O') && (!row[i + 1] || row[i + 1] === 'O' || row[i + 1] === '#')) {
      return i
    }
  }
  return false
}

const moveRocksRight = (row) => {
  const newRow = [...row]
  for (let i = row.length - 1; i >= 0; i--) {
    const char = row[i]
    if (char === 'O') {
      const newIndex = getIndexFromLeft(newRow, i)

      if (newIndex !== false) {
        newRow[i] = '.'
        newRow[newIndex] = char
      }
    }
  }
  return newRow
}

export class DayFourteen extends PuzzleToggleWithLit {
  static properties = {
    ...super.properties,
  }
/* playground-hide */
  static styles = [
    ...super.styles,
    css`
      table td{
        padding: 0.1em;

      }
    `
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
    // console.log('input', input)
    const panel = input.split('\n').map((line) => {
      return line.split('').map(s => s.trim())
    })

    const pivoted = rotateTable(panel)
    
    // part one
    const result = []
    let rocksTotal = 0
    for (let rowIndex = 0; rowIndex < pivoted.length; rowIndex++) {
      const row = pivoted[rowIndex]
      result[rowIndex] = moveRocksRight([...row])
      result[rowIndex].forEach((char, index) => {
        if (char === 'O') {
          rocksTotal += index + 1
        }
      })
    }

    const processTable = (table) => {
      const result = []
      for (let rowIndex = 0; rowIndex < table.length; rowIndex++) {
        const row = table[rowIndex]
        result[rowIndex] = moveRocksRight([...row])
      }
      return result
    }

    // part two
    let scores = []
    let diffs = []
    let final = [...pivoted]
    let partTwoRocksTotal = 0
    const steps = 300

    for (let index = 0; index < steps; index++) {
      if (index % 10000 === 0) {
        console.log('cycle', index)
      }
      const north =  processTable([...final])
      const west = processTable(rotateTable([...north]))
      const south = processTable(rotateTable([...west]))
      const east = processTable(rotateTable([...south]))
      const rightSideUp = rotateTable([...east])

      final = rightSideUp
      let stepTotal = 0
      final.forEach((row, rowIndex) => {
        row.forEach((char, colIndex) => {
          if (char === 'O') {
            stepTotal += colIndex + 1
          }
        })
      })

      if(scores.indexOf(stepTotal) > -1) {
        diffs.push([index, index - scores.indexOf(stepTotal)])
        // Check to see if the last couple diffs have the same second value
        // is true then break
      }
      scores.push(stepTotal)
    }

    final.forEach((row, rowIndex) => {
      row.forEach((char, colIndex) => {
        if (char === 'O') {
          partTwoRocksTotal += colIndex + 1
        }
      })
    })
    // console.log('steps', steps)
    // console.log('partTwoRocksTotal', partTwoRocksTotal)
    // console.log('diffs', diffs.join('\n'))
    // console.log('scores', scores.join('\n'))
    // DO this math on the resulting diffs
    // (1000000000 - 150) % 42 

    return { result, rocksTotal }
  }

  render() {
    const {
      startTime,
    } = this
    let totalPartOne = 0
    let totalPartTwo = 0
    const {
      result,
      rocksTotal,
    } = this.puzzle


    const renderTable = table => {
      return html`
        <table>
          ${table.map((row, rowIndex) => {
            return html`
              <tr>
                ${row.map((col, colIndex) => {
                  return html`
                    <td>${col}</td>
                  `
                })}
              </tr>
            `
          })}
        </table>
      `
    }

    return html`
      <my-card>
        <div class="d-flex center">
          <div>
            ${this.puzzleSwitcher(dayFourteen2023.adventUrl)}
          </div>
          <div>
            <div class="d-flex space-evenly child-ml-1">
              <div>The part one<sp-badge>${numeral(rocksTotal).format('0,0')}</sp-badge></div>
              <div>The part two<sp-badge>${numeral(totalPartTwo).format('0,0')}</sp-badge></div>
            </div>
          </div>
        </div>
      </my-card>
      <my-card>
        ${renderTable(result || [])}
      </my-card>
      ${this.timeTaken(startTime)}
    `
  }
}
!window.customElements.get(elementName) && window.customElements.define(elementName, DayFourteen)
