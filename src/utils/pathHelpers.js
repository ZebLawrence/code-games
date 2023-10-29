
export const isCurrentPage = path => {
  const locationPath = window.location.hash.toLowerCase().replaceAll('/', '')
  path = path.toLowerCase().replaceAll('/', '')
  // console.log('looking for locationPath', locationPath)
  // console.log('to match path', path)
  return locationPath === path
}
