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
        <span class="headline"><span style=""> {{ currentRoomName }} </span></span>
        <v-btn
          flat
          @click="leave()"
        >
        leave
        </v-btn>
      </v-flex>
      <v-flex class="scrollable" xs12>
        <v-list>
          <v-list-tile v-for="(message, index) in roomMessages" :key="index">
            <v-list-tile-content>
              <a @click="clickurl" :href="message.data.url">{{message.data.url}}</a>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex>
        <v-layout>
          <v-flex xs12>
            <v-text-field v-model="link" @keypress="keypress" single-line label="URL" />
          </v-flex>
        </v-layout>
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
  import Api from '@/services/Api'
  import axios from 'axios'
  import https from 'https'

  export default {
    computed: {
      currentRoomName () {
        return this.$store.state.Session.room.name
      },
      inRoom () {
        return this.$store.state.Session.inRoom
      },
      roomMessages () {
        return this.$store.state.Session.room.messages
      }
    },
    methods: {
      keypress (event) {
        if(event.key === "Enter") {
          let link = this.link
          this.link = ''
          try {
            https.get(link, (res) => {
              if (
                res.headers['content-type'] === 'image/jpeg' || 
                res.headers['content-type'] === 'image/jpg' ||
                res.headers['content-type'] === 'image/gif' ||
                res.headers['content-type'] === 'image/png'
              ) {
                this.sendMessage(link)
              }
            })
          } catch (error) {
            
          }
          
        }
      },
      clickurl (event) {
        event.preventDefault();
        this.$electron.shell.openExternal(event.target.href);
      },
      sendMessage (message) {
        this.$emit('send-message', { url: message } )
      },
      leave () {
        this.$emit('leave-room')
      },
      joinRoom (room_name) {
        Api.joinRoom(room_name).then( response => {
          this.$emit('join-room', response.data.session)          
          this.joinroom = false
        })
        .catch( error => {
          this.join_room_error = error.response.data.error
        })
      }
    },
    data () {
      return {
        join_room_error: null,
        room_name: null,
        joinroom: false,
        fab: false,
        link: ''
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
