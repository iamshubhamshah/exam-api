//This api downloads the template for BulkUpload functionality.
// User will get the prefilled district, block, school in this bulk upload functionality.

import React from 'react';  
import { Button } from 'react-bootstrap';
import * as XLSX from 'xlsx';

//accepting th props as district, block , school coming from BulkUploadWithDistBC component

export default function BulkUploadTemplate ({district, block, school}) {
    
    const TemplateData = [];

// Below loop creates a number of rows in which we need the disrict, block, school to be printed.


const DownloadTemplate =()=>{

for (let i = 0; i<10; i++){
    TemplateData.push ({
        srn: '', // Empty field for user input
                name: '',
                father: '',
                mother: '',
                dob: '',
                gender: '',
                category: '',
                aadhar: '',
                mobile: '',
                whatsapp: '',
                address: '',
                district: district || '', // Prefilled district names
                block: block || '', // Prefilled block names
                school: school || '', // Prefilled school names
                schoolCode: '' // Empty field for school code
    })
}

const worksheet = XLSX.utils.json_to_sheet(TemplateData);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');
XLSX.writeFile(workbook, 'Student_Template.xlsx')

}

    return(
    <div>
        <Button onClick={DownloadTemplate}>DownloadTemp</Button>
    </div>
    );
}