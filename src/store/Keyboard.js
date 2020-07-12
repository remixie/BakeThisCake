import {
  MODE_KEYBOARD_SHOW,
  SPACEBAR_INCLUDE,
  SPACEBAR_DISPLAY,
  VALID_KEYBOARD_CHARACTERS
} from "@/util/constants";

export default {
  state: { keyboard_mode: 0, spacebar_mode: true, keys_remaining: [], },
  getters: {
    getKeysRemaining: state => state.keys_remaining,
    getKeysRemainingLowercase: state =>
      state.keys_remaining.map(n => n.toLowerCase()),
    showKeyboard: state => {
      return state.keyboard_mode == MODE_KEYBOARD_SHOW;
    },
    isSpacebarIncluded: state => state.spacebar_mode
  },
  mutations: {
    removeLetter(state, letter) {
      if (state.keys_remaining.indexOf(letter) > -1) {
        state.keys_remaining.splice(
          state.keys_remaining.indexOf(letter),
          1
        );
      }
    },
    setKeyboard(state, bool) {
      state.keyboard_mode = bool;
    },
    toggleSpacebarMode(state) {
      state.spacebar_mode =
        state.spacebar_mode == SPACEBAR_INCLUDE
          ? SPACEBAR_DISPLAY
          : SPACEBAR_INCLUDE;
    },
    resetKeys(state) {
      state.keys_remaining = [...VALID_KEYBOARD_CHARACTERS];
      state.spacebar_mode == SPACEBAR_INCLUDE ? state.keys_remaining.push(" ") : "";
    }
  },
  actions: {
    resetKeys: ({ commit }) => commit("resetKeys"),
    removeLetter: ({ commit }, letter) => commit("removeLetter", letter),
    setKeyboard: ({ commit }, bool) => commit("setKeyboard", bool),
    toggleSpacebarMode({ commit }) {
      commit("toggleSpacebarMode");
    }
  }
};
