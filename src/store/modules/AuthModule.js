import { authService } from '@/services/Auth';

export const AuthModule = {
    actions: {
        async login (context, credentials) {
            await authService.login(credentials)
        }, 

        logout (context) {
            authService.logout()
            alert('Successfully logged out!')
        },

        async register (context, credentials) {
            await authService.register(credentials)
        }
    }
}