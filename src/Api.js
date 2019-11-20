import {bake_cookie, read_cookie, delete_cookie} from 'sfcookies';
import axios from 'axios';

class Api {

    static init() {
        Api.axios = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            timeout: 5000,
            headers: {'Authorization': read_cookie("token")}
        });
        Api.callbacks = [];
        Api.user = null;
    }

    static connection() {
        return Api.axios;
    }

    static alertError(error) {
        window.alert(error.response.data.message);

    }

    static loggedIn() {
        return read_cookie("token").length > 0;
    }

    static onUserLoaded(callback) {
        Api.callbacks.push(callback);
        if (Api.user != null) {
            callback.call(this, Api.user);
        }
    }

    static loadUser() {
        Api.connection().get("/user")
            .then((response) => {
                Api.user = response.data;
                Api.callbacks.forEach((callback) => {
                    callback.call(this, response.data);
                });
            })
            .catch((error) => {
                console.log(error.response);
                if (error.response != null && error.response.status == 422) {
                    Api.logout();
                } else {
                    window.alert(error)
                }
            });
    }

    static login(email, password, onError) {
        Api.connection().post("/auth/login", {email: email, password: password})
            .then((response) => {
                bake_cookie("token", response.data.auth_token);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
                onError.call(this, error);
            });
    }

    static logout() {
        delete_cookie("token");
        window.location.reload();
    }

}

export default Api;
