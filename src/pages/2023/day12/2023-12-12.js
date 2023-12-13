import { css, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import numeral from 'numeral'
import { addNumbersDeep, toNumber } from '../../../utils/mathHelp'
import { memoize } from '../../../utils/funcHelpers'
import { PuzzleToggleWithLit } from '../../../mixins/puzzleToggle'
import {
  examplePuzzle,
  fullPuzzle,
} from './2023-12-12-puzzle'

/* playground-hide */
const elementName = 'day-twelve-two-three'
export const dayTwelve2023 = {
  tag: elementName,
  title: '2023 Day Twelve',
  path: '#/2023/day-Twelve/',
  codeFileName: '2023-12-12.js',
  adventUrl: 'https://adventofcode.com/2023/day/12',
}
/* playground-hide-end */

const permutationCounts = memoize((line, groups) => {
  if (line.length === 0) {
    if (groups.length === 0) {
      return 1
    }
    return 0
  }

  if (groups.length === 0) {
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '#') {
        return 0
      }
    }
    return 1
  }

  if (line.length < addNumbersDeep(groups) + groups.length - 1) {
    // The line is not long enough for all groups
    return 0
  }

  if (line[0] === '.') {
    return permutationCounts(line.slice(1), groups)
  }

  if (line[0] === '#') {
    const [firstGroup, ...leftoverGroups] = groups
    for (let i = 0; i < firstGroup; i++) {
      if (line[i] === '.') {
        return 0
      }
    }

    if (line[firstGroup] === '#') {
      return 0
    }

    return permutationCounts(line.slice(firstGroup + 1), leftoverGroups)
  }

  return (
    // if at this point the first character is a '?'
    // add a # version and a . version
    // and add the results of those two together
    // checking both scenarios at the same time
    permutationCounts('#' + line.slice(1), groups) + permutationCounts('.' + line.slice(1), groups)
  )
})

export class DayTwelve extends PuzzleToggleWithLit {
  static properties = {
    ...super.properties,
    expansionFactor: { type: Number },
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
    // console.log('input', input)

    return input.split('\n').map((line) => {
      const [springs, springCountsRaw] = line.split(' ')
      const springCounts = springCountsRaw.split(',').map(toNumber)

      return {
        springCountsPartOne: [...springCounts],
        springCountsPartTwo: [...springCounts, ...springCounts, ...springCounts, ...springCounts, ...springCounts],
        springsPart1: springs,
        springsPart2: [springs, springs, springs, springs, springs].join('?'),
      }
    })
  }

  render() {
    const {
      startTime,
    } = this

    let arrangementsPartOne = 0
    let arrangementsPartTwo = 0
    
    
    if (this.puzzle && this.puzzle.length > 0) {
      this.puzzle.forEach(({
          springsPart1,
          springsPart2,
          springCountsPartOne,
          springCountsPartTwo,
        }) => {

        arrangementsPartOne += permutationCounts(springsPart1, springCountsPartOne)
        arrangementsPartTwo += permutationCounts(springsPart2, springCountsPartTwo)
      })
    }
    console.log('arrangementsPartTwo', arrangementsPartTwo)
    return html`
      <my-card>
        <div class="d-flex center">
          <div>
            ${this.puzzleSwitcher(dayTwelve2023.adventUrl)}
          </div>
          <div>
            <div class="d-flex space-evenly child-ml-1">
              <div>The part one<sp-badge>${numeral(arrangementsPartOne).format('0,0')}</sp-badge></div>
              <div>The part two<sp-badge>${numeral(arrangementsPartTwo).format('0,0')}</sp-badge></div>
            </div>
          </div>
        </div>
      </my-card>
      ${this.timeTaken(startTime)}
    `

  }
}
!window.customElements.get(elementName) && window.customElements.define(elementName, DayTwelve)
