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
            Sign up to your account
          </h1>
          <b-form @submit.prevent="userReg">
            <div class="mt-2">
              <b-form-input id="name" v-model="regForm.name" placeholder="Enter name" :class="{
                'is-invalid': submitted && $v.regForm.name.$error,
              }"></b-form-input>
            </div>
            <div v-if="submitted && $v.regForm.email.$error" class="alert alert-danger">
              <span v-if="!$v.regForm.name.required">Username is Required</span>
              <span v-if="!$v.regForm.name.minLength">Minimum 6 characters needed</span>
            </div>
            <div class="mt-2">
              <b-form-input id="email" v-model="regForm.email" type="email" placeholder="Enter email" :class="{
                'is-invalid': submitted && $v.regForm.email.$error,
              }">
              </b-form-input>
            </div>
            <div v-if="submitted && $v.regForm.email.$error" class="alert alert-danger">
              <span v-if="!$v.regForm.email.required">Email is Required</span>
              <span v-if="!$v.regForm.email.email">Enter valid mail address</span>
            </div>
            <div class="mt-2">
              <b-form-input id="password" v-model="regForm.password" type="password" placeholder="Enter password"
                :class="{
                  'is-invalid': submitted && $v.regForm.password.$error,
                }"></b-form-input>
            </div>
            <div v-if="submitted && $v.regForm.password.$error" class="alert alert-danger">
              <span v-if="!$v.regForm.password.required">Password is Required</span>
              <span v-if="!$v.regForm.password.minLength">Minimum 8 characters needed</span>
            </div>
            <div class="mt-2">
              <b-form-input id="phoneno" v-model="regForm.phoneNo" type="number" placeholder="Enter phoneno" :class="{
                'is-invalid': submitted && $v.regForm.phoneNo.$error,
              }">
              </b-form-input>
            </div>
            <div v-if="submitted && $v.regForm.phoneNo.$error" class="alert alert-danger">
              <span v-if="!$v.regForm.phoneNo.required">PhoneNo is Required</span>
              <span v-if="!$v.regForm.phoneNo.minLength">Minimum 10 digits needed</span>
            </div>
            <div class="mt-2">
              <button type="submit"
                class="w-full text-white bg-zinc-900 hover:bg-primary-700 rounded-lg text-sm px-5 py-2.5 text-center">Sign
                up</button>
            </div>

            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Allready have an account? <NuxtLink to="/login"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</NuxtLink>
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
  data() {
    return {
      regForm: {
        email: "",
        name: "",
        password: "",
        phoneNo: "",
      },
      submitted: false,
    };
  },
  validations: {
    regForm: {
      email: { required, email },
      name: { required, minLength: minLength(4) },
      password: { required, minLength: minLength(8) },
      phoneNo: { required, minLength: minLength(10) }
    }
  },
  methods: {
    async userReg() {
      this.submitted = true;
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      } else {
        let res = await this.$axios.post('/registration', this.regForm)
          .then(() => {
            this.$router.push("/login");
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response)
            }
          })
        console.log(res.data.data);

      }
    },
  },
};
</script>