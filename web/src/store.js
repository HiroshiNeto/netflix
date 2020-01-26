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
    watchList: [],
    moviesViewed: [],
    movies: []
  },
  getters: {
    hasToken (state) {
      return !!state.token
    },
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
    },
    getMoviesViewed (state) {
      return state.moviesViewed
    },
    getMovies (state) {
      return state.movies
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
    },
    SET_MOVIES_VIEWED (state, payload) {
      state.moviesViewed = payload
    },
    SET_MOVIES (state, payload) {
      state.movies = payload
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
      storange.setHeaderToken('')
      storange.deleteLocalToken()
      storange.deleteCurrentUser()
      storange.deleteCurrentProfile()
      dispatch('ActionSetToken', '')
    },
    ActionCheckToken: ({ dispatch, state }) => {
      if (state.token) {
        return Promise.resolve(state.token)
      }
      const token = storange.getLocalToken()
      if (!token) {
        return Promise.reject(new Error('Token Inválido'))
      }
      dispatch('ActionSetToken', token)
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
    ActionDeleteInterestList: ({}, id) => {
      storange.setHeaderToken(storange.getLocalToken())
      return http.delete(http.api + '/v1/interest_lists/' + id)
    },
    ActionDeleteWatchList: ({}, id) => {
      storange.setHeaderToken(storange.getLocalToken())
      return http.delete(http.api + '/v1/interest_lists/' + id)
    },
    ActionUpdateViewed:({}, id) => {
      storange.setHeaderToken(storange.getLocalToken())
      return http.patch(http.api + '/v1/interest_lists/' + id + '/update_viewed')
    },
    ActionListMoviesViewed: ({commit}, currentProfile) => {
      storange.setHeaderToken(storange.getLocalToken())
      return http.get(http.api + '/v1/profiles/' + currentProfile.id +'/movies_viewed')
        .then(res => {
          commit('SET_MOVIES_VIEWED', res.data)
        })
    },
    ActionSearchMovie: ({commit},term) => {
      storange.setHeaderToken(storange.getLocalToken())
      return http.get(http.api + '/v1/movies/' + term )
        .then(res => {
          commit('SET_MOVIES', res.data)
        })
    },
    ActionCreateAccount: ({ dispatch }, payload) => {
      storange.setHeaderToken(storange.getLocalToken())
      return http.post(http.api + '/v1/accounts/create', payload)
        .then(res => {
          dispatch('ActionSetToken', res.data.token)
        })
    }
  }
})
