import React, {useState} from 'react';
import * as XLSX from 'xlsx';
import BulkUploadService from '../services/BulkUploadService';

export default function BulkUpload() {
    const [file, setFile] = useState(null);

    const handleFileChange =(e)=>{
        setFile(e.target.files[0]);
    };

    const handleSubmit =async(e)=>{
        e.preventDefault();
        if(!file) return;

        const formData = new FormData();
        formData.append('file', file); // 'file' should match the field name in multer
        try {
            const response = await BulkUploadService.BulkPost(formData);
            console.log('Response:', response.data);
            
        } catch (error) {
            console.error('Error uploading file:', error);
            
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type='file' accept='.xlsx, .xls' onChange={handleFileChange}/>
            <button type='submit'>Upload</button>
        </form>
    )

}