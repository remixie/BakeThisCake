import {
  ENDING_BAD,
  ENDING_GOOD,
  LETTER_CHARACTER_PLACEHOLDER,
} from "@/util/constants";

export default {
  state: {
    current_ingredient: "",
    current_solved: ""
  },
  getters: {

    getCurrentIngredient: state => state.current_ingredient,
    getCurrentSolved: state => state.current_solved
  },
  mutations: {
    setCurrentIngredient(state, payload) {
      state.current_ingredient = payload;
    },
    setCurrentSolved(state, isSpacebarIncluded) {
      state.current_solved =
        isSpacebarIncluded
          ? state.current_ingredient.replace(/./g, LETTER_CHARACTER_PLACEHOLDER)
          : state.current_ingredient.replace(
            /\S/g,
            LETTER_CHARACTER_PLACEHOLDER
          );
    },

    setRight(state, letter) {
      [...state.current_ingredient.toUpperCase()].forEach((item, index) => {
        const word = state.current_solved;
        if (item === letter) {
          state.current_solved =
            word.substr(0, index) +
            state.current_ingredient[index] +
            word.substr(index + 1);
        }
      });
    },
    resetIngredient(state) {
      state.current_solved = "";
      state.current_ingredient = "";
    }
  },
  actions: {
    resetIngredient: ({ commit }) => commit("resetIngredient"),
    setCurrentSolved: ({ commit, rootGetters }) => commit("setCurrentSolved", rootGetters.isSpacebarIncluded),
    setCurrentIngredient: ({ commit }, payload) =>
      commit("setCurrentIngredient", payload),
    checkLetter({ dispatch, commit, getters, rootGetters }, letter) {

      letter = letter.toUpperCase();
      if (rootGetters.hasNotEnded && rootGetters.getKeysRemaining.includes(letter) &&
        rootGetters.showKeyboard) {
        if (!getters.getCurrentIngredient.toUpperCase().includes(letter)) {
          dispatch("setWrong");
        } else {
          commit("setRight", letter);
        }
        dispatch("removeLetter", letter);

        if (
          rootGetters.getWrongLetterCount == rootGetters.getWrongLetterMax
        ) {
          dispatch("endGame", ENDING_BAD);
        } else if (
          rootGetters.getCurrentSolved == rootGetters.getCurrentIngredient &&
          rootGetters.getCurrentIngredient != ""
        ) {
          dispatch("endGame", ENDING_GOOD);
          commit("setWrong", "baked");
        }

      }

      if (letter == "ENTER" && !rootGetters.showKeyboard) {
        dispatch("loadGame");
      }
    }
  }
};
