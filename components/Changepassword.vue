<template>
    <b-form @submit.prevent="changePassoword">
        <div class="mt-2">
            <b-form-input id="oldpassword" v-model="changePass.oldpassword" type="password"
                placeholder="Enter current password" :class="{
                    'is-invalid': submitted && $v.changePass.oldpassword.$error,
                }"></b-form-input>
        </div>
        <div v-if="submitted && $v.changePass.oldpassword.$error" class="alert alert-danger">
            <span v-if="!$v.changePass.oldpassword.required">old password is Required</span>
            <span v-if="!$v.changePass.oldpassword.minLength">Minimum 8 characters needed</span>
        </div>
        <div class="mt-2">
            <b-form-input id="newpassword" v-model="changePass.newpassword" type="password"
                placeholder="Enter new password" :class="{
                    'is-invalid': submitted && $v.changePass.newpassword.$error,
                }">
            </b-form-input>
        </div>
        <div v-if="submitted && $v.changePass.newpassword.$error" class="alert alert-danger">
            <span v-if="!$v.changePass.newpassword.required">new password is Required</span>
            <span v-if="!$v.changePass.newpassword.minLength">Minimum 8 characters needed</span>
        </div>
        <div class="mt-2">
            <b-form-input id="confirmnewpassword" v-model="changePass.confirmnewpassword" type="password"
                placeholder="Enter new confirm password" :class="{
                    'is-invalid': submitted && $v.changePass.confirmnewpassword.$error,
                }">
            </b-form-input>
        </div>
        <div v-if="submitted && $v.changePass.confirmnewpassword.$error" class="alert alert-danger">
            <span v-if="!$v.changePass.confirmnewpassword.required">confirm password is Required</span>
            <span v-if="!$v.changePass.confirmnewpassword.minLength">Minimum 8 characters needed</span>
            <span v-if="!$v.changePass.confirmnewpassword.sameAsPassword">password not match with above new
                password</span>
        </div>
        <div class="d-flex justify-content-end">
            <b-button type="submit"
                class="text-white bg-zinc-900 hover:bg-primary-700 rounded-lg text-sm px-5 py-2.5 text-center mt-2">
                Reset passwod</b-button>
        </div>

    </b-form>
</template>
<script>
import { required, minLength, sameAs } from "vuelidate/lib/validators";
export default {
    middleware: ['auth'],
    name: "Changepassword",
    // reciving prop from admin profile page
    props: [
        'changePass'
    ],
    data() {
        return {
            submitted: false,
        };
    },
    validations: {
        changePass: {
            oldpassword: { required, minLength: minLength(8), },
            newpassword: { required, minLength: minLength(8), },
            confirmnewpassword: { required, minLength: minLength(8), sameAsPassword: sameAs('newpassword') },
        }
    },
    methods: {
        async changePassoword() {
            this.submitted = true;
            this.$v.$touch()
            if (this.$v.$invalid) {
                // if invalid stop here
                return
            } else {
                let response = await this.$axios.post('/changepassword', this.changePass)
                    .then((response) => {
                        this.snackbar = true
                        this.snackbartext = 'password changed successfully'
                        this.color = 'success'
                        console.log(response);
                    })
                    .catch((error) => {
                        if (error.response) {
                            if (error.response.status === 401) {
                                console.log(error.response.data.message)
                            }
                        } else if (error.request) {
                            console.log('Please try again')
                        } else {
                            console.log('Error: 924')
                        }
                    })

            }
        }
    }
}
</script>