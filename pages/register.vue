<template>
  <div class="container mt-5">
    <div class="row d-flex justify-content-center">
      <div class="col-md-7">
        <b-card>
          <div class="d-flex justify-content-center">
            <h3>Register</h3>
          </div>

          <b-form @submit.prevent="userReg">
            <div class="mt-2">
              <b-form-input
                id="name"
                v-model="loginform.name"
                placeholder="Enter name"
                required
              ></b-form-input>
            </div>
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
            <div class="mt-2">
              <b-form-input
                id="phoneno"
                v-model="loginform.phoneno"
                type="number"
                placeholder="Enter phoneno"
                required
              ></b-form-input>
            </div>
            <div class="d-flex justify-content-end">
              <b-button type="submit" class="mt-2">Submit</b-button>
            </div>
          </b-form>
        </b-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginform: {
        email: "",
        name: "",
        password: "",
        phoneno: "",
      },
    };
  },
  methods: {
    async userReg() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.loginform,
        });
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>