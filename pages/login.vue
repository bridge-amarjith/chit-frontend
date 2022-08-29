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
                <b-form-input id="email" v-model="loginform.email" type="email" placeholder="Enter email" :class="{
                  'is-invalid': submitted && $v.loginform.email.$error,
                }"></b-form-input>
              </div>
              <div v-if="submitted && $v.loginform.email.$error" class="alert alert-danger">
                <span v-if="!$v.loginform.email.required">Username is Required</span>
                <span v-if="!$v.loginform.email.email">Enter valid Email address</span>
              </div>
              <div class="mt-2">
                <b-form-input id="password" v-model="loginform.password" type="password" placeholder="Enter password"
                  :class="{
                    'is-invalid': submitted && $v.loginform.password.$error,
                  }"></b-form-input>
              </div>
              <div v-if="submitted && $v.loginform.password.$error" class="alert alert-danger">
                <span v-if="!$v.loginform.password.required">password is Required</span>
                <span v-if="!$v.loginform.password.minLength">Minimum 8 characters needed</span>
              </div>
              <div></div>
              <div class="d-flex justify-content-end">
                <b-button type="submit" class="mt-2" :disabled="loginClicked === true">login</b-button>
              </div>
            </b-form>
          </b-card>
        </div>
      </div>
      <div class="text-center ma-2">
        <v-snackbar v-model="snackbar" :color="color" :timeout="snackTime">
          {{  snackbartext  }}
        </v-snackbar>
      </div>
    </div>
  </template>
  <script>
  import { required, minLength, email } from "vuelidate/lib/validators";
  export default {
    data() {
      return {
        loginClicked: false,
        loginform: {
          email: "",
          password: "",
        },
        submitted: false,
        snackbar: false,
        snackbartext: '',
        color: '',
        snackTime: 2000,
      };
    },
    validations: {
      loginform: {
        email: { required, email },
        password: { required, minLength: minLength(8), },
      },
    },
    methods: {
      errorhandler($err) {
        this.snackbar = true
        this.snackbartext = $err
        this.color = 'error'
        this.loginClicked = false
      },
      async userLogin() {
        this.submitted = true;
        this.$v.$touch()
        if (this.$v.$invalid) {
          return
        } else {
          let response = await this.$auth.loginWith("local", {
            data: this.loginform,
          })
            .then((response) => {
              this.snackbar = true
              this.snackbartext = 'Logged in successfully'
              this.color = 'success'
              this.$router.push("/" + response.data.role.toLowerCase() + "/dashboard");
            })
            .catch((error) => {
              if (error.response) {
                if (error.response.status === 401) {
                  this.snackbar = true
                  this.snackbartext = error.response.data.message
                } else if (error.response.status === 404) {
                  this.snackbar = true
                  this.snackbartext = error.response.data.message
                }
              } else if (error.request) {
                this.errorhandler('Please try again')
              } else {
                this.errorhandler('Error: 924')
              }
            })
  
        }
      },
    },
  };
  </script>