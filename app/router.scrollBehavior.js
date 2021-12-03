export default function (to, from, savedPosition) {
  if (savedPosition || (to.name === 'search' && from.name === 'search') || (/profile-/.test(to.name) && /profile-/.test(from.name))) {
    return savedPosition
  }
  return { x: 0, y: 0 }
}
