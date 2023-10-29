import { home } from './pages/home.js'
import { home2023 } from './pages/2023/2023-home.js'
import { dayOne2023 } from './pages/2023/2023-12-1.js'
import { dayTwo2023 } from './pages/2023/2023-12-2.js'

export default {
  pagesConfig: [
    home,
    home2023,
    dayOne2023,
    dayTwo2023,
  ],
  main: [
    home,
    home2023,
  ],
  groups: {
    2023: [
      home2023,
      dayOne2023,
      dayTwo2023,
    ],
  }
}
