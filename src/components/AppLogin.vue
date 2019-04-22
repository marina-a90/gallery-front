<template>
    <div class="container">
        <form @submit.prevent="handleLogin">
            <div class="mb-3">
                <label for="email">Email:</label><br>
                <input type="text" name="email" v-model="email" required/>
            </div>
            <div class="mb-3">
                <label for="password">Password:</label><br>
                <input type="password" name="password" v-model="password" required/>
            </div>
            <div>
                <button type="submit">Log in</button>
            </div>
        </form>
    </div>
</template>

<script>
import { authService } from '@/services/Auth'
import { mapActions, mapMutations } from 'vuex'

export default {
    data () {
        return {
            password: '',
            email: ''
        }
    },
    methods: {
        ...mapActions(['login', 'signedInStatusChange', 'fetchUserID']),

        ...mapMutations(['isSignedInChange']),

        async handleLogin () {
            try {
                await this.login({
                    email: this.email,
                    password: this.password
                })
                this.signedInStatusChange(),
                this.fetchUserID()
                this.$router.push('/galleries')
            } 
            catch (e) {
                const error = JSON.parse(e.request.response)
                this.error = error.error
                alert(this.error)
                localStorage.removeItem('token')
                return;
            }
        }
    }
}
</script>