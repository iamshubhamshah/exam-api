import axios from 'axios';

class BulkUploadService {

    BulkPost (excelData) {
        const url = "https://exam-api-backend.vercel.app/api/bulkupload"
        return axios.post(url, excelData); // No need for custom headers
    }

}

export default new BulkUploadService ();