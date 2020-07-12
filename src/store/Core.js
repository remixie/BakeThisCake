import $socket from "@/socket-instance";
import { decryptWord, apply } from "@/util/encryption";
var Mousetrap = require("mousetrap");
import {
  ENDING_GOOD,
  ENDING_BAD,
  ENDING_NONE
} from "@/util/constants";

export default {
  state: {
    ending: 0
  },
  getters: {
    getEnding: state => state.ending,
    hasNotEnded: state => state.ending == ENDING_NONE,
    isGoodEnding: state => state.ending == ENDING_GOOD,
    isBadEnding: state => state.ending == ENDING_BAD
  },
  mutations: {

    setEnding(state, ending) {
      state.ending = ending;
    }
  },
  actions: {
    endGame: ({ dispatch, commit }, ending) => {
      dispatch("setKeyboard", false);
      commit("setEnding", ending);
    },
    reset({ dispatch, commit }){
      commit("setEnding", ENDING_NONE);
      dispatch("resetKeys");
      dispatch("resetIngredient");
      dispatch("setWrong", 0);
    },
    setGameKeyBindings({dispatch, rootGetters}){
      Mousetrap.reset();

      var character_list = rootGetters.getKeysRemaining.concat(
        rootGetters.getKeysRemainingLowercase.concat("enter")
      );
      character_list =
        rootGetters.isSpacebarIncluded
          ? character_list.concat("space")
          : character_list;

      Mousetrap.bind(character_list, function (e) {
        dispatch("checkLetter", e.key);
      });
    },
    socket_deliverWords({dispatch}, word){
      const applyToWord = apply(word);
        dispatch(
          "setCurrentIngredient",
          applyToWord(atob, decryptWord, atob, decryptWord)
        );
        dispatch("setCurrentSolved");
    },
    loadGame({ dispatch}) {

      $socket.emit("newGameRequest");

      dispatch("reset");
      dispatch("setGameKeyBindings");
      dispatch("setMainMenu", false);
      dispatch("setKeyboard", true);
    }
  }
};
