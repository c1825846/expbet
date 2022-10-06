export default function ({redirect, store}) {
  let isModerator = false
  store.getters['user/user']?.roles?.forEach(r => {
    if (r.name === 'moderator') {
      isModerator = true
    }
  })
  if (!isModerator) {
    return redirect('/login')
  }
}
