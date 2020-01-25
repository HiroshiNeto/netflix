import Vue from 'vue'
import Vuex from 'vuex'
import { http } from './http'
import * as storange from './storange'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    currentUser: {},
    currentProfile: {},
    profiles: [],
    movies: [],
    interestList: [],
    watchList: []
  },
  getters: {
    getCurrentUser (state) {
      return storange.getCurrentUser()
    },
    getProfiles (state) {
      return state.profiles
    },
    getMovies (state) {
      return state.movies
    },
    getCurrentProfile (state) {
      return state.currentProfile
    },
    getInterestList (state) {
      return state.interestList
    },
    getWatchList (state) {
      return state.watchList
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
    },
    SET_MOVIES (state, payload) {
      state.movies = payload
    },
    SET_CURRENT_PROFILE (state, payload) {
      state.currentProfile = payload
    },
    SET_INTEREST_LIST (state, payload) {
      state.interestList = payload
    },
    SET_WATCH_LIST (state, payload) {
      state.watchList = payload
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
    ActionSetCurrentProfile: ({commit}, payload) => {
      storange.setCurrentProfile(payload)
      commit('SET_CURRENT_PROFILE', payload )
    },
    ActionGetCurrentProfile: ({commit}) => {
      commit('SET_CURRENT_PROFILE', storange.getCurrentProfile() )

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
      return http.delete(http.api + '/v1/profiles/' + id)
    },
    ActionUpdateDefaultProfile: ({}, id) => {
      storange.setHeaderToken(storange.getLocalToken())
      return http.patch(http.api + '/v1/accounts/update_profile_default/' + id)
    },
    ActionListMovies: ({commit}) => {
      storange.setHeaderToken(storange.getLocalToken())
      return http.get(http.api + '/v1/movies')
        .then(res => {
          commit('SET_MOVIES', res.data)
        })
    },
    ActionListInterestList: ({commit}, currentProfile) => {
      storange.setHeaderToken(storange.getLocalToken())
      return http.get(http.api + '/v1/profiles/' + currentProfile.id + '/interest_lists')
        .then(res => {
          commit('SET_INTEREST_LIST', res.data)
        })
    },
    ActionListWatchList: ({commit}, currentProfile) => {
      storange.setHeaderToken(storange.getLocalToken())
      return http.get(http.api + '/v1/profiles/' + currentProfile.id + '/watch_lists')
        .then(res => {
          commit('SET_WATCH_LIST', res.data)
        })
    },
    ActionAddWatchList: ({commit}, payload) => {
      storange.setHeaderToken(storange.getLocalToken())
      return http.post(http.api + '/v1/interest_lists/add_watch_list', payload)
        .then(res => {
          commit('SET_WATCH_LIST', res.data)
        })
    },
    ActionCreateInterestList: ({commit}, payload) => {
      storange.setHeaderToken(storange.getLocalToken())
      return http.post(http.api + '/v1/interest_lists/create', payload)
        .then(res => {
          commit('SET_INTEREST_LIST', res.data)
        })
    },
  }
})
