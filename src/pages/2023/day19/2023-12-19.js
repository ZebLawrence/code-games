import { css, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import numeral from 'numeral'
import { calcPolygonArea } from '../../../utils/mathHelp'
import { memoize } from '../../../utils/funcHelpers'
import { PuzzleToggleWithLit } from '../../../mixins/puzzleToggle'
import {
  examplePuzzle,
  fullPuzzle,
} from './2023-12-19-puzzle'

/* playground-hide */
const elementName = 'day-nineteen-two-three'
export const dayNineteen2023 = {
  tag: elementName,
  title: '2023 Day Nineteen',
  path: '#/2023/day-Nineteen/',
  codeFileName: '2023-12-19.js',
  adventUrl: 'https://adventofcode.com/2023/day/19',
}
/* playground-hide-end */


export class DayNineteen extends PuzzleToggleWithLit {
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
  }

  parseInput(input) {
    //console.log('input', input)
    const [workFlowRaw, partsRaw] = input.split('\n\n')

    const workFlows = {}
    workFlowRaw.split('\n').forEach(row => {
      const [workFlowName, rulesRaw] = row.split('{')
      // console.log('workFlowName', workFlowName)

      workFlows[workFlowName] = rulesRaw.replace('}', '').split(',').map(rule => {
        let rating
        let result
        if (rule.includes(':')) {
          [rating, result] = rule.split(':').map(item => item.trim())
          // console.log('rating', rating)
          // console.log('result', result)
        } else {
          result = rule.trim()
        }

        return {
          rating,
          result,
        }
      })
    })

    const parts = []
    partsRaw.split('\n').forEach(row => {
      const props = row.replace('{', '').replace('}', '').split(',').map(item => item.trim())
      // console.log('props', props)
      const part = {}
      props.forEach(prop => {
        const [propName, propValue] = prop.split('=').map(item => item.trim())
        part[propName] = Number(propValue)
      })
      parts.push(part)
    })

    // console.log('workFlows', workFlows)
    // console.log('parts', parts)

    const accepted = []
    const rejected = []

    const processWorkFlow = (workFlow, part) => {

      for (let index = 0; index < workFlow.length; index++) {
        const step = workFlow[index];
        const { x, m, a, s } = part
        const { rating, result } = step
        //console.log('step', step)
        //console.log('part', part)

        if (!rating && result) {
          if (result === 'A') {
            //console.log('Accepted', part)
            accepted.push(part)
            break
          } else if (result === 'R') {          
            //console.log('Rejected', part)
            rejected.push(part)
            break
          } else {
            //console.warn('calling next workflow', result)
            processWorkFlow(workFlows[result], part)
            break
          }
        } else {

          if (rating && eval(rating)) {
            //console.log('Eval', rating,'was true, result:', result, 'part:', part)
    
            if (result === 'A') {
              //console.log('Accepted', part)
              accepted.push(part)
              break
            } else if (result === 'R') {
              //console.log('Rejected', part)
              rejected.push(part)
              break
            } else {
              //console.warn('calling next workflow', result)
              processWorkFlow(workFlows[result], part)
              break
            }
          } else {
            //console.warn('Eval', rating,'was false, result:', result, 'part:', part)
          }
        }
      }
    }

    parts.forEach(part => {
      const { x, m, a, s } = part
      processWorkFlow(workFlows.in, part)
    })

    console.log('accepted', accepted)
    console.log('rejected', rejected)

    let totalPartOne = 0
    accepted.forEach(part => {
      const partTotal = Object.values(part).reduce((acc, cur) => acc + cur, 0)
      // console.log('partTotal', partTotal)
      totalPartOne += partTotal
    })

    console.log('totalPartOne', totalPartOne)
    return {}
  }

  render() {
    const {
      startTime,
    } = this

    console.log('this.puzzle', this.puzzle)


    const renderTable = data => {
      return html`
        <table>
          ${data && data.map((row, rowIndex) => {
            return html`
              <tr>
                ${row.map((col, colIndex) => {
                  let cell = col
                  return html`
                    <td class="black">${cell}</td>
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
            ${this.puzzleSwitcher(dayNineteen2023.adventUrl)}
          </div>
          <div>
            <div class="d-flex space-evenly child-ml-1">
              <div>The part one<sp-badge>${numeral(0).format('0,0')}</sp-badge></div>
              <div>The part two<sp-badge>${numeral(0).format('0,0')}</sp-badge></div>
            </div>
          </div>
        </div>
      </my-card>
      <my-card label="Canvas">
        <canvas id="canvas" width="500" height="500"></canvas>
      </my-card>
      <my-card label="Part 1">
        ${renderTable([])}
      </my-card>

      ${this.timeTaken(startTime)}
    `
  }
}
!window.customElements.get(elementName) && window.customElements.define(elementName, DayNineteen)
