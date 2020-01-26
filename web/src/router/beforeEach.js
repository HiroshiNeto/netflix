import store from '../store'

export default async (to, from, next) => {
  if (to.name === 'SignUp' && !store.getters['hasToken']){
    next()
  }else if (to.name !== 'Login' && !store.getters['hasToken']) {
    try {
      await store.dispatch('ActionCheckToken')

      next({ name: to.name })
    } catch (err) {
      next({ name: 'Login' })
    }
  } else {
    if (to.name === 'Login' && store.getters['hasToken']) {
      next({ name: 'Profile' })
    } else {
      next()
    }
  }
}
