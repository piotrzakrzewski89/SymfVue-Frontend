<template>
  <b-jumbotron class="full-height white-bg">
    <p>{{ currentDate() }}</p>
    <img alt="Vue logo" src="../assets/logo.png" />
    Moja experymentalna piaskownica !
    <br /><br />
    <ul class="fa-ul">
      <li><i class="fas fa-check-square"></i> Logowanie,rejestracja oraz mail z potwierdzeniem rejestracji</li>
      <li><i class="fas fa-spinner fa-pulse"></i> Wiadomosci z bledami przy logowaniu</li>
      <li><i class="far fa-square"></i> Operacje w tabeli tylko na swoich wpisach</li>
    </ul>
  </b-jumbotron>
</template>

<script>
export default {
  name: "home",
  methods: {
    currentDate() {
      return new Date().toLocaleString();
    },
  },
};
</script>

<style>
.full-height {
  height: 100%;
}

.white-bg {
  background: #fff !important;
}
</style>
