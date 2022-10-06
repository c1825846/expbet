export default function ({redirect, store}) {
  if (!store.getters['user/isAdmin']) {
    redirect('/login')
  }
}
