<template>
  <div>
    <h1>REJESTRACJA</h1>
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
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();

      try {
        //console.log("test event: ", event);
        let adminAuth = await this.axios.post("/authentication_token", {
          email: "admin@apiusers.com",
          password: "7$H$'d>6d}Kp)yn.",
        });
        ///console.log(adminAuth.data.token);
        await this.axios.post(
          "users/register",
          {
            email: this.form.email,
            password: this.form.password,
          },
          {
            headers: { Authorization: "Bearer " + adminAuth.data.token },
          }
        );
        /*
        commit("auth", {
          token: response.data.token,
          userId: userId.data.userId,
        });
        const now = new Date();
        const endDate = new Date(now.getTime() + 30 * 60 * 1000); // 30 minut
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", userId.data.userId);
        localStorage.setItem("email", userId.data.email);
        localStorage.setItem("expires", endDate);

        setTimeout(() => {
          dispatch("logout");
        }, 30 * 60 * 1000);

        await this.$store.dispatch("login", {
          email: this.form.email,
          password: this.form.password,
        });
        */
        this.$router.push({ name: "Login" });
      } catch (e) {
        console.log("Error ", e);
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
