// Here we write the logic for calling on DistrictBlockSchool api in DistrictBlockSchool rout, which are linked with DistrictBlockSchoolController in the backend.

import axios from 'axios';

class DistrictBlockSchoolService {
    getDistricts () {
        const url = "http://localhost:8000/api/Fetch-districts"
        return axios.get(url)
    };

    getBlocks () {
        const url = "http://localhost:8000/api/Fetch-blocks"
        return axios.get(url)

    };

    getSchools () {
        const url = "https://exam-api-backend.vercel.app/api/Fetch-schools"
        return axios.get(url)

    }
}

export default new DistrictBlockSchoolService();