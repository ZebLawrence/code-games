import { css, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import numeral from 'numeral'
import { PuzzleToggleWithLit } from '../../../mixins/puzzleToggle'
import {
  examplePuzzle,
  fullPuzzle,
} from './2023-12-5-puzzle'
/* playground-hide */
const elementName = 'day-five-two-three'
export const dayFive2023 = {
  tag: elementName,
  title: '2023 Day Five',
  path: '#/2023/day-five/',
  codeFileName: '2023-12-4.js',
  adventUrl: 'https://adventofcode.com/2023/day/4',
}
/* playground-hide-end */

class sourceToDestinationMap {
  constructor([name, ranges]) {
    this.name = name
    this.ranges = ranges
      .split('\n')
      .map(item => item.trim())
      .map(item => item.split(' ')
      .map(item => Number(item.trim())))
  }

  getDestinationFromSource(source) {
    let destination = source

    for (let i = 0; i < this.ranges.length; i++) {
      const [destinationStart, sourceStart, rangeLength] = this.ranges[i]

      if (sourceStart <= source && source < sourceStart + rangeLength) {
        destination = destinationStart + (source - sourceStart)
        break
      } 
    }

    return destination
  }
}

export class DayFive extends PuzzleToggleWithLit {
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
      fullPuzzle
    })
  }

  parseInput(input) {
    let result = {
      seeds: []
    }
    const [
      seedsRaw,
      seedToSoilRaw,
      soilToFertilizerRaw,
      fertilizerToWaterRaw,
      waterToLightRaw,
      lightToTemperatureRaw,
      temperatureToHumidityRaw,
      humidityToLocationRaw,
    ] = input.split('\n\n')

    const [_, seeds] =  seedsRaw.split(':').map(item => item.trim())

    result = {
      seeds: seeds.split(' ').map(item => Number(item.trim())),
      seedToSoil: new sourceToDestinationMap(seedToSoilRaw.split(':').map(item => item.trim())),
      soilToFertilizer: new sourceToDestinationMap(soilToFertilizerRaw.split(':').map(item => item.trim())),
      fertilizerToWater: new sourceToDestinationMap(fertilizerToWaterRaw.split(':').map(item => item.trim())),
      waterToLight: new sourceToDestinationMap(waterToLightRaw.split(':').map(item => item.trim())),
      lightToTemperature: new sourceToDestinationMap(lightToTemperatureRaw.split(':').map(item => item.trim())),
      temperatureToHumidity: new sourceToDestinationMap(temperatureToHumidityRaw.split(':').map(item => item.trim())),
      humidityToLocation: new sourceToDestinationMap(humidityToLocationRaw.split(':').map(item => item.trim())),
    }

    return result
  }

  render() {
    const {
      startTime
    } = this

    const partOneStats = []
    const partTwoStats = []
    let lowestLocationPartOne = Infinity
    let lowestLocationPartTwo = Infinity
    let lowestSeedPartOne = 0
    let lowestSeedPartTwo = 0
    let rangePartTwo = []    
    let pairs = []
    const minimumLocationsForPairs = []

    const findSeedLocation = (seed, savePartOne = false, savePartTwo = false) => {
      const soil = this.puzzle.seedToSoil.getDestinationFromSource(seed)
      const fertilizer = this.puzzle.soilToFertilizer.getDestinationFromSource(soil)
      const water = this.puzzle.fertilizerToWater.getDestinationFromSource(fertilizer)
      const light = this.puzzle.waterToLight.getDestinationFromSource(water)
      const temperature = this.puzzle.lightToTemperature.getDestinationFromSource(light)
      const humidity = this.puzzle.temperatureToHumidity.getDestinationFromSource(temperature)
      const location = this.puzzle.humidityToLocation.getDestinationFromSource(humidity)

      if (savePartOne) {
        partOneStats.push([seed, soil, fertilizer, water, light, temperature, humidity, location])
      }

      if (savePartTwo) {
        partTwoStats.push([seed, soil, fertilizer, water, light, temperature, humidity, location])
      }

      return location
    }

    let pair = []
    // part one
    this.puzzle?.seeds?.forEach(seed => {
      // add pairs for part 2
      if (pair.length === 0) {
        pair.push(seed)
      } else if (pair.length === 1) {
        const [first] = pair
        pairs.push([first, pair[0] + seed])
        pair = []
      }

      const location = findSeedLocation(seed, true)
      if (location < lowestLocationPartOne) {
        lowestLocationPartOne = location
      }  
    })

    // check every 1000 seeds to narrow down the search
    pairs.forEach(([seed1, seed2]) => {
      let miniLocation = Infinity
      let miniLocationSeed = seed1
      for (let i = seed1; i <= seed2; i += 1000) {
        const foundLocation = findSeedLocation(i)
        if (foundLocation < miniLocation) {
          miniLocation = foundLocation
          miniLocationSeed = i
        }
      }
      minimumLocationsForPairs.push([miniLocation, miniLocationSeed, seed1, seed2])
    })

    minimumLocationsForPairs.forEach(([location, minSeed, rangeStartSeed, rangeEndSeed]) => {
      if (location < lowestLocationPartTwo) {
        lowestLocationPartTwo = location
        rangePartTwo = [minSeed, rangeStartSeed, rangeEndSeed]
      }
    })

    const deltaRange = 1000
    const searchStart = Math.max(rangePartTwo[0] - deltaRange, rangePartTwo[1])
    const searchEnd = Math.min(rangePartTwo[0] + deltaRange, rangePartTwo[2])

    for (let i = searchStart; i <= searchEnd; i++) {
      const location = findSeedLocation(i, false, true)
      if (location < lowestLocationPartTwo) {
        lowestLocationPartTwo = location
        lowestSeedPartTwo = i
      }
    }

    const renderTable = (stats, matchLocation) => {
      return html`
        <table>
          <thead>
            <tr>
              <th>Seed</th>
              <th>Soil</th>
              <th>Fertilizer</th>
              <th>Water</th>
              <th>Light</th>
              <th>Temperature</th>
              <th>Humidity</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            ${stats
              .filter(x => x[7] === matchLocation)
              .map(([seed, soil, fertilizer, water, light, temperature, humidity, location]) => {
              const match = location === matchLocation
              return html`
                <tr class=${classMap({
                    red: true,
                    green: true,
                  })}>
                  <td>${seed}</td>
                  <td>${soil}</td>
                  <td>${fertilizer}</td>
                  <td>${water}</td>
                  <td>${light}</td>
                  <td>${temperature}</td>
                  <td>${humidity}</td>
                  <td class=${classMap({ blue: match })}>${location}</td>
                </tr>
              `
            })}
          </tbody>
        </table>
      `
    }

    return html`
      <my-card>
        <div class="d-flex-grid justify-between">
          ${this.puzzleSwitcher(dayFive2023.adventUrl)}
        </div>
      </my-card>
      <my-card>
        Part One
        ${renderTable(partOneStats, lowestLocationPartOne)}
      </my-card>
      <my-card>
        Part Two
        ${renderTable(partTwoStats, lowestLocationPartTwo)}
      </my-card>
      ${this.timeTaken(startTime)}
    `
  }

}

!window.customElements.get(elementName) && window.customElements.define(elementName, DayFive)
