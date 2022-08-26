<template>
  <div class="container mt-5">
    <div class="row d-flex justify-content-center">
      <div class="col-md-7">
        <b-card>
          <div class="d-flex justify-content-center">
            <h3>Login</h3>
          </div>

          <b-form @submit.prevent="userLogin">
            <div class="mt-2">
              <b-form-input
                id="email"
                v-model="loginform.email"
                type="email"
                placeholder="Enter email"
                required
              ></b-form-input>
            </div>
            <div class="mt-2">
              <b-form-input
                id="password"
                v-model="loginform.password"
                type="password"
                placeholder="Enter password"
                required
              ></b-form-input>
            </div>
            <div>
                
            </div>
            <div class="d-flex justify-content-end">
              <b-button type="submit" class="mt-2">login</b-button>
            </div>
          </b-form>
        </b-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    middleware: 'auth',
  data() {
    return {
      loginform: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith("local", { data: this.loginform })
          this.$router.push('/dashboard')
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>