<template>
  <div v-if="getEnding != 0">
    <b-button variant="outline-light" @click="loadGame">Replay</b-button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Restart",
  computed: mapGetters(["getEnding"]),
  methods: mapActions(["loadGame"])
};
</script>
<style scoped>
div {
  text-align: center;
}
</style>
