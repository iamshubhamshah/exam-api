import axios from 'axios';

class UserService {
    PostUser(formData) {
        const url = "https://exam-api-backend.vercel.app/api/user"
        const config = {
            headers: {
                'content-type':'multipart/form-data',
            }
        };
        return axios.post(url, formData, config);

    }

    GetUser (mobile) {
     const  url = `https://exam-api-backend.vercel.app/api/userByMobile/${mobile}`
        
        return axios.get(url)

    } 
}

export default new UserService();