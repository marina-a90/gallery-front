<template>
    <div class="mb-3">
        <h1>Gallery</h1>

        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand class="navbar-brand">
                <router-link :to="{ name: 'galleries' }">
                    All Galleries
                </router-link>
            </b-navbar-brand>
            <b-navbar-brand class="navbar-brand">My Galleries</b-navbar-brand>
            <b-navbar-brand class="navbar-brand">Create New Gallery</b-navbar-brand>
            <b-navbar-brand class="navbar-brand">Register</b-navbar-brand>
            <b-navbar-brand class="navbar-brand">
                 <router-link :to="{ name: 'login' }">
                    Login
                </router-link>
            </b-navbar-brand>
            <b-navbar-brand class="navbar-brand" @click="handleLogout">
                Logout
            </b-navbar-brand>
        </b-navbar>
    </div>
</template>

<script>
import { authService } from '@/services/Auth'
import { mapActions } from 'vuex'

export default {
    methods: {
        ...mapActions(['logout']),

        handleLogout () {
            this.logout()
            console.log('logged out')
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>
    h1 {
        text-decoration: underline;
        color: white;
        background-color: rgb(23, 162, 184);
        margin: auto;
        text-align: center;
    }
</style>
