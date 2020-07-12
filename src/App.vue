<template>
  <div id="app" :class="{'game-over': isBadEnding, 'horray': isGoodEnding }">
    <MiddleWrapper />
  </div>
</template>

<script>
var Mousetrap = require("mousetrap");
import MiddleWrapper from "@/components/MiddleWrapper.vue";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    MiddleWrapper
  },
  computed: {
    ...mapGetters(["isGoodEnding", "isBadEnding"])
  },
  mounted() {
    var t = this;

    Mousetrap.bind("enter", function(e) {
      t.$store.dispatch("checkLetter", e.key);
    });
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Black+Ops+One&display=swap");

html,
body {
  height: 100%;
  background: repeating-linear-gradient(
    -45deg,
    rgb(35, 150, 252),
    rgb(35, 150, 252) 20px,
    rgb(34, 163, 252) 20px,
    rgb(34, 163, 252) 40px
  );
}
#app {
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#app.game-over {
  background: repeating-linear-gradient(
    -45deg,
    black,
    black 20px,
    red 20px,
    red 40px
  );
}
#app.horray {
  background: repeating-linear-gradient(
    -45deg,
    #fffb7c,
    #fffb7c 20px,
    orange 20px,
    orange 40px
  );
}

.btn-outline-light {
  font-family: "Black Ops One", cursive;
}
</style>
