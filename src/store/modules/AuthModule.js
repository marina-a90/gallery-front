import { authService } from '@/services/Auth';

export const AuthModule = {
    actions: {
        async login (context, credentials) {
            await authService.login(credentials)
            console.log('store login')
        }, 

        logout (context) {
            authService.logout()
            console.log('store logout')
            alert('Successfully logged out!')
        },

        async register (context, credentials) {
            await authService.register(credentials)
            console.log('store register')
        }
    }
}