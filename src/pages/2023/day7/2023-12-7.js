import { css, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import numeral from 'numeral'
import { PuzzleToggleWithLit } from '../../../mixins/puzzleToggle'
import {
  examplePuzzle,
  fullPuzzle,
  cards,
  cardsPart2
} from './2023-12-7-puzzle'
import ace from '../../../assets/images/A.png'
import king from '../../../assets/images/K.png'
import queen from '../../../assets/images/Q.png'
import jack from '../../../assets/images/J.png'
import ten from '../../../assets/images/10.png'
import nine from '../../../assets/images/9.png'
import eight from '../../../assets/images/8.png'
import seven from '../../../assets/images/7.png'
import six from '../../../assets/images/6.png'
import five from '../../../assets/images/5.png'
import four from '../../../assets/images/4.png'
import three from '../../../assets/images/3.png'
import two from '../../../assets/images/2.png'
import joker from '../../../assets/images/Joker.png'
/* playground-hide */
const elementName = 'day-seven-two-three'
export const daySeven2023 = {
  tag: elementName,
  title: '2023 Day Seven',
  path: '#/2023/day-seven/',
  codeFileName: '2023-12-7.js',
  adventUrl: 'https://adventofcode.com/2023/day/7',
}
/* playground-hide-end */

const imageMap = {
  A: ace,
  K: king,
  Q: queen,
  J: jack,
  T: ten,
  9: nine,
  8: eight,
  7: seven,
  6: six,
  5: five,
  4: four,
  3: three,
  2: two,
  joker,
}

const organizeHand = hand => {
  const pairs = {}
  hand.forEach(item => {
    pairs[item] = pairs[item] ? pairs[item] + 1 : 1
  })
  return pairs
}

const isFiveOfaKind = pairs => {
  return Object.values(pairs).includes(5)
}

const isFourOfaKind = pairs => {
  return Object.values(pairs).includes(4)
}

const isFullHouse = pairs => {
  return Object.values(pairs).includes(3) && Object.values(pairs).includes(2)
}

const isThreeOfaKind = pairs => {
  return Object.values(pairs).includes(3) && !Object.values(pairs).includes(2)
}

const isTwoPair = pairs => {
  return Object.values(pairs).filter(item => item === 2).length === 2 && !Object.values(pairs).includes(3)
}

const isOnePair = pairs => {
  return Object.values(pairs).filter(item => item === 2).length === 1
    && Object.values(pairs).filter(item => item === 1).length === 3
}

const sortHands = (a, b, rank) => {
  const setA = a.hand.map(item => rank.indexOf(item))
  const setB = b.hand.map(item => rank.indexOf(item))

  for (let index = 0; index < setA.length; index++) {
    const aCompare = setA[index];
    const bCompare = setB[index];
    if (aCompare > bCompare) {
      return 1
      break
    } else if (aCompare < bCompare) {
      return -1
      break
    }
  }
}

export class DaySeven extends PuzzleToggleWithLit {
  static properties = {
    ...super.properties,
  }
/* playground-hide */
  static styles = [
    ...super.styles,
    css`
      img{
        width: 30px;
        filter: drop-shadow(-4px 5px 2px rgba(0,0,0,0.5));
        margin-left: -8px;
        position: relative;
        transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      img:hover{
        transform: scale(1.5) translate(0, -15px) !important;
        z-index: 100;
      }
      img:nth-child(1) {
        transform: rotate(-32deg);
        top: 3px;
      }
      img:nth-child(2) {
        transform: rotate(-15deg);
        top: -10px;
      }
      img:nth-child(3) {
        transform: rotate(0deg);
        top: -15px;
      }
      img:nth-child(4) {
        transform: rotate(15deg);
        top: -10px;
      }
      img:nth-child(5) {
        transform: rotate(32deg);
        top: 3px;
      }
      .cards {
        margin-left: 8px;
      }
      table{
        width: 100%;
      }
    `
  ]
/* playground-hide-end */

  constructor() {
    super({
      examplePuzzle,
      fullPuzzle
    })
  }

  parseInput(input) {

    return input.split('\n').map(item => {
      const [handRaw, bid] = item.split(' ')
      const hand = handRaw.split('')
      const pairs = organizeHand(hand)
      let score = 0
      let scorePart2 = 0
      let fiveOfaKind = isFiveOfaKind(pairs)
      let fourOfaKind = isFourOfaKind(pairs)
      let fullHouse = isFullHouse(pairs)
      let threeOfaKind = isThreeOfaKind(pairs)
      let twoPair = isTwoPair(pairs)
      let onePair = isOnePair(pairs)

      const js = hand.filter(item => item === 'J').length
      if (fiveOfaKind) {
        score = 6
        scorePart2 = 6
      } else if (fourOfaKind) {
        if (js > 0) {
          scorePart2 = 6
        } else {
          scorePart2 = 5
        }
        score = 5
      } else if (fullHouse) {
        if (js > 0) {
          scorePart2 = 6
        } else {
          scorePart2 = 4
        }
        score = 4
      } else if (threeOfaKind) {
        if (js > 0) {
          scorePart2 = 5
        } else {
          scorePart2 = 3
        }
        score = 3
      } else if (twoPair) {
        if (js === 2) {
          scorePart2 = 5
        } else if (js === 1) {
          scorePart2 = 4
        } else {
          scorePart2 = 2
        }
        score = 2
      } else if (onePair) {
        if (js === 1 || js === 2) {
          scorePart2 = 3
        } else {
          scorePart2 = 1
        }
        score = 1
      } else {
        if (js ===1) {
          scorePart2 = 1
        } else {
          scorePart2 = 0
        }
        score = 0
      }

      return {
        hand,
        handRaw,
        score,
        scorePart2,
        fiveOfaKind,
        fourOfaKind,
        fullHouse,
        threeOfaKind,
        twoPair,
        onePair,
        bid: Number(bid),
      }
    })
  }

  render() {
    const {
      startTime
    } = this

    const handSets = {
      6: [],
      5: [],
      4: [],
      3: [],
      2: [],
      1: [],
      0: [],
    }

    const handSetsPart2 = {
      6: [],
      5: [],
      4: [],
      3: [],
      2: [],
      1: [],
      0: [],
    }

    this.puzzle.forEach(item => {
      const { score, scorePart2 } = item
      handSets[score] = handSets[score] || []
      handSets[score].push(item)
      handSetsPart2[scorePart2] = handSetsPart2[scorePart2] || []
      handSetsPart2[scorePart2].push(item)
    })

    Object.values(handSets).forEach(handSet => {
      handSet.sort((a, b) => sortHands(a, b, cards))
    })

    Object.values(handSetsPart2).forEach(handSet => {
      handSet.sort((a, b) => sortHands(a, b, cardsPart2))
    })

    const handsRanked = [
      ...handSets[0],
      ...handSets[1],
      ...handSets[2],
      ...handSets[3],
      ...handSets[4],
      ...handSets[5],
      ...handSets[6]
    ]

    const handsRankedPart2 = [
      ...handSetsPart2[0],
      ...handSetsPart2[1],
      ...handSetsPart2[2],
      ...handSetsPart2[3],
      ...handSetsPart2[4],
      ...handSetsPart2[5],
      ...handSetsPart2[6]
    ]

    const totalWinnings = handsRanked.reduce((acc, item, index) => {
      const { bid } = item
      const winnings = bid * (index + 1)
      return acc + winnings
    }, 0)

    const totalWinningsPart2 = handsRankedPart2.reduce((acc, item, index) => {
      const { bid } = item
      const winnings = bid * (index + 1)
      return acc + winnings
    }, 0)

    const getHandType = (rankedHand) => {
      const { score, scorePart2 } = rankedHand
      if (score === 6 || scorePart2 === 6) {
        return 'Five of a Kind'
      } else if (score === 5 || scorePart2 === 5) {
        return 'Four of a Kind'
      } else if (score === 4 || scorePart2 === 4) {
        return 'Full House'
      } else if (score === 3 || scorePart2 === 3) {
        return 'Three of a Kind'
      } else if (score === 2 || scorePart2 === 2) {
        return 'Two Pair'
      } else if (score === 1 || scorePart2 === 1) {
        return 'One Pair'
      } else {
        return 'High Card'
      }
    }

    // win part 2 253499763
    const renderCardsTable = (rankedHands, total, isPartOne) => {
      return html`
        <table>
          <thead>
            <th>Rank</th>
            <th>Bid</th>
            <th>Winnings</th>
            <th>Type</th>
            <th>Hand</th>
          </thead>
          <tbody>
            ${rankedHands.map((rankedHand, index) => {
              const { hand, handRaw, score, bid } = rankedHand
              const hasJoker = !isPartOne && hand.includes('J')
              return html`
                <tr class=${classMap({
                  blue: isPartOne || !hasJoker,
                  red: hasJoker,
                })}>
                  <td>${index + 1}</td>
                  <td>${numeral(bid).format('$0,0')}</td>
                  <td>${numeral(bid * (index + 1)).format('$0,0')}</td>
                  <td>${getHandType(rankedHand)}</td>
                  <td>
                    <div class="cards">                      
                      ${
                        hand.map(item => {
                          const imageIndex = !isPartOne && item === 'J'
                            ? 'joker'
                            : item
                          return html`<img src=${imageMap[imageIndex]} />`
                        })
                      }
                    </div>
                  </td>
                </tr>
              `
            })}
            <tr class="total">
              <td>Total</td>
              <td></td>
              <td>${numeral(total).format('$0,0')}</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      `
    }
    
    return html`
      <shadow-card>
        <div class="d-flex-grid justify-between">
          ${this.puzzleSwitcher(daySeven2023.adventUrl)}
          <sp-badge class="blue" size="l">Unchanged Hand</sp-badge>
          <sp-badge class="red" size="l">Wild Card Hand</sp-badge>
        </div>
      </shadow-card>
      <div class="d-flex-grid">
        <shadow-card label="Part One">
          Part One
          ${renderCardsTable(handsRanked, totalWinnings, true)}
        </shadow-card>
        <shadow-card label="Part two">
          Part Two
          ${renderCardsTable(handsRankedPart2, totalWinningsPart2, false)}
        </shadow-card>
      </div>
      ${this.timeTaken(startTime)}
    `
  }

}

!window.customElements.get(elementName) && window.customElements.define(elementName, DaySeven)
