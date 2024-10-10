import axios from 'axios';

class UserService {
    PostUser(formData) {
        const url = "http://localhost:8000/api/user"
        const config = {
            headers: {
                'content-type':'multipart/form-data',
            }
        };
        return axios.post(url, formData, config);

    }

    GetUser (mobile) {
     const  url = `http://localhost:8000/api/userByMobile/${mobile}`
        
        return axios.get(url)

    } 
}

export default new UserService();