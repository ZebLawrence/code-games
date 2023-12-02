import { home } from './pages/home.js'
import { home2020 } from './pages/2020/2020-home.js'
import { dayOne2020 } from './pages/2020/day1/2020-12-1.js'

import { home2023 } from './pages/2023/2023-home.js'
import { dayOne2023 } from './pages/2023/day1/2023-12-1.js'
import { dayTwo2023 } from './pages/2023/day2/2023-12-2.js'
import { voteMap } from './pages/map/vote-map.js'

export default {
  pagesConfig: [
    home,
    home2020,
    dayOne2020,
    home2023,
    dayOne2023,
    dayTwo2023,
    voteMap,
  ],
  main: [
    home,
    home2020,
    home2023,
    voteMap,
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
    ],
  }
}
