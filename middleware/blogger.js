export default function ({redirect, store}) {
  let isBlogger = false
  store.getters['user/user']?.roles?.forEach(r => {
    if (r.name === 'blogger') {
      isBlogger = true
    }
  })
  if (!isBlogger) {
    return redirect('/login')
  }
}
