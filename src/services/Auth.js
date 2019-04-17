import axios from 'axios'

class Auth {

    constructor () {
        const token = localStorage.getItem('token')

        if (token) {
            this.setAuthorizationHeader()
        }
    }

    async register (input) {
        try {
            const response = await axios.post('http://localhost:8000/api/auth/register', input);
            console.log(response)
            const token = response.data.access_token
            localStorage.setItem('token', token)
            this.setAuthorizationHeader()
        }
        catch (e) {
            console.log(e)
        }
    }

    async login (credentials) {
        try {
            const response = await axios.post('http://localhost:8000/api/auth/login', credentials);
            const token = response.data.access_token
            localStorage.setItem('token', token)
            this.setAuthorizationHeader()
        }
        catch (e) {
            console.log(e)
        }
    }

    isAuthenticated () {
        return !!localStorage.getItem('token')
    }

    logout () {
        localStorage.removeItem('token')
        axios.post('http://localhost:8000/api/auth/logout') 
    }

    setAuthorizationHeader () {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
}

export const authService = new Auth()