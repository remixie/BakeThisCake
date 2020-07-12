<template>
  <b-row v-if="isMainMenu">
    <b-col>
      <b-button variant="outline-light" @click="loadGame">Play</b-button>
    </b-col>
    <b-col>
      <b-button variant="outline-light" @click="loadSettings">Settings</b-button>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "MainMenu",
  computed: mapGetters(["isMainMenu"]),
  methods: mapActions(["loadGame", "loadSettings"])
};
</script>
<style scoped>
.col button {
  width: 100%;
}
</style>
