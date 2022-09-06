<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
        SmartChit
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Sign in to your account
          </h1>
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
            <div class="mt-2"> <button type="submit"
                class="w-full text-white bg-zinc-900 hover:bg-primary-700 rounded-lg text-sm px-5 py-2.5 text-center">Sign
                in</button></div>

            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet? <NuxtLink to="/register"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</NuxtLink>
            </p>
          </b-form>
        </div>
      </div>
    </div>
  </section>
</template>
  <script>
  import { required, minLength, email } from "vuelidate/lib/validators";
  export default {
    middleware: 'auth',
    data() {
      return {
        loginClicked: false,
        loginform: {
          email: "",
          password: "",
        },
        submitted: false,
      };
    },
    validations: {
      loginform: {
        email: { required, email },
        password: { required, minLength: minLength(8), },
      },
    },
    methods: {
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
              this.$router.push("/" + response.data.role.toLowerCase() + "/dashboard");
            })
            .catch((error) => {
              if (error.response) {
                if (error.response.status === 401) {
                  console.log(error.response.data.message)
                } else if (error.response.status === 404) {
                  console.log(error.response.data.message)
                }
              } else if (error.request) {
                console.log('Please try again')
              } else {
                console.log('Error: 924')
              }
            })
  
        }
      },
    },
  };
  </script>