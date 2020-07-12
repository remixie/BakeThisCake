export default {
  state: { main_menu_mode: true },
  getters: {
    isMainMenu: state => state.main_menu_mode
  },
  mutations: {
    setMainMenu(state, bool) {
      state.main_menu_mode = bool;
    }
  },
  actions: {
    setMainMenu: ({ commit }, bool) => commit("setMainMenu", bool)
  }
};
