import { SETTINGS_SHOW, SETTINGS_HIDE } from "@/util/constants";

export default {
  state: {
    settings_mode: 0
  },
  getters: {
    isSettingsVisible: state => state.settings_mode  == SETTINGS_SHOW
  },
  
  mutations: {
    loadSettings(state) {
      state.settings_mode = SETTINGS_SHOW;
    },
    closeSettings(state) {
      state.settings_mode = SETTINGS_HIDE;
    }
  },
  actions: {
    loadSettings({ dispatch, commit }) {
      commit("loadSettings");
      dispatch("setMainMenu", false);
    },
    closeSettings({ dispatch,commit }) {
      commit("closeSettings");
      dispatch("setMainMenu", true);
    }
  },
};
