<template>
  <b-row
    v-if="showKeyboard"
  >
    <b-col class="text-center">
      <b-button
        v-for="(data, index) in getKeysRemaining"
        :key="`l-${index}`"
        variant="outline-light"
        @click="checkLetter(data)"
      >
        {{ data === ' ' && isSpacebarIncluded ? 'Space' : data }}
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Keyboard",
  data: function() {
    return {};
  },
  computed: mapGetters([
    "getKeysRemaining",
    "getCurrentIngredient",
    "showKeyboard",
    "isSpacebarIncluded"
  ]),
  methods: mapActions(["checkLetter"])
};
</script>

<style scoped>
h1 {
  color: white;
}

.btn-outline-light {
  margin: 5px;
}
</style>
