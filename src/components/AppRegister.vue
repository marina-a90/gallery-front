<template>
    <div class="container">
        <h1>Registration</h1>

        <div v-if="errors.length" class="alert-danger mt-3">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="(error, index) in errors" :key="error[index]">{{ error }}</li>
            </ul>
        </div>

        <form @submit.prevent="registerHandle">
            <div class="mb-3">
                <label for="first_name">First name:</label><br>
                <input 
                    type="text" 
                    name="first_name" 
                    v-model="input.first_name" 
                    required="required"
                    placeholder="First name"
                />
            </div>
            <div class="mb-3">
                <label for="last_name">Last name:</label><br>
                <input type="text" 
                    name="last_name" 
                    v-model="input.last_name" 
                    required="required"
                    placeholder="Last name"
                />
            </div>
            <div class="mb-3">
                <label for="email">Email:</label><br>
                <input 
                    type="email" 
                    name="email" 
                    v-model="input.email" 
                    required="required"
                    placeholder="Email"
                />
            </div>
            <div class="mb-3">
                <label for="password">Password:</label><br>
                <input 
                    type="password" 
                    name="password" 
                    v-model="input.password" 
                    required="required"
                    minlength="8"
                    placeholder="Password"
                />
            </div>
            <div class="mb-3">
                <label for="password_confirmation">Confirm password:</label><br>
                <input 
                    type="password" 
                    name="password_confirmation" 
                    v-model="input.password_confirmation"
                    required="required"
                    minlength="8"
                    placeholder="Confirm password"
                />
            </div>
            <div class="mb-3">
                <input 
                    type="checkbox" 
                    name="accepted_terms" 
                    v-model="input.accepted_terms" 
                    required="required" 
                    class="mr-1"
                />
                <label for="accepted_terms">I accept the terms and conditions</label>
            </div>
            <div>
                <button type="submit">Register</button>
            </div>
        </form>
    </div>
</template>

<script>
import { authService } from '@/services/Auth'
import { mapMutations, mapActions } from 'vuex'

export default {
    data () {
        return {
            errors: [],
            input: {
                first_name: null,
                last_name: null,
                email: null,
                password: null,
                password_confirmation: null,
                accepted_terms: false
            }
        }
    },

    methods:{
        ...mapActions([
            'register', 
            'login', 
            'signedInStatusChange']),

        ...mapMutations(['isSignedInChange']),

        async registerHandle () {
            try {
                await this.register(this.input)
                this.checkForm();
                if (this.errors.length) {
                    return;
                }
                this.login({email: this.input.email, password: this.input.password})
                this.signedInStatusChange() 
                this.$router.push("{ name: 'galleries' }");
            }
            catch (e) {
                alert(e.response.data.message);
                localStorage.removeItem('token')
                return;
            }
        },

        checkForm (error) {
            this.errors.splice(0);

            if (!this.input.first_name) {
                this.errors.push('First name is required.');
            }
            if (!this.input.last_name) {
                this.errors.push('Last name is required.');
            }
            if (!this.input.email) {
                this.errors.push('Email is required.');
            }
            if (!this.input.password) {
                this.errors.push('Password is required.');
            }
            if (!this.input.password_confirmation) {
                this.errors.push('Password confirmation is required.');
            }
            if (!this.input.accepted_terms) {
                this.errors.push('You need to accept the terms and conditions befor you proceed proceed.');
            }
            if (this.input.password !== this.input.password_confirmation) {
                this.errors.push('Passwords need to match.');
            }
        }
    }
}
</script>

<style>

</style>
