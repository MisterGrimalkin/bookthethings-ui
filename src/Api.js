// import React from 'react';
import axios from 'axios';

class Api {
    static axios() {
        return axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            timeout: 5000,
            headers: {'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1NzM2NTcwNDV9.4zYM_7ARGgbe7E2H5N2RcomNW85hOAXdjyFkd52zBls'}
        });
    }
}

export default Api;
