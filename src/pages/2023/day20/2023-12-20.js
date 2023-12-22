import { css, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import numeral from 'numeral'
import { calcPolygonArea } from '../../../utils/mathHelp'
import { memoize } from '../../../utils/funcHelpers'
import { PuzzleToggleWithLit } from '../../../mixins/puzzleToggle'
import {
  examplePuzzle,
  fullPuzzle,
} from './2023-12-20-puzzle'

/* playground-hide */
const elementName = 'day-twenty-two-three'
export const dayTwenty2023 = {
  tag: elementName,
  title: '2023 Day Twenty',
  path: '#/2023/day-Twenty/',
  codeFileName: '2023-12-20.js',
  adventUrl: 'https://adventofcode.com/2023/day/20',
}
/* playground-hide-end */

class Module {
  constructor({name, destinationModules, prefix}) {
    this.name = name
    this.destinationModules = destinationModules
    this.prefix = prefix
    this.sentPulses = []

    if (name === 'broadcaster') {
      this.isBroadcaster = true
    }

    if (prefix === '%') {
      this.isOn = false
      this.isFlipFlop = true
    }

    if (prefix === '&') {
      this.lastPulse = 0
      this.isConjunction = true
    }
  }

  sendPulse(pulse) {
    // send the result pulse to all destination modules
    // record the pulse in sentPulses
  }

  receivePulse(pulse) {
    // if broadcaster just send to all destination modules

    // if flipflop and received pulse is 1, ignore it
    // if flipflop and received pulse is 0, toggle !this.isOn, if was on, send 0, if was off, send 1

    // if conjunction first remember the pulse as this.lastPulse
    // if all pulses are 1, send 0 to all destination modules
    // if any pulses are 0, send 1 to all destination modules

    // call the sendPulse method with the result pulse
  }
}

export class DayTwenty extends PuzzleToggleWithLit {
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
    console.log('input', input)
    const modules = {}

    const modulesRaw = input.split('\n').map(m => m.trim())

    modulesRaw.forEach(line => {
      const [moduleNameRaw, moduleDataRaw] = line.split(' -> ')
      const prefix = moduleNameRaw.slice(0, 1)
      const moduleName = moduleNameRaw.slice(1)

      const destinationModules = moduleDataRaw.split(',').map(m => m.trim())
      // console.log('destinationModules', destinationModules)
      // console.log('prefix', prefix)
      // console.log('Name', moduleName)
      // console.log('DataRaw', moduleDataRaw)

      if (prefix === 'b') {
        modules[moduleNameRaw] = new Module({
          name: moduleNameRaw,
          destinationModules,
        })
      } else {
        modules[moduleName] = new Module({
          name: moduleName,
          prefix,
          destinationModules,
        })
      }
    })

    console.log('modules', modules)

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
            ${this.puzzleSwitcher(dayTwenty2023.adventUrl)}
          </div>
          <div>
            <div class="d-flex space-evenly child-ml-1">
              <div>The part one<sp-badge>${numeral(0).format('0,0')}</sp-badge></div>
              <div>The part two<sp-badge>${numeral(0).format('0,0')}</sp-badge></div>
            </div>
          </div>
        </div>
      </my-card>
      <my-card label="Part 1">
        ${renderTable([])}
      </my-card>

      ${this.timeTaken(startTime)}
    `
  }
}
!window.customElements.get(elementName) && window.customElements.define(elementName, DayTwenty)
