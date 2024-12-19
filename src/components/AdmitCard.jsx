//This component will have the admit card for Level 1, 2, 3.
import React, {useState, useEffect, useContext} from 'react';
import {Card, Button} from 'react-bootstrap';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'

//Importing student context api
import { StudentContext } from './ContextApi/StudentContextAPI/StudentContext';
import registrationServiceInstance from '../services/RegistrationFormService';





export default function AdmitCard () {

    const {student} = useContext(StudentContext);
 const {setStudent} = useContext(StudentContext); 

    if (student.rollNumber === ""){
        alert('Admit card will be available for download in 2 days. Please check back then. (एडमिट कार्ड 2 दिन में डाउनलोड के लिए उपलब्ध होगा।')
        return;
    } else  {

    }

 

    async function DownloadAdmitCard () {
        console.log('i am student id')
        console.log(student._id)

        
         //Below var updates the admit card downloading status in the mongodb on the basis of student _id
         const admitCard1 = true
         const id = student._id
         //_________________________________________   

        console.log('i am download admit card function')

        const pdf = new jsPDF("p", "mm", "a4");


       console.log('i am before logo hr')

        const admitHrLogo = "/admitHrLogo.png"
        const buniyaadLogo = "/admitBuniyaLogo.png"

        
        console.log('i am before pratibha khoj logo')
        //pdf header image
        console.log('i am after removing prabibha khoj logo')

        // pdf.addImage("/pratibhakhoj.png", "PNG",  95, 15, 18, 6 );

        //Add logo hrLogo to the left side:
        pdf.addImage(admitHrLogo, "PNG", 10, 5, 20, 20)
        pdf.addImage(buniyaadLogo, "PNG", 180, 5, 20, 20)

        //Adding hindi images, cause can't use hindi text

        pdf.addImage("/Name.png", "PNG", 25, 44, 10, 5);
        pdf.addImage("/Father's Name.png", "PNG", 39, 51.5, 15, 5);
        pdf.addImage("/DOB.png", "PNG", 36, 58.5, 15 , 5);
        pdf.addImage("/Category.png", 30, 66.5, 12, 5);
        pdf.addImage("/SRN.png", "PNG", 24, 74, 15, 5);
        
        pdf.addImage("/Roll number.png", "PNG", 46, 81.5, 15, 5);
        pdf.addImage("/aadhar number.png", "PNG", 41, 89.5, 15, 5);
        pdf.addImage("/Mobile number.png", "PNG", 40, 97.5, 15, 5);
        pdf.addImage("/District.png", "PNG", 36, 104.5, 10, 5);
        pdf.addImage("/Block.png", "PNG", 35, 112.5, 9, 4);
        pdf.addImage("/Pariksha kendra.png", "PNG", 47, 120, 15, 5);
        pdf.addImage("/admitinstructions2.png", 5,132,198,135)
        pdf.addImage("/studentsignature.png", "PNG", 5, 280, 198, 5)
        pdf.addImage("/vikalpaStamp.png", "PNG", 168, 263, 25, 23)

    
        pdf.setFontSize(10);
        pdf.text('E-Admit Card', 105, 10, {align:'center'})
        pdf.setFontSize(12);
        pdf.text('Directorate of School Education (DSE) Shiksha Sadan, Haryana', 105, 15, {align: "center"})

        console.log('i am just after directorate of school')
        // pdf.setFontSize(8)
        // pdf.text('Pratibha Khoj hind', 100, 20)
        // for exam type:

        //below var is to show dynmaic exam type in admit card
        let examtype
        if (student.grade === "8") {
            examtype = "Mission Buniyaad"
        } else { examtype = "Haryana Super 100"}

        pdf.setFontSize(14);
        pdf.text(examtype, 105, 25, {align:'center'})
        pdf.setFontSize(10);
        pdf.text('Level-1 Entrance Exam (2025-27)', 105, 30, {align:'center'})

        //for examination date
        
        pdf.setFontSize(10);
        pdf.text(`Examination Date: ${student.L1examDate}`, 105, 35,{align:'center'})
        pdf.setFontSize(10);
        pdf.text(`Reporting Time: 10:30 AM, Exam Time: ${student.L1examTime}`, 105, 40, {align:"center"})


        console.log(' i am just before formateDATE')

        //Changind date format to dd-mm-yyyy from db
        const formatDate = (dob) => {
            const [year, month, day] = dob.split("-"); // Split the string into year, month, and day
            return `${day}-${month}-${year}`; // Rearrange and join them in dd-mm-yyyy format
          };

        //________________________________________________________

        console.log('i am just before table')
        
          // Table data
          const rows = [
            ["Name", student.name.toUpperCase() ],
            ["Father's Name", student.father.toUpperCase()],
            ["Date of Birth", formatDate(student.dob)],
            ["Category", student.category.toUpperCase()],
            ["SRN", student.srn ],
            ["Exam Roll Number", student.rollNumber],
            ["Aadhar Number", student.aadhar],
            ["Mobile Number", student.mobile],
            ["District/Code", student.L1districtAdmitCard.toUpperCase()],
            ["Block/Code", student.L1blockAdmitCard.toUpperCase()],
            ["Examination Center", student.L1examinationCenter.toUpperCase()]

        ];

        // Generate table
        autoTable(pdf, {
            
            body: rows,
            startY: 43, // Adjust starting Y position
            styles: {
                fillColor: null, // No background color for rows
                textColor: 0, // Black text color
                tableLineColor: [0,0,0],
                lineWidth: 0.5, // Set border line width
                lineColor: 0,
                halign: 'left', // Align text to the left
                valign: 'middle', // Vertically align text in the middle
            },
            headStyles: {
                fillColor: null, // No background color for header
                textColor: 0, // Black text color for header
                tableLineColor: [0,0,0],
                fontStyle: 'normal', // Normal font for header
                lineWidth: 0.5, // Set border line width for header
            },
            alternateRowStyles: {
                fillColor: null, // Remove alternating row background
            },
            //tableLineColor: [0, 0, 0], // Black border color
         //   tableLineWidth: 0.5, // Border thickness
            columnStyles: {
                0: { cellWidth: 50 }, // Column 1 width
                1: { cellWidth: 100 }, // Column 2 width
            },

            
        });

       

    //       // Now use html2canvas to fetch the image and convert it to base64
    // const getImageBase64 = async (imgUrl) => {
    //     return new Promise((resolve, reject) => {
    //       const img = new Image();
    //       img.crossOrigin = "anonymous"; // To handle CORS issues
    //       img.onload = () => {
    //         const canvas = document.createElement("canvas");
    //         const ctx = canvas.getContext("2d");
    //         canvas.width = img.width;
    //         canvas.height = img.height;
    //         ctx.drawImage(img, 0, 0);
    //         resolve(canvas.toDataURL("image/png"));
    //       };
    //       img.onerror = (error) => reject(error);
    //       img.src = imgUrl; // Set the image URL here
    //     });
    //   };
        

        //   const base64Image =  await getImageBase64(admitImage);

        //   console.log('i am base64image below')
        //   console.log(student.imageUrl);

        

          
          

        // pdf.addImage(admitImage,"PNG", 166, 42.5, 100,100)   
        
        console.log('i am just before last if condition photo text')

        if (student.image === null || student.image === "" || student.imageUrl === "") {

            const photoText = `If no photograph
        is available, attach a 
        passport-sized photo attested 
        by the school..`
      
        pdf.setFontSize(8);
        pdf.text(photoText, 183, 55,{align:'center'})


            pdf.rect(166, 42.5, 38,38)

        } else  {
            console.log('I AM BEFORE STUDENT PHOTO')
            pdf.addImage(student.imageUrl, "PNG", 166, 42.5, 38, 38);
        }
        
        //Save pdf
        pdf.save(`${student.name}_${student.srn}_Admit-Card.pdf`)

        //Below api updates the admitCard1 status to true if the card is downloaded

        const formData = new FormData ();
        formData.append("admitCard1", admitCard1)

        try {

            const response = await registrationServiceInstance.patchDownloadAdmitCardById(
                id,
                formData
            )

            console.log('Admit card downloaded')
            
        } catch (error) {
            console.error("Error Downloading Admit Card:", error);
            
        }

    }

    


    return (
        <>
        
        
        <Button id={student._id} onClick={DownloadAdmitCard}>Download Admit Card</Button>
        
        </>

    )

}