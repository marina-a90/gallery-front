import axios from 'axios'

class Auth {

    constructor () {
        const token = localStorage.getItem('token')

        if (token) {
            // this.setAuthorizationHeader(token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
    }

    async register (input) {
        const response = await axios.post('http://localhost:8000/api/auth/register', input);
        console.log('service register')
        console.log(response)
        const token = response.data.access_token
        localStorage.setItem('token', token)
        // this.setAuthorizationHeader(token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        // RADI
        let user_id = response.data.user.id
        console.log(user_id)
        localStorage.setItem('user_id', user_id)
        //
    }

    async login (credentials) {
        const response = await axios.post('http://localhost:8000/api/auth/login', credentials);
        console.log('logujem login resp')
        console.log(response)
        console.log('LOGGED IN');
        console.log('service login')
        const token = response.data.access_token
        localStorage.setItem('token', token)
        this.setAuthorizationHeader(token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

        //
        let user_id = response.data.user.id
        console.log('user id iz logina')
        console.log(user_id)
        localStorage.setItem('user_id', user_id)
    }

    isAuthenticated () {
        return !!localStorage.getItem('token')
    }

    logout () {
        localStorage.removeItem('token')
        axios.post('http://localhost:8000/api/auth/logout') 
        console.log('service logout')
    }

    setAuthorizationHeader (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    getUserIDFromLS () {
        return localStorage.getItem('user_id');
    }

    setUserIDFromLS () {
        localStorage.setItem('user_id', user_id)
    }
}


export const authService = new Auth()