<template>
  <div v-if="isSettingsVisible">
    Is Spacebar a play key? {{ isSpacebarIncluded ? "Yes" : "No" }}
    <br />
    <br />
    <b-button variant="outline-light" @click="toggleSpacebarMode">Toggle Spacebar Mode</b-button>
    <b-button variant="outline-light" @click="closeSettings">Close Settings</b-button>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { SETTINGS_SHOW } from "@/util/constants";
export default {
  name: "Settings",
  methods: mapActions(["closeSettings", "toggleSpacebarMode"]),
  computed: mapGetters(["isSpacebarIncluded", "isSettingsVisible"])
};
</script>
<style scoped>
div {
  color: white;
  text-align: center;
}
</style>