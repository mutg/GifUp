<template>
  <v-container fluid fill-height>
    <v-dialog
      v-model="joinroom"
      width="300"
    >
    <v-card>
      <v-card-text>
        <v-text-field v-model="room_name" label="Room name"></v-text-field>
        <div>{{join_room_error}}</div>
        <v-btn @click="joinRoom(room_name)" block>OK</v-btn>        
      </v-card-text>
    </v-card>
    </v-dialog>
    <div v-if="!inRoom" class="center">
      <v-btn @click="joinroom = true">Enter a room</v-btn>
    </div>
    <v-layout v-else column>
      <v-flex>
        <span class="headline"><span style="">{{currentRoomName}}</span></span>
        <v-btn
          flat
          @click="leave()"
        >
        leave
        </v-btn> <v-btn @click="sendMessage()">#dev send message</v-btn>
      </v-flex>
      <v-flex class="scrollable" xs12>
        <v-list>
          <v-list-tile v-for="i in 20" :key="i">
            <v-list-tile-content>
              <span>Test {{i}}</span>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
    <v-btn
      fab
      fixed
      bottom
      right
      @click="$router.push({name: 'settings'})"
    >
      <v-icon>settings</v-icon>
    </v-btn>

  </v-container>
</template>

<script>
  import SocketIO from '@/services/socketio'

  export default {
    computed: {
      currentRoomName () {
        return this.$store.state.Room.room_name
      },
      inRoom () {
        return this.$store.state.Room.inRoom
      },
      roomMessages () {
        return this.$store.state.Room.messages
      }
    },
    methods: {
      sendMessage () {
        SocketIO.emit('image-posted', 'https://randomuser.me/api/portraits/men/'+Math.round(Math.random())+'.jpg', (error) => {
          if (error) {
            console.log(error)
          }
        })
      },
      leave () {
        SocketIO.emit('leave-room', this.currentRoomName, () => {
          this.$store.dispatch('leaveRoom', this.currentRoomName)
        })
      },
      joinRoom (room_name) {
        SocketIO.emit('join-room', room_name, (error) => {
          if (error) {
            this.join_room_error = error
          } else {
            this.joinroom = false
            this.$store.dispatch('setRoomName', room_name)
          }
        })
      }
    },
    data () {
      return {
        join_room_error: null,
        room_name: null,
        joinroom: false,
        fab: false,
      }
    },
    watch: {
    }
  }
</script>

<style scoped>
.scrollable {
  overflow: auto;
  height: 0px;
}
.center {
  position: absolute;
  text-align: center;
  transform: translate(-50%,-50%);
  top: 50%;
  left: 50%;
}
</style>
