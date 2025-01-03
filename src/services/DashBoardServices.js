//Here I am writing the logci for calling on DashBoardController.js in backend from DashBoardRoute.js in backend.


import axios from 'axios';
const BaseURL = process.env.REACT_APP_API_BASE_URL;

class DashBoardService {
    getDashBoard8 () {
        const url = `${BaseURL}/api/Dashboard-8`
        return axios.get(url)
    };

    getDashBoard10 () {
        const url = `${BaseURL}/api/Dashboard-10`
        return axios.get(url)
    }

    GetAllStudentData (query) {
        const url = `${BaseURL}/api/Students-data?${query}`
        return axios.get(url);
    }
}

export default new DashBoardService();