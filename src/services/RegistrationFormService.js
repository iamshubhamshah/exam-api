// Using Axios for http method

import axios from 'axios';

class RegistrationService {
    RegistrationCreate (formData) {
        const url = "http://localhost:8000/api/MB-Form"
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            }
        };
        return axios.post(url, formData, config)
    }

    getPosts () {
        const url = "http://localhost:8000/api/MB-Form/all" //for dashboard component
        return axios.get(url)
    }

    deletePosts (id) {
        const url = "http://localhost:8000/api/MB-form/delete/"+id;
        return axios.delete(url);
    }

    putPosts(srn) {
        const url = `http://localhost:8000/api/MB-form/getPostBySrn/${srn}`; //for input srn component, prefilled form
        return axios.get(url);
    }

    putPostsBySrn(srn, formData) {
        const url = `http://localhost:8000/api/MB-form/updatePostsBySrn/${srn}`;
        return axios.put(url, formData); // Pass the formData here
    }
}



// Create an instance of RegistrationService
const registrationServiceInstance = new RegistrationService();

// Export the instance
export default registrationServiceInstance;