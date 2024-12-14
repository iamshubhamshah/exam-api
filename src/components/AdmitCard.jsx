//This component will have the admit card for Level 1, 2, 3.
import React, {useState, useEffect, useContext} from 'react';
import {Card, Button} from 'react-bootstrap';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'

//Importing student context api
import { StudentContext } from './ContextApi/StudentContextAPI/StudentContext';





export default function AdmitCard () {

 const {student} = useContext(StudentContext);
 const {setStudent} = useContext(StudentContext); 

    async function DownloadAdmitCard () {
        const pdf = new jsPDF("p", "mm", "a4");


       

        const admitHrLogo = "/admitHrLogo.png"
        const vikalpaLogo = "/vikalpalogo.png"
        const buniyaadLogo = "/admitBuniyaLogo.png"

        
        
        //pdf header image

        pdf.addImage("/pratibhakhoj.png", "PNG",  100, 15, 18, 6 );

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
        pdf.addImage("/District.png", "PNG", 27, 104.5, 10, 5);
        pdf.addImage("/Block.png", "PNG", 25, 112.5, 9, 4);
        pdf.addImage("/Pariksha kendra.png", "PNG", 47, 120, 15, 5);
        pdf.addImage("/admitinstructions2.png", 5,132,198,135)
        pdf.addImage("/studentsignature.png", "PNG", 5, 280, 198, 5)

    
        pdf.setFontSize(10);
        pdf.text('E-Admit Card', 105, 10, {align:'center'})
        pdf.setFontSize(12);
        pdf.text('Directorate of School Education (DSE) Shiksha Sadan, Haryana', 105, 15, {align: "center"})

        // pdf.setFontSize(8)
        // pdf.text('Pratibha Khoj hind', 100, 20)
        pdf.setFontSize(12);
        pdf.text('#EXAM TYPE VAR#', 105, 25, {align:'center'})
        pdf.setFontSize(10);
        pdf.text('Level-1 Entrance Exam (2025-27)', 105, 30, {align:'center'})
        pdf.setFontSize(10);
        pdf.text('Examination Date: #var#', 105, 35,{align:'center'})
        pdf.setFontSize(10);
        pdf.text('Reporting Time: #var# AM, Exam Time: #var# AM', 105, 40, {align:"center"})
        
          // Table data
          const rows = [
            ["Name", student.name ],
            ["Father's Name", student.father],
            ["Date of Birth", student.dob],
            ["Category", student.category],
            ["SRN", student.srn ],
            ["Exam Roll Number", student.rollNumber],
            ["Aadhar Number", student.aadhar],
            ["Mobile Number", student.mobile],
            ["District", student.district],
            ["Block", student.block],
            ["Examination Center", student.L1examinationCenter]

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

        const admitImage = student.imageUrl

        const getBase64ImageFromURL = async (url) => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.crossOrigin = "anonymous"; // To avoid CORS issues
              img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                const dataURL = canvas.toDataURL("image/png"); // Specify "image/jpeg"
                resolve(dataURL);
              };
              img.onerror = (err) => reject(err);
              img.src = url;
            });
          };

        

          const base64Image =  await getBase64ImageFromURL("https://vikalpaexamination.blr1.digitaloceanspaces.com/postImages/1732949096681-10 buniyaad 001 (7).jpg");

          console.log('i am base64image below')
          console.log(base64Image);

          pdf.addImage(base64Image, "PNG", 20, 20, 50, 50);

        // pdf.addImage(admitImage,"PNG", 166, 42.5, 100,100)
        
        const photoText = `If no photograph
        is available, paste a 
        school-attested photograph here.`
      
        pdf.setFontSize(7);
        pdf.text(photoText, 185, 55,{align:'center'})
        pdf.rect(166, 42.5, 38,38)
        //Save pdf
        pdf.save(`${student.name}_${student.srn}_Admit-Card.pdf`)

        

    }


    return (
        <>
        
        <Button onClick={DownloadAdmitCard}>Download Admit Card</Button>
        
        </>

    )

}