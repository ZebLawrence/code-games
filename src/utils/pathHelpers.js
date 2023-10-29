
export const isCurrentPage = path => {
  const locationPath = window.location.pathname.toLowerCase().replaceAll('/', '')
  path = path.toLowerCase().replaceAll('/', '')
  return locationPath === path
}
