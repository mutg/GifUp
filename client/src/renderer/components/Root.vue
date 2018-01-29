<template>
  <v-container fluid fill-height>
    <v-dialog
      v-model="joinroom"
      width="300"
    >
    <v-card>
      <v-card-text>
        <v-text-field label="Room name"></v-text-field>
        <v-btn block>OK</v-btn>        
      </v-card-text>
    </v-card>
    </v-dialog>
    <div v-if="!inRoom" class="center">
      <v-btn @click="joinroom = true">Enter a room</v-btn>
    </div>
    <v-layout v-else column>
      <v-flex>
        In room #¤"#¤ <v-btn>leave</v-btn> <v-btn @click="openWindow()">#dev open win</v-btn>
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
export default {
  methods: {
    openWindow () {
      let BrowserWindow = this.$electron.remote.BrowserWindow
      var win = new BrowserWindow(
        {
          height: 200,
          width: 200,
          resizable: false,
          frame: false,
          parent: this.$electron.remote.getCurrentWindow()
        }
      )
    }
  },
  data () {
    return {
      joinroom: false,
      fab: false,
      inRoom: true
    }
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
