//This component will have the admit card for Level 1, 2, 3.
import React, {useState, useEffect, useContext} from 'react';
import {Card, Button} from 'react-bootstrap';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'


//so to allow hindi font in jspdf we have to get the ttf font from google.
//then convert it into base64 string using onlne converter
//then concate the const, refer base64EncodedFont.js, 
// now import here

// import {hindiFontBase64} from './base64EncodedFont';






export default function AdmitCard () {


    function DownloadAdmitCard () {
        const pdf = new jsPDF("p", "mm", "a4");


       

        const admitHrLogo = "/admitHrLogo.png"
        const vikalpaLogo = "/vikalpalogo.png"
        const buniyaadLogo = "/admitBuniyaLogo.png"

        
        
        //Add logo hrLogo to the left side:
        pdf.addImage(admitHrLogo, "PNG", 10, 10, 20, 20)
        pdf.addImage(buniyaadLogo, "PNG", 180, 10, 20, 20)

        //Adding hindi images, cause can't use hindi text

        pdf.addImage("/Name.png", "PNG", 25, 59, 10, 5)
        pdf.addImage("/Father's Name.png", "PNG", 39, 65.5, 14.5, 7)

    

        pdf.setFontSize(12);
        pdf.text('Directorate of School Education (DSE) Shiksha Sadan, Haryana', 105, 20, {align: "center"})
        pdf.setFontSize(12);
        pdf.text('#ExamType var# Level 1 Exam (2024-26)', 105, 25, {align:'center'})
        pdf.setFontSize(10);
        pdf.text('E-Admit Card', 105, 30, {align:'center'})
        pdf.setFontSize(10);
        pdf.text('Examination Date: 30th January', 105, 35,{align:'center'})
        pdf.setFontSize(10);
        pdf.text('Reporting Time: #var# AM, Exam Time: #var# AM', 105, 40, {align:"center"})
        
          // Table data
          const rows = [
            ["Name", "var"],
            ["Father's Name", "var"],
            ["Date of Birth", "var"],
            ["Category", "var"],
            ["SRN", "var" ],
            ["Exam Roll Number", "var"],
            ["Aadhar Number", "var"],
            ["Mobile Number", "var"],
            ["District", "var"],
            ["Block", "var"],
            ["Examination Center", "var"]

        ];

        // Generate table
        autoTable(pdf, {
            head: [['Field', 'Value']],
            body: rows,
            startY: 50, // Adjust starting Y position
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
                0: { cellWidth: 70 }, // Column 1 width
                1: { cellWidth: 50 }, // Column 2 width
            },

            
        });
        

        pdf.rect(140, 50, 50,50)

        //Save pdf
        pdf.save("dummyAdmit")



    }


    return (
        <>
        
        <Button onClick={DownloadAdmitCard}>Download Admit Card</Button>
        
        </>

    )

}