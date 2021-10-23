import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    userId: null,
  },
  getters: {
    isAuth: (state) => state.token !== null,
  },
  mutations: {
    auth(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
    },
    clearAuth(state) {
      state.token = null;
      state.userId = null;
    },
  },
  actions: {
    async login({ commit, dispatch }, payload) {
      try {
        console.log(payload);
        let response = await axios.post("/authentication_token", payload);

        let userId = await axios.get("users/me", {
          headers: { Authorization: "Bearer " + response.data.token },
        });
        commit("auth", {
          token: response.data.token,
          userId: userId.data.userId,
        });
        const now = new Date();
        const endDate = new Date(now.getTime() + 30 * 60 * 1000); // 30 minut+
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", userId.data.userId);
        localStorage.setItem("email", userId.data.email);
        localStorage.setItem("expires", endDate);

        setTimeout(() => {
          dispatch("logout");
        }, 30 * 60 * 1000);
        router.push({ name: "Logout" });
      } catch (e) {
        console.log("Error ", e);
        if (e.response.status == 401) {
          console.log("Nieprawidlowe dane logowania ");
          localStorage.setItem("loginError" , true);
        }else{
          localStorage.setItem("loginError" , false); 
        }
      }
    },
    logout({ commit }) {
      commit("clearAuth");
      localStorage.removeItem("token");
      localStorage.removeItem("expires");
      localStorage.removeItem("email");
      localStorage.removeItem("userId");
      router.push({ name: "Home" });
    },
    autologin({ commit, dispatch }) {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const email = localStorage.getItem("email");
      if (!email) {
        return;
      }
      const userId = localStorage.getItem("userId");
      if (!userId) {
        return;
      }
      const expirationDate = new Date(localStorage.getItem("expires"));
      const now = new Date();
      if (now >= expirationDate) {
        localStorage.removeItem("token");
        localStorage.removeItem("expires");
        localStorage.removeItem("email");
        localStorage.removeItem("userId");
        return;
      }
      commit("auth", {
        token,
        userId,
      });
      //console.log(
      //  "Pozostało tyle sekund do autowylogowania: ",
      //  expirationDate.getTime() - now.getTime()
      // );
      setTimeout(() => {
        dispatch("logout");
      }, 30 * 60 * 1000);
    },
    // async checkLogin({commit,state} ){
    // this.$router.push({name:'nazwa strony'}) // przekierowanie
    //}
  },
});
