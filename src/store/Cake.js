export default {
  state: {
    wrong_max: 8,
    wrong_letter_count: 0
  },
  getters: {
    getWrongLetterMax: state => state.wrong_max,
    getWrongLetterCount: state => state.wrong_letter_count
  },
  mutations:{
    setWrong(state, count = -1) {
      state.wrong_letter_count =
        count == -1 ? state.wrong_letter_count + 1 : count;
    },
  },
  actions:{
    setWrong: ({commit},count) => commit("setWrong",count),
  }
};
