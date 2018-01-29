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
      <transition name="scale-fade">
        <router-view></router-view>
      </transition>
    </v-content>
   
  </v-app>
</template>

<script>


  export default {
    name: 'gifup',
    computed: {
      maximized () {
        return this.browserwindow.isMaximized()
      }
    },
    data () {
      return {
        browserwindow: null,
        items: [
          {
            title: 'Super chat',
            icon: null
          }
        ]
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
