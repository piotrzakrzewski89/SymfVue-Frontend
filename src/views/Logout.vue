<template>
  <div class="padding">
    <h1>Widok tylko dla zalogowanych !</h1>
    <div v-if="auth">
      <h2>Gratuluje udalo Ci sie zalogować !!!</h2>
      <h4>Czas autowylogowania</h4>
      <h3>{{ expiresLogin }}</h3>
      <b-button block size="lg" @click="logout" variant="danger">Wyloguj</b-button>
    </div>
    <div v-else>
      <h2>Brak dostepu do tresci !!!</h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expiresLogin: localStorage.getItem("expires"),
    };
  },
  computed: {
    auth() {
      return this.$store.getters.isAuth;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
