import axios from 'axios';

const url_cors = 'https://cors-anywhere.herokuapp.com';

const api = axios.create({
    baseURL: `${url_cors}/https://pullrequestgithub.herokuapp.com/`,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },

});

export default api;