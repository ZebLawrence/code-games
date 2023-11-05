
export const isCurrentPage = path => {
  const locationPath = window.location.hash.toLowerCase().replaceAll('/', '')
  path = path.toLowerCase().replaceAll('/', '')
  console.log('looking to match path', path)
  console.log('locationPath', locationPath)
  console.log('They match', locationPath === path)
  console.log('-------------------------------------------------------------------------------------------')
  return locationPath === path
}
