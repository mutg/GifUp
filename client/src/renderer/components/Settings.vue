<template>
  <v-container fill-height fluid>
    <v-layout column>
      <v-flex>
        <h1>Settings</h1>
      </v-flex>
      <v-flex xs12 class="scrollable">
        <v-list two-line subheader>
          <v-subheader>General</v-subheader>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Profile photo</v-list-tile-title>
              <v-list-tile-sub-title>Change your Google+ profile photo</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>Show your status</v-list-tile-title>
              <v-list-tile-sub-title>Your status is visible to everyone</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex>
        <v-layout row-reverse>
          <v-flex>
            <v-btn @click="$router.push({name: 'root'})">Save</v-btn>
          </v-flex>     
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {

}
</script>

<style scoped>
.scrollable {
  overflow-y: auto;
  height: 0px;
}
</style>
