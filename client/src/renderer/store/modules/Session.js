const state = {
  id: null,
  room: {
    name: null,
    messages: []
  },
  inRoom: false
}

const mutations = {
  SET_SESSION (state, value) {
    state.id = value.id
    state.token = value.token
    state.room.name= value.room
    state.inRoom = true
  },
  CLEAR_SESSION (state) {
    state.id = null
    state.token = null
    state.room.name = null
    state.room.messages = []
    state.inRoom = false
  },
  ADD_MESSAGE (state, value) {
    state.room.messages.push(value)
  }
}

const actions = {
  addMessage ({ commit }, message) {
    commit('ADD_MESSAGE', message)
  },
  setSession ({ commit }, session) {
    // do something async
    commit('SET_SESSION', session)
  },
  clearSession ({ commit }) {
    commit('CLEAR_SESSION')
  }
}

export default {
  state,
  mutations,
  actions
}
