<template>
  <div>
    <h1>LOGOWANIE</h1>
    <b-alert v-if="loginError" variant="danger" show>Nieprawidłowe dane logowania !!!</b-alert>

    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-1"
        label="Password:"
        label-for="input-1"
        description="We'll never share your Password with anyone else."
      >
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          placeholder="Enter pass"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginError: false,
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      await this.$store.dispatch("login", {
        email: this.form.email,
        password: this.form.password,
      });
      if (localStorage.getItem("loginError")) {
        this.loginError = true;
      } else {
        this.loginError = false;
      }
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.password = "";
    },
  },
};
</script>
