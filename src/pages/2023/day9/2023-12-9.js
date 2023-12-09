import { css, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import numeral from 'numeral'
import { PuzzleToggleWithLit } from '../../../mixins/puzzleToggle'
import {
  examplePuzzle,
  fullPuzzle,
} from './2023-12-9-puzzle'

/* playground-hide */
const elementName = 'day-nine-two-three'
export const dayNine2023 = {
  tag: elementName,
  title: '2023 Day Nine',
  path: '#/2023/day-nine/',
  codeFileName: '2023-12-8.js',
  adventUrl: 'https://adventofcode.com/2023/day/8',
}
/* playground-hide-end */


const buildNextTreeLevel = (previousLevel, newTree) => {
  const newLevel = []

  for (let index = (previousLevel.length - 1); index > 0; index--) {
    const right = previousLevel[index]
    const left = previousLevel[index - 1]
    let difference = Math.abs(left - right)
    if(left > right) {
      difference = difference * -1
    }

    if(left < right) {
      difference = difference * 1
    }
    newLevel.unshift(difference)
  }
  newTree.push(newLevel)
  const levelTotal = newLevel.filter(item => item !== 0)
  if (levelTotal.length === 0) {
    return
  } else {
    buildNextTreeLevel(newLevel, newTree)
  }
}

export class DayNine extends PuzzleToggleWithLit {
  static properties = {
    ...super.properties,
  }
/* playground-hide */
  static styles = [
    ...super.styles,
    css`
      .trees{
        overflow-x: scroll;
      }
      .tree {
        padding: 0.5em;
        filter: drop-shadow(15px 15px 0.5rem black);
      }
      .cell{
        padding: 0.3em;
        border: 1px solid black;
        transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .cell:hover{
        transform: scale(1.5) !important;
        z-index: 100;
      }
    `
  ]
/* playground-hide-end */

  constructor() {
    super({
      examplePuzzle,
      fullPuzzle
    })
    this.selectedPuzzle = 'fullPuzzle'
  }

  parseInput(input) {
    const trees = {}
    const levels = input.split('\n').forEach((item, index) => {
      trees[index] = item.split(' ').map(item => Number(item.trim()))
    })
    Object.values(trees).forEach((treeBase, index) => {
      const newTree = [treeBase]
      buildNextTreeLevel(treeBase, newTree)
      trees[index] = newTree
    })
    return trees
  }

  render() {
    const {
      startTime,
    } = this

    let PartOneTotal = 0
    let PartTwoTotal = 0

    Object.entries(this.puzzle).forEach(([index, tree]) => {
      const newEntriesEnd = [0]
      const newEntriesStart = [0]
      for (let level = (tree.length - 1); level > 0; level--) {
        const bottomLast = tree[level][tree[level].length - 1]
        const bottomFirst = tree[level][0]
        const previousLevelLast = tree[level - 1][tree[level - 1].length - 1]
        const previousLevelFirst = tree[level - 1][0]

        const newEntryLast = previousLevelLast + bottomLast
        const newEntryFirst = previousLevelFirst - bottomFirst

        tree[level - 1].push(newEntryLast)
        tree[level - 1].unshift(newEntryFirst)
        newEntriesEnd.unshift(newEntryLast)
        newEntriesStart.unshift(newEntryFirst)
      }

      PartOneTotal += newEntriesEnd[0]
      PartTwoTotal += newEntriesStart[0]
    })

    const renderTree = (tree) => {
      return html`
        <div class="tree">
            ${tree.map((level, rowIndex) => {
              return html`
                <div class="d-flex justify-center">
                  ${level.map((item, colIndex) => {
                    const isFirstLast = colIndex === 0 || colIndex === (level.length - 1)
                    return html`
                      <div class="cell text-center ${classMap({
                        blue: !isFirstLast,
                        bold: rowIndex === 0 && isFirstLast,
                        red: rowIndex === 0 && isFirstLast,
                        green: rowIndex !== 0 && isFirstLast,
                      })}">
                        ${item}
                      </div>
                    `
                  })}
                </div>
              `
            })}
        </div>
      `
    }

    return html`
      <my-card>
        <div class="d-flex-grid justify-between">
          ${this.puzzleSwitcher(dayNine2023.adventUrl)}
          <div>
            Left Side Total: <sp-badge>${numeral(PartTwoTotal).format('0,0')}</sp-badge>
          </div>
          <div>
            Right Side Total: <sp-badge>${numeral(PartOneTotal).format('0,0')}</sp-badge>
          </div>
        </div>
      </my-card>
      <my-card class="trees">
        ${this.puzzle[0] && Object.values(this.puzzle).map(renderTree)}
      </my-card>
      ${this.timeTaken(startTime)}
    `
  }

}

!window.customElements.get(elementName) && window.customElements.define(elementName, DayNine)
