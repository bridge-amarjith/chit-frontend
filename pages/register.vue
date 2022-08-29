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
            <div class="d-flex justify-content-end">
              <b-button type="submit" class="mt-2">Submit</b-button>
            </div>
          </b-form>
        </b-card>
      </div>
    </div>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar">
        {{  snackbartext  }}

        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>

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
      snackbar: false,
      snackbartext: '',
      snackTime: 2000,
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
    errorhandler($err) {
      this.snackbar = true
      this.snackbartext = $err
      this.color = 'error'
    },
    async userReg() {
      this.submitted = true;
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      } else {
        let res = await this.$axios.post('/registration', this.regForm)
          .then(() => {
            this.snackbar = true
            this.snackbartext = 'Registerd Successfully'
            this.color = 'success'
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