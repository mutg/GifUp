const state = {
  room_name: null,
  inRoom: false,
  messages: []
}

const mutations = {
  SET_ROOM_NAME (state, value) {
    state.room_name = value
    state.inRoom = true
  },
  LEAVE_ROOM (state) {
    state.room_name = null
    state.inRoom = false
    state.messages = []
  },
  PUSH_MESSAGE (state, value) {
    state.messages.push(value)
  },
  CLEAR_MESSAGES (state) {
    state.messages = []
  }
}

const actions = {
  setRoomName ({ commit }, value) {
    // do something async
    commit('SET_ROOM_NAME', value)
  },
  leaveRoom ({ commit }) {
    commit('LEAVE_ROOM')
  },
  addMessage({ commit }, message) {
    commit('PUSH_MESSAGE', message)
  },
  clearMessages ({ commit }) {
    commit('CLEAR_MESSAGES')
  }
}

export default {
  state,
  mutations,
  actions
}
