
export default {
  pagesConfig: [
    {
      tag: 'day-one',
      title: '2023 Day One',
      path: '/2023/day-one',
      file: import(`./pages/2023/2023-12-1.js`),
    },
    {
      tag: 'day-two',
      title: '2023 Day Two',
      path: '/2023/day-two',
      file: import(`./pages/2023/2023-12-2.js`),
    },
    {
      tag: 'home-page',
      title: 'Code Games',
      path: '/',
      file: import(`./pages/home.js`),
    },
  ]
}
