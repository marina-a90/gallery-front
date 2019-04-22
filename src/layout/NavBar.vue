<template>
    <div class="mb-3">
        <h1>Gallery</h1>

        <b-navbar toggleable="lg" type="dark" variant="info" class="navbar-light bg-light">
            <b-navbar-brand class="navbar-brand">
                <router-link :to="{ name: 'galleries' }">
                    All Galleries
                </router-link>
            </b-navbar-brand>

            <b-navbar-brand class="navbar-brand" v-if="isSignedInCheck">
                <router-link :to="{ name: 'my-galleries' }">
                    My Galleries
                </router-link>
            </b-navbar-brand>

            <b-navbar-brand class="navbar-brand" v-if="isSignedInCheck">
                <router-link :to="{ name: 'add-gallery' }">
                    Create New Gallery
                </router-link>
            </b-navbar-brand>

            <b-navbar-brand class="navbar-brand" v-if="!isSignedInCheck">
                <router-link :to="{ name: 'register' }">
                    Register
                </router-link>
            </b-navbar-brand>

            <b-navbar-brand class="navbar-brand" v-if="!isSignedInCheck">
                <router-link :to="{ name: 'login' }">
                    Login
                </router-link>
            </b-navbar-brand>

            <b-navbar-brand class="navbar-brand router-link" @click="handleLogout" v-if="isSignedInCheck">
                <a href="#">Logout</a>
            </b-navbar-brand>
        </b-navbar>
    </div>
</template>

<script>
import { authService } from '@/services/Auth'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    methods: {
        ...mapActions(['logout', 'signedInStatusChange']),

        ...mapMutations(['isSignedInChange']),

        handleLogout () {
            this.logout()
            this.signedInStatusChange()
            localStorage.clear()
            this.$router.push({ name: 'login' })
        }
    }, 

    computed: {
        ...mapGetters(['isSignedInCheck', 'getUserID'])
    }
}
</script>

<style scoped>
    h1 {
        color: blue;
        background-color: #f8f9fa !important;
        margin: auto;
        text-align: center;
    }
</style>
