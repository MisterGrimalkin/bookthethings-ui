// import React from 'react';
import {bake_cookie, read_cookie, delete_cookie} from 'sfcookies';
import axios from 'axios';

class Api {
    static login(email, password) {
        Api.axios().post("/auth/login", {email: email, password: password})
            .then((response) => {
                bake_cookie("token", response.data.auth_token)
                window.location.reload();
            })
            .catch((error) => {
                window.alert(error);
            });
    }
    static logout() {
        bake_cookie("token", null);
        window.location.reload();
    }
    static loggedIn() {
        return read_cookie("token") != null;
    }
    static axios() {
        return axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            timeout: 5000,
            headers: {'Authorization': read_cookie("token")}
        });
    }
}

export default Api;
