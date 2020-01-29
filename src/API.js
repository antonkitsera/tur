import axios from 'axios'

let API = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "/api",
    timeout: 60000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
    }
});

export function forceLogout() {
    localStorage.clear();
    window.location = '/';
}

export default API
