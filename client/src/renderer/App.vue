<template>
  <v-app id="app" dark>
    <v-system-bar  id="title-bar" window>
      <span>GifUp</span>
      <v-spacer></v-spacer>
      <div class="system-bar-buttons">
        <div @click="browserwindow.minimize()" class="system-button"><i class="material-icons">remove</i></div
        ><div @click="!browserwindow.isMaximized() ? browserwindow.maximize() : browserwindow.unmaximize()" class="system-button"><i class="material-icons">check_box_outline_blank</i></div
        ><div @click="browserwindow.close()" class="system-button"><i class="material-icons">close</i></div>
      </div>
    </v-system-bar>
    <v-content style="position: relative;">
      <transition :duration="350" name="scale-fade">
        <router-view
          @join-room="joinRoom"
          @leave-room="leaveRoom"
          @send-message="sendMessage"
        />
      </transition>
    </v-content>
  </v-app>
</template>

<script>

/*
      console.log(data)
      this.$store.dispatch('addMessage', data)

      let BrowserWindow = this.$electron.remote.BrowserWindow
      var win = new BrowserWindow(
        {
          height: 10,
          width: 10,
          resizable: false,
          frame: false
        }
      )

      let url = process.env.NODE_ENV === 'development'
        ? `http://localhost:${process.env.PORT}`
        : `file://${__dirname}`
        
      win.loadURL(`${url}/image.html`)

      win.webContents.on('did-finish-load', () => {
        win.webContents.send('load-image', data.url)
      })
*/
  import Socket from '@/services/Socket'


  export default {
    name: 'App',
    methods: {
      joinRoom (session) {
        this.$store.dispatch('setSession', session)
        this.socket = new Socket(session.token)
        this.socket.on('message', this.onMessage)
        this.socket.on('close', function() {

        })
      },
      sendMessage (data) {
        this.socket.send(data)
      },
      leaveRoom () {
        this.$store.dispatch('clearSession')
        this.socket.close()
      },
      onMessage (message) {

        let BrowserWindow = this.$electron.remote.BrowserWindow
        var win = new BrowserWindow(
          {
            height: 10,
            width: 10,
            resizable: false,
            frame: false
          }
        )

        let url = process.env.NODE_ENV === 'development'
          ? `http://localhost:${process.env.PORT}`
          : `file://${__dirname}`
          
        win.loadURL(`${url}/image.html`)

        win.webContents.on('did-finish-load', () => {
          win.webContents.send('load-image', message.data.url)
        })
        this.$store.dispatch('addMessage', message)

      }
    },
    computed: {
      maximized () {
        return this.browserwindow.isMaximized()
      }
    },
    data () {
      return {
        browserwindow: null,
        socket: null
      }
    },
    created () {
      this.browserwindow = this.$electron.remote.getCurrentWindow()
    }
  }
</script>

<style>
  /* CSS */
body, html {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#title-bar {
  -webkit-app-region: drag;
  user-select: none !important;
  cursor: default;
  z-index: 200;
}

.system-button {
  cursor: pointer;
  display: inline-block;
  height: 100%;
  font-size: 1.9em;
  width: 36px;
}

.system-button:hover {
  background-color: gray;
}

.system-bar-buttons {
  -webkit-app-region: no-drag;
  text-align: center;
  height: 100%;
}

.scale-fade-enter-active,
.scale-fade-leave-active {
  transition: 0.3s;
  position: absolute;
  top: 0;
  left: 0;
}

.scale-fade-enter {
  opacity: 0;
  transform: scale(0);
}

.scale-fade-enter-to {
  opacity: 1;
  transform: scale(1);
}

.scale-fade-leave-to {
  transform: scale(2);
  opacity: 0;
}

</style>
