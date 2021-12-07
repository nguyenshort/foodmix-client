export default function ({ store, redirect }) {
  if (!store.getters['pref/auth']) {
    redirect('/')
  }
}
