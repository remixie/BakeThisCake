import Vue from "vue";
import Vuex from "vuex";
import mainMenu from "@/store/mainMenu";
import Cake from "@/store/Cake";
import Settings from "@/store/Settings";
import Ingredient from "@/store/Ingredient";
import Keyboard from "@/store/Keyboard";
import Core from "@/store/Core";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    mainMenu,
    Cake,
    Settings,
    Ingredient,
    Keyboard,
    Core
  }
});
