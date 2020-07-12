<template>
  <div>
    <div
      class="message"
      :class="wordClass"
    >
      {{ message }}
    </div>
  </div>
</template>

<script>
import { ENDING_NONE, ENDING_GOOD, ENDING_BAD } from "@/util/constants";
export default {
  name: "Ingredient",
  computed: {
    message() {
      const {
        getEnding,
        getCurrentSolved,
        getCurrentIngredient
      } = this.$store.getters;
      const messages = {
        [ENDING_NONE]: getCurrentSolved,
        [ENDING_GOOD]: `You added ${getCurrentIngredient}. The demon perished. Horray!`,
        [ENDING_BAD]: "Game Over"
      };
      return messages[getEnding];
    },
    wordClass() {
      const { getEnding } = this.$store.getters;
      return {
        "message--word": getEnding == ENDING_NONE
      };
    }
  }
};
</script>

<style>
.message {
  color: white;
  font-size: 40px;
  text-align: center;
  font-family: "Black Ops One", cursive;
}

.message--word {
  letter-spacing: 16px;
}
</style>
