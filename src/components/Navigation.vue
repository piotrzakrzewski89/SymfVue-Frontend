<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/table">Tabelka</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/login">Logowanie</router-link> |
    <router-link to="/register">Rejestracja</router-link>
    <router-link v-if="auth" to="/logout"
      >| Zalogowany jako : {{ getEmail }} Wyloguj</router-link
    >
  </div>
</template>

<script>
export default {
  name: "navigation",
  computed: {
    auth() {
      return this.$store.getters.isAuth;
    },
    getEmail() {
      return localStorage.getItem("email");
    },
  },
};
//console.log(localStorage.getItem("email"));
</script>

<style scoped></style>
