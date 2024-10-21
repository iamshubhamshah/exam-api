import React, {useState, useContext} from 'react';
import * as XLSX from 'xlsx';
import BulkUploadService from '../services/BulkUploadService';
import jsPDF from 'jspdf';

import { UserContext } from "./ContextApi/UserContextAPI/UserContext";

//____________________________________
//Creating a modal component to show the popup for (i am keeping this on hold for the time being taking time)



export default function BulkUpload() {

    const { user } = useContext(UserContext);

    let isRegisteredBy = user.mobile;


    const [file, setFile] = useState(null);
    const [uploadedData, setUploadedData] = useState(null)

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
            
            setUploadedData(response.data)

            console.log(uploadedData)



            
        } catch (error) {
            console.error('Error uploading file:', error);
            
        }
    }


    return (
        <div>
        <form onSubmit={handleSubmit}>
            <input type='file' accept='.xlsx, .xls' onChange={handleFileChange}/>
            <button type='submit'>Upload</button>
        </form>

        
            
              
                {/* <pre>{JSON.stringify(uploadedData.data.srn, null, 2)}</pre> Pretty print the uploaded data */}

                
       
       
       {uploadedData && uploadedData.data ? (
         <div>
         <table>
             <tr>
             <th>srn</th>
             <th>name</th>
             <th>school</th>
             </tr>
             <tbody>
                 {uploadedData.data.map((student, index)=>(
                     <tr key={index}>
                         <td>{student.srn}</td>
                         <td>{student.name}</td>
                         <td>{student.father}</td>
                     </tr>
                 ))}
           
             </tbody>
         </table>
     </div>
       ):(<p>No data available</p>)}
        </div>
    )

}