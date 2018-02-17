<template>
  <v-app id="app">
    <img ref="img" :src="url" />
    <v-icon @click="close()" class="close">close</v-icon>
  </v-app>
</template>

<script>
export default {
  methods: {
    close () { require('electron').remote.getCurrentWindow().close() }
  },
  data () {
    return {
      url: null
    }
  },
  created () {
    require('electron').ipcRenderer.on('load-image', (event, url) => {
      this.url = url
    })

  },
  mounted () {
    this.$refs.img.onload = function() {
      let win = require('electron').remote.getCurrentWindow()
      win.setSize(this.naturalWidth, this.naturalHeight)
    }
  } 
}
</script>

<style>

.close:hover {
  color: whitesmoke;
}

.close {
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  opacity: 0.5;
  top: 0;
  left: 0;
  cursor: pointer;
  -webkit-app-region: no-drag;

}

body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  width: 100%;
  overflow: hidden;
}
img {
  z-index: 0;
  overflow: hidden;
  -webkit-app-region: drag;
}
</style>
