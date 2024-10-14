

import axios from 'axios';
const BaseURL = process.env.REACT_APP_API_BASE_URL;

class BulkUploadService {

    BulkPost (excelData) {
        const url = `${BaseURL}/api/bulkupload`
        return axios.post(url, excelData); // No need for custom headers
    }

}

export default new BulkUploadService ();