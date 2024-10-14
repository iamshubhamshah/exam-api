import React, {useState, useContext} from 'react';
import * as XLSX from 'xlsx';
import BulkUploadService from '../services/BulkUploadService';
import {PDFDocument, rgb} from 'pdf-lib';

import { UserContext } from "./ContextApi/UserContextAPI/UserContext";

export default function BulkUpload() {

    const { user } = useContext(UserContext);

    let isRegisteredBy = user.mobile;


    const [file, setFile] = useState(null);
    const [students, setStudents] = useState ([]);

    const handleFileChange =(e)=>{
        setFile(e.target.files[0]);
    };

    const handleSubmit =async(e)=>{
        e.preventDefault();
        if(!file) return;

        const formData = new FormData();
        formData.append('file', file); // 'file' should match the field name in multer
        formData.append('isRegisteredBy', isRegisteredBy);
        try {
            const response = await BulkUploadService.BulkPost(formData);
            console.log('Response:', response.data);

            //Here is the logic when the data is successfully updated in the backend, then from the frontend side only, we will show the user a pdf template having student names in it for official stamp of the school.
            
            if(response.data.success){
                const studentNames = response.data.data.map(student =>student.name);
                setStudents(studentNames);

                await generatePDF(studentNames);

            }

            
        } catch (error) {
            console.error('Error uploading file:', error);
            
        }
    };

    const generatePDF = async (studentNames) =>{
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 400]);
        const {width, height} = page.getSize();

        page.drawText('Registered Students', {
            x: 50,
            y: height - 50,
            size: 30,
            color: rgb(0, 0, 0),
        });

        studentNames.forEach((name, index)=>{
            page.drawText(name, {
                x: 50,
                y: height - 100 - (index * 20),
                size: 12,
                color: rgb(0, 0, 0),
            });
        });
        
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type='file' accept='.xlsx, .xls' onChange={handleFileChange}/>
            <button type='submit'>Upload</button>
        </form>
    )

}