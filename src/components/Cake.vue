<template>
  <b-row>
    <b-col class="cake">
      <img class="mx-auto" :src="require(`@/assets/cake/${getWrongLetterCount}.gif`)" width="200px" />
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Cake",
  data: function() {
    return {};
  },
  computed: mapGetters(["getWrongLetterCount"])
};
</script>

<style scoped>
.cake {
  text-align: center;
  margin: 30px 0px 30px 0px;
}
</style>
