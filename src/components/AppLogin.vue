<template>
    <div class="container">
        <form @submit.prevent="handleLogin">
            <div class="mb-3">
                <label for="email">Email:</label><br>
                <input type="text" name="email" v-model="email"/>
            </div>
            <div class="mb-3">
                <label for="password">Password:</label><br>
                <input type="password" name="password" v-model="password"/>
            </div>
            <div>
                <button type="submit">Log in</button>
            </div>
        </form>
    </div>
</template>

<script>
import { authService } from '@/services/Auth'
import { mapActions } from 'vuex'

export default {
    data () {
        return {
            password: '',
            email: ''
        }
    },
    methods: {
        ...mapActions(['login']),

        async handleLogin () {
            try {
                await this.login({
                email: this.email,
                password: this.password
                })
                console.log('logged in')
                this.$router.push({ name: 'galleries' })
            } 
            catch (e) {
                console.log(e)
            }
        }
    }
}
</script>