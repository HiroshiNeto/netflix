import { setToken } from './http'

export const setHeaderToken = token => setToken(token)
export const getLocalToken = () => localStorage.getItem('token')
export const deleteLocalToken = () => localStorage.removeItem('token')
export const setLocalToken = token => localStorage.setItem('token', token)
export const setCurrentUser = user => localStorage.setItem('user', JSON.stringify(user))
export const getCurrentUser = () => JSON.parse(localStorage.getItem('user'))
export const deleteCurrentUser = () => localStorage.removeItem('user')
export const setCurrentProfile = profile => localStorage.setItem('profile', JSON.stringify(profile))
export const getCurrentProfile = () => JSON.parse(localStorage.getItem('profile'))
export const deleteCurrentProfile = () => localStorage.removeItem('profile')
