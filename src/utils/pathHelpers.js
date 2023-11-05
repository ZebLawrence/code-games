
export const isCurrentPage = path => {
  const locationPath = window.location.hash.toLowerCase().replaceAll('/', '')
  path = path.toLowerCase().replaceAll('/', '')
  return locationPath === path
}
