import { css, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import numeral from 'numeral'
import { calcPolygonArea } from '../../../utils/mathHelp'
import { memoize } from '../../../utils/funcHelpers'
import { PuzzleToggleWithLit } from '../../../mixins/puzzleToggle'
import {
  examplePuzzle,
  fullPuzzle,
} from './2023-12-23-puzzle'

/* playground-hide */
const elementName = 'day-twentythree-two-three'
export const dayTwentyThree2023 = {
  tag: elementName,
  title: '2023 Day TwentyThree',
  path: '#/2023/day-TwentyThree/',
  codeFileName: '2023-12-23.js',
  adventUrl: 'https://adventofcode.com/2023/day/23',
}
/* playground-hide-end */

const getNextDirections = ({right, down, left, up}) => {

}


let iteration = 0
const travelPath = (map, visited, paths, startCoords, endCoords) => {
  
  let nextCoords = [...startCoords]
  let noNewPathsFound = false
  while (!visited[`${endCoords[0]}-${endCoords[1]}`] && !noNewPathsFound) {
    const nextDirections =[]
    //console.log('checking nextCoords', nextCoords)
    //console.log('visited', visited)

    const up = map[nextCoords[0] - 1] && map[nextCoords[0] - 1][nextCoords[1]]
    const right = map[nextCoords[0]] && map[nextCoords[0]][nextCoords[1] + 1]
    const down = map[nextCoords[0] + 1] && map[nextCoords[0] + 1][nextCoords[1]]
    const left = map[nextCoords[0]] && map[nextCoords[0]][nextCoords[1] - 1]
    const slopes = ['<', '^', '>', 'v']
    if ((up === '.' || up === '^') && !visited[`${nextCoords[0] - 1}-${nextCoords[1]}`]) {
    // if ((up === '.' || slopes.indexOf(up) > -1) && !visited[`${nextCoords[0] - 1}-${nextCoords[1]}`]) {
      //console.log('pushing the up direction', up)
      //console.log(!visited[`${nextCoords[0] - 1}-${nextCoords[1]}`])
      nextDirections.push([nextCoords[0] - 1, nextCoords[1]])
    }
    if ((right === '.' || right === '>') && !visited[`${nextCoords[0]}-${nextCoords[1] + 1}`]) {
    // if ((right === '.' || slopes.indexOf(right) > -1) && !visited[`${nextCoords[0]}-${nextCoords[1] + 1}`]) {
      //console.log('pushing the right direction', right)
      nextDirections.push([nextCoords[0], nextCoords[1] + 1])
    }
    if ((down === '.' || down === 'v') && !visited[`${nextCoords[0] + 1}-${nextCoords[1]}`]) {
    // if ((down === '.' || slopes.indexOf(down) > -1) && !visited[`${nextCoords[0] + 1}-${nextCoords[1]}`]) {
      //console.log('pushing the down direction', down)
      nextDirections.push([nextCoords[0] + 1, nextCoords[1]])
    }
    if ((left === '.' || left === '<') && !visited[`${nextCoords[0]}-${nextCoords[1] - 1}`]) {
    // if ((left === '.' || slopes.indexOf(left) > -1) && !visited[`${nextCoords[0]}-${nextCoords[1] - 1}`]) {
      //console.log('pushing the left direction', left)
      nextDirections.push([nextCoords[0], nextCoords[1] - 1])
    }

    //console.log('nextDirections', nextDirections)

    if (nextDirections.length > 1) {

      const newVisited = {...visited}
      nextDirections.forEach((nextDirection, ndIndex) => {
        const nextDirectionKey = `${nextDirection[0]}-${nextDirection[1]}`
        if (ndIndex === 0) {
          visited[nextDirectionKey] = true
          nextCoords = nextDirection
        } else {
          newVisited[nextDirectionKey] = true
          paths[nextDirectionKey] = {...newVisited}
          travelPath(map, paths[nextDirectionKey], paths, nextDirection, endCoords)
        }
      })
    } else if (nextDirections.length === 1) {
      nextCoords = nextDirections[0]
      visited[`${nextCoords[0]}-${nextCoords[1]}`] = true
    } else {
      noNewPathsFound = true
    }

    //console.log('iteration', iteration)
    iteration++
  }

}

export class DayTwentyThree extends PuzzleToggleWithLit {
  static properties = {
    ...super.properties,
  }
/* playground-hide */
  static styles = [
    ...super.styles,
    css`
      table td{
        padding: 0;
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
    // console.log('input', input)
    const visited = {}
    const startCoords = []
    const endCoords = []
    const paths = {}

    const islandMap = input.split('\n').map((row, rowIndex) => {
      return row.split('').map((col, colIndex) => {
        if (rowIndex === 0 && col === '.') {
          startCoords.push(rowIndex, colIndex)
          visited[`${rowIndex}-${colIndex}`] = true
        }
        return col
      })
    })

    endCoords.push(islandMap.length - 1, islandMap[islandMap.length - 1].indexOf('.'))
    paths[`${startCoords[0]}-${startCoords[1]}`] = {...visited}

    travelPath(islandMap, paths[`${startCoords[0]}-${startCoords[1]}`], paths, startCoords, endCoords)
    console.log('startCoords', startCoords)
    console.log('endCoords', endCoords)
    console.log('paths', paths)
    const counts = Object.values(paths).map(path => Object.keys(path).length - 1)
    console.log('counts', counts)
    const allVisited = Object.values(paths).reduce((acc, path) => {
      return {
        ...acc,
        ...path,
      }
    }, {})

    return {
      visited,
      islandMap,
      paths,
      allVisited,
    }
  }

  render() {
    const {
      startTime,
    } = this

    const {
      islandMap,
      paths,
      allVisited
    } = this.puzzle
    
    console.log('this.puzzle', this.puzzle)

    const renderTable = (data, visited) => {
      return html`
        <table>
          ${data && data.map((row, rowIndex) => {
            return html`
              <tr>
                ${row.map((col, colIndex) => {
                  let cell = col
                  const blue = visited && visited[`${rowIndex}-${colIndex}`] && !paths[`${rowIndex}-${colIndex}`]
                  const red = paths && paths[`${rowIndex}-${colIndex}`]
                  return html`
                    <td class=${classMap({
                      blue,
                      red,
                      white: col === '#',
                    })}>${cell}</td>
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
            ${this.puzzleSwitcher(dayTwentyThree2023.adventUrl)}
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
        <div class="d-flex space-evenly">
          ${renderTable(islandMap, allVisited)}
        </div>
      </my-card>
      <my-card label="Part 1">
        <div class="d-flex space-evenly flex-wrap">
          ${Object.values(paths || {}).map((pathVisited, pathIndex) => {
            return html`
              <div>
                <sp-badge>${Object.keys(pathVisited).length - 1}</sp-badge>
                ${renderTable(islandMap, pathVisited)}
              </div>
            `
            return renderTable(islandMap, pathVisited)
          })}
        </div>
      </my-card>

      ${this.timeTaken(startTime)}
    `
  }
}
!window.customElements.get(elementName) && window.customElements.define(elementName, DayTwentyThree)
