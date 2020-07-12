<template>
  <b-container
    :class="{ 'game-over': isBadEnding, 'horray': isGoodEnding }"
  >
    <Header />
    <Cake />
    <MainMenu />
    <Settings />
    <Ingredient />
    <Keyboard />
    <Restart />
  </b-container>
</template>

<script>
const Header = () => import("@/components/Header");
const Cake = () => import("@/components/Cake");
const MainMenu = () => import("@/components/MainMenu");
const Keyboard = () => import("@/components/Keyboard");
const Settings = () => import("@/components/Settings");
const Ingredient = () => import("@/components/Ingredient");
const Restart = () => import("@/components/Restart");
import { mapGetters } from "vuex";
export default {
  name: "MiddleWrapper",
  components: {
    Header,
    Cake,
    MainMenu,
    Settings,
    Ingredient,
    Keyboard,
    Restart
  },
  computed: mapGetters(["isGoodEnding", "isBadEnding"])
};
</script>

<style scoped>
.container {
  background-color: #0b6feb;
  height: 100%;
}

.game-over {
  background-color: black;
}

.horray {
  background-color: #d230f5;
}
</style>
