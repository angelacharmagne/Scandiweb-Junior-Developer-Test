import { createStore } from 'vuex'

export default createStore({
  state: {
    products: [],
  },
  mutations: {
    SET_PRODUCTS: (state, status) => {
      state.products = status;
    },
    ADD_PRODUCT: (state, status) => {
      state.products.push(status);
    },
    DELETE_PRODUCT: (state, status) => {
      state.products = state.products.filter(element => element.sku !== status);
    },
  },
  actions: {
    setProducts: ({ commit }, payload) => {
      commit("SET_PRODUCTS", payload);
    },
    addProduct: ({ commit }, payload) => {
      commit("ADD_PRODUCT", payload);
    },
    delete_Product: ({ commit }, payload) => {
      commit('DELETE_PRODUCT', payload);
    },
  },
  modules: {

  }
})
