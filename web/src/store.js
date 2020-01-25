import Vue from 'vue'
import Vuex from 'vuex'
import { http } from './http'
import * as storange from './storange'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    currentUser: {},
    profiles: []
  },
  getters: {
    getCurrentUser (state) {
      return storange.getCurrentUser()
    },
    getProfiles (state) {
      return state.profiles
    }
  },
  mutations: {
    SET_TOKEN (state, payload) {
      state.token = payload
    },
    SET_CURRENT_USER (state, payload) {
      state.currentUser = payload
    },
    SET_PROFILES (state, payload) {
      state.profiles = payload
    }
  },
  actions: {
    // Autenticação
    ActionAuthLogin: ({ dispatch }, payload) => {
      return http.post(http.api + '/v1/auth', payload)
        .then(res => {
          dispatch('ActionSetToken', res.data.token)
        })
    },
    ActionCurrentUser: () => {
      storange.setHeaderToken(storange.getLocalToken())
      return http.get(http.api + '/v1/me')
        .then(res => {
          storange.setCurrentUser(res.data)
        })
    },
    ActionSignOut: ({ dispatch }) => {
      // storange.setHeaderToken('')
      // storange.deleteLocalToken()
      // storange.deleteCurrentUser()
      // dispatch('ActionSetToken', '')
    },
    ActionSetToken: ({ commit }, payload) => {
      storange.setLocalToken(payload)
      storange.setHeaderToken(payload)
      commit('SET_TOKEN', payload)
    },
    ActionSearchProfiles: ({ commit }) => {
      storange.setHeaderToken(storange.getLocalToken())
      return http.get(http.api + '/v1/profiles')
        .then(res => {
          commit('SET_PROFILES', res.data)
        })
    },
    ActionSaveProfile: ({}, payload) => {
      storange.setHeaderToken(storange.getLocalToken())
      return http.post(http.api + '/v1/profiles/create', payload)
    },
    ActionRemoveProfile: ({}, id) => {
      storange.setHeaderToken(storange.getLocalToken())
      console.log(id)
      return http.delete(http.api + '/v1/profiles/' + id)
    },
    ActionUpdateDefaultProfile: ({}, id) => {
      storange.setHeaderToken(storange.getLocalToken())
      return http.patch(http.api + '/v1/accounts/update_profile_default/' + id)
    },


  }
})
