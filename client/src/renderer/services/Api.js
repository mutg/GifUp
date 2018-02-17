import axios from 'axios'

var inst = axios.create({
  baseURL: __API__
})

export default {
  joinRoom (name) {
    return inst.post('join', {room: name})
  }
}
