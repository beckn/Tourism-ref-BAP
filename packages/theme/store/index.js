const actions = {
  async onAuthStateChangedAction(state, { authUser }) {
    if (!authUser) {
      // remove state
      state.commit('SET_USER', null);

      // redirect from here
      this.$router.push({
        path: '/Login'
      });
    } else {
      const { uid, email, Aa } = authUser;
      state.commit('Set_token', Aa);

      //localStorage.setItem('token', Aa);
      state.commit('SET_USER', {
        uid,
        email,
        Aa
      });
      this.$router.go(-2);
    }
  },
  setTransactionId({ commit }, data) {
    commit('Set_TransactionId', data);
  },
  settoken({ commit }, data) {
    commit('Set_token', data);
  },
  setcartData({ commit }, data) {
    commit('Set_cartData', data);
  },
  setbilling_address({ commit }, data) {
    commit('Set_billing_address', data);
  },
  setshipping_address({ commit }, data) {
    commit('Set_shipping_address', data);
  },
  setcurrentOrderId({ commit }, data) {
    commit('Set_currentOrderId', data);
  },
  setorderProgress({ commit }, data) {
    commit('Set_orderProgress', data);
  },
  setorderHistory({ commit }, data) {
    commit('Set_orderHistory', data);
  },
  setorderObject({ commit }, data) {
    commit('Set_orderObject', data);
  },
  setncodedOrderDetails({ commit }, data) {
    commit('Set_ncodedOrderDetails', data);
  },
  setserchstring({ commit }, data) {
    commit('Set_serchstring', data);
  }
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  Set_TransactionId(state, data) {
    state.TransactionId = data;
  },
  Set_token(state, data) {
    state.token = data;
  },
  Set_cartData(state, data) {
    state.cartData = data;
  },
  Set_billing_address(state, data) {
    state.billing_address = data;
  },
  Set_shipping_address(state, data) {
    state.shipping_address = data;
  },
  Set_currentOrderId(state, data) {
    state.currentOrderId = data;
  },
  Set_orderProgress(state, data) {
    state.orderProgress = data;
  },
  Set_orderHistory(state, data) {
    state.orderHistory = data;
  },
  Set_orderObject(state, data) {
    state.orderObject = data;
  },
  Set_ncodedOrderDetails(state, data) {
    state.ncodedOrderDetails = data;
  },
  Set_serchstring(state, data) {
    state.serchstring = data;
  }
};

const state = () => ({
  user: null,
  TransactionId: '',
  token: '',
  cartData: '',
  billing_address: '',
  shipping_address: '',
  currentOrderId: '',
  orderProgress: null,
  orderHistory: '',
  orderObject: '',
  ncodedOrderDetails: '',
  serchstring: ''
});

const getters = {
  getUser(state) {
    return (
      state.user,
      state.TransactionId,
      state.token,
      state.billing_address,
      state.shipping_address,
      state.currentOrderId,
      state.orderProgress,
      state.orderHistory,
      state.orderObject,
      state.ncodedOrderDetails,
      state.serchstring
    );
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
