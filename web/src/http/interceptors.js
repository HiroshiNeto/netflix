import store from '../store'

export default req => {
  return ({ status }) => {
    if (status === 401) {
      alert('Login não autorizado')
      store.dispatch('ActionSignOut')
      window._Vue.$router.push({ name: 'Login' })
    }
  }
}
