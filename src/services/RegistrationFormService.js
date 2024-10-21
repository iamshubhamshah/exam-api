// Using Axios for http method



import axios from 'axios';
const BaseURL = process.env.REACT_APP_API_BASE_URL;

class RegistrationService {
    RegistrationCreate (formData) {
        const url = `${BaseURL}/api/MB-Form`
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            }
        };
        return axios.post(url, formData, config)
    }

    getPosts () {
        const url = "${BaseURL}/api/MB-Form/all" //for dashboard component
        return axios.get(url)
    }

    deletePosts (id) {
        const url = `${BaseURL}/api/MB-form/delete/`+id;
        return axios.delete(url);
    }

    getPostsBySrn(srn) {
        const url = `${BaseURL}/api/MB-form/getPostBySrn/${srn}`; //for input srn component, prefilled form
        return axios.get(url);
    }

    updatePostsById(id, formData) {
        const url = `${BaseURL}/api/MB-form/updatePostsBySrn/${id}`;
        return axios.put(url, formData); // Pass the formData here
    }

    
}



// Create an instance of RegistrationService
const registrationServiceInstance = new RegistrationService();

// Export the instance
export default registrationServiceInstance;