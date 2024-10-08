import { home } from './pages/home.js'
import { home2020 } from './pages/2020/2020-home.js'
import { dayOne2020 } from './pages/2020/day1/2020-12-1.js'

import { home2023 } from './pages/2023/2023-home.js'
import { dayOne2023 } from './pages/2023/day1/2023-12-1.js'
import { dayTwo2023 } from './pages/2023/day2/2023-12-2.js'
import { dayThree2023 } from './pages/2023/day3/2023-12-3.js'
import { dayFour2023 } from './pages/2023/day4/2023-12-4.js'
import { dayFive2023 } from './pages/2023/day5/2023-12-5.js'
import { daySix2023 } from './pages/2023/day6/2023-12-6.js'
import { daySeven2023 } from './pages/2023/day7/2023-12-7.js'
import { dayEight2023 } from './pages/2023/day8/2023-12-8.js'
import { dayNine2023 } from './pages/2023/day9/2023-12-9.js'
import { dayTen2023 } from './pages/2023/day10/2023-12-10.js'
import { dayEleven2023 } from './pages/2023/day11/2023-12-11.js'
import { dayTwelve2023 } from './pages/2023/day12/2023-12-12.js'
import { dayThirteen2023 } from './pages/2023/day13/2023-12-13.js'
import { dayFourteen2023 } from './pages/2023/day14/2023-12-14.js'
import { dayFifteen2023 } from './pages/2023/day15/2023-12-15.js'
import { daySixteen2023 } from './pages/2023/day16/2023-12-16.js'
import { daySeventeen2023 } from './pages/2023/day17/2023-12-17.js'
import { dayEighteen2023 } from './pages/2023/day18/2023-12-18.js'
import { dayNineteen2023 } from './pages/2023/day19/2023-12-19.js'
import { dayTwenty2023 } from './pages/2023/day20/2023-12-20.js'
import { dayTwentyOne2023 } from './pages/2023/day21/2023-12-21.js'
import { dayTwentyThree2023 } from './pages/2023/day23/2023-12-23.js'
import { voteMap } from './pages/map/vote-map.js'
import { EclipseAnimation } from './pages/eclipse/eclipse-animation.js'
import { CryptoStream } from './pages/stream/crypto-stream.js'

import { home2024 } from './pages/2024/2024-home.js'
import { dayOne2024 } from './pages/2024/day1/2024-8-20.js'

export default {
  pagesConfig: [
    home,
    home2020,
    dayOne2020,
    home2023,
    dayOne2023,
    dayTwo2023,
    dayThree2023,
    dayFour2023,
    dayFive2023,
    daySix2023,
    daySeven2023,
    dayEight2023,
    dayNine2023,
    dayTen2023,
    dayEleven2023,
    dayTwelve2023,
    dayThirteen2023,
    dayFourteen2023,
    dayFifteen2023,
    daySixteen2023,
    daySeventeen2023,
    dayEighteen2023,
    dayNineteen2023,
    dayTwenty2023,
    dayTwentyOne2023,
    dayTwentyThree2023,
    voteMap,
    EclipseAnimation,
    CryptoStream,
    home2024,
    dayOne2024
  ],
  main: [
    home,
    home2020,
    home2023,
    home2024,
    voteMap,
    EclipseAnimation,
    CryptoStream,
  ],
  groups: {
    2020: [
      // home2020,
      dayOne2020,
    ],
    2023: [
      // home2023,
      dayOne2023,
      dayTwo2023,
      dayThree2023,
      dayFour2023,
      dayFive2023,
      daySix2023,
      daySeven2023,
      dayEight2023,
      dayNine2023,
      dayTen2023,
      dayEleven2023,
      dayTwelve2023,
      dayThirteen2023,
      dayFourteen2023,
      dayFifteen2023,
      daySixteen2023,
      daySeventeen2023,
      dayEighteen2023,
      dayNineteen2023,
      dayTwenty2023,
      dayTwentyOne2023,
      dayTwentyThree2023,
    ],
    2024:[
      dayOne2024
    ]
  }
}
