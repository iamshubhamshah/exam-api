
import React, { useState, useEffect, useContext } from "react";
import RegistrationFormService from "../services/RegistrationFormService";
// import InputSrn from "./InputSrn";
import { Form, Navigate, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
import DependentDropComponent from "./DependentDropComponent";
import {Card} from 'react-bootstrap';
import { StudentContext } from "./ContextApi/StudentContextAPI/StudentContext";
import { UserContext } from "./ContextApi/UserContextAPI/UserContext";

import AcknowledgementSlip from "./AcknowledgementSlip";

function PreFilledRegistrationForm () {

let isRegisteredBy;

const {user} = useContext(UserContext)

//Below varibale is the useNavigate function of react. it is used when a condtion is true then it helps to navigate to the desired route.
    const navigate = useNavigate();
//____________________________________________________________________


//Below uses the useLocation state for passing the state values from other component to this component. it only happens when we come to this page immediately from previous page. 
//in this case we come to this page onl after srn value in the input box matches with the db. For the prefilled form functionlaity.
//Well we are getting value of srn and id of that srn from inputsrn component.
    const location = useLocation();
    const srnFromInput = location.state?.srn || ""; 
    const idFormInput = location.state?.id ||"";
    const srnFromAck = location.state?.srn || "";
    const idFromAck = location.state?.id || "";
//______________________________________________________________
    
    
    

  //below useState hook is for setting StudentContext.js API...
  const {setStudent} = useContext(StudentContext);
//__________________________________________________________

//Below are the useState hook for if the user updates his values then these hooks helps to set the state and post the data to db.
    const [id, setId] = useState('');
    const [srn, setSrn] = useState('');
    const [name, setName] = useState('');
    const [father, setFather] = useState('');
    const [mother, setMother] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [category, setCategory] = useState('');
    const [aadhar, setAadhar] = useState('');
    const [mobile, setMobile] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [address, setAddress] = useState('');
    const [district, setDistrict] = useState('');
    const [block, setBlock] = useState('');
    const [school, setSchool] = useState('');
    const [grade, setGrade] = useState('');
    const [image, setImage] = useState(''); // For file uploads
    const [message, setMessage] = useState('');
    const [schoolCode, setSchoolCode] = useState('');

    if(user){
        isRegisteredBy = user.mobile;
    } else {
        isRegisteredBy = 'Self'
    }

    const [manualSchool, setshowManualSchool] = useState(false);

    const [slipData, setSlipData] = useState({});

    const [showAck, setShowAck] = useState(false);
    //_________________________________________________________________

    //Below states will be used to lift the state and pass it to DependentDropDown component for prefilling of <select> object.



    //using StudentContex.js api...
    const {student} = useContext(StudentContext);
    //_______________________________________________

    //If verification status Filled then show the Ack first:
   ;
//    setSrn(student.srn);
    
    

// Below fetchPosts function is using the useLocation state to pass the 'srn' value in below fetchposts function.
    const fetchPosts = async (srn) => {
        
        if (!srn) return;

      try {
        const response = await RegistrationFormService.getPostsBySrn(srn); //here we get the object of only passed srn, in a getPostsBySrn method.
        const pull = response.data.data;
        setStudent(pull) //Here we are updating StudentContext State.
        sessionStorage.setItem('student', JSON.stringify(pull)) // Here we are storing student data (stored in pull const) in local storage.
        console.log(pull)

// after successfully pulling the data from fetchPosts function. Now i am setting the states for prefilling the form value, it updates the useState above.
        setId(pull._id)
        setSrn(pull.srn);
        setName(pull.name)
        setFather(pull.father)
        setMother(pull.mother)
        setDob(pull.dob)
        setGender(pull.gender)
        setCategory(pull.category)
        setAadhar(pull.aadhar)
        setMobile(pull.mobile)
        setWhatsapp(pull.whatsapp)
        setAddress(pull.address)
        setDistrict(pull.district)
        setBlock(pull.block)
        setSchool(pull.school)
        setGrade(pull.grade)
        setImage(pull.image)
        setSchoolCode(pull.setSchoolCode)

    


      } catch (error) {
        console.log("Error fetching Posts", error);
      }
    };
  
//_______________________________________________________

//Below useEffect only runs and fetchPosts when the srnFormInput chages. 
    useEffect(() => {
        // Fetch data only if srnFromInput is available
        if (student.srn) {
            fetchPosts(student.srn);
        }
    }, [student.srn]); // Run effect when srnFromInput changes


//Below function runs when submit button is hit on the prefilled form functionality and updates the data in db.

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('srn', srn);
        formData.append('name', name);
        formData.append('father', father);
        formData.append('mother', mother);
        formData.append('dob', dob);
        formData.append('gender', gender);
        formData.append('category', category);
        formData.append('aadhar', aadhar);
        formData.append('mobile', mobile);
        formData.append('whatsapp', whatsapp);
        formData.append('address', address);
        formData.append('district', district);
        formData.append('block', block);
        formData.append('school', school);
        formData.append('grade', grade);
        formData.append('isRegisteredBy', isRegisteredBy);
        formData.append('schoolCode', schoolCode);
        
        if (image) {
            formData.append('image', image);
        }

        //Below piece of code converts the formData into JSON Object to show it in a Slip
        const SlipData = {};
        formData.forEach((value, key)=>{
            SlipData[key] = value;
        })
        
        console.log(SlipData)
        setSlipData(SlipData)
        console.log(slipData) //It will not directly log the data but, yes it will store the data in slipData hook(It is something related to useEffect hook)
        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    

    //Below in the try catch block we are sending the formData using our updatePostById method on the based of student id.
    // we are getting student id from InputSrn component.
        try {
            const response = await RegistrationFormService.updatePostsById(id, formData);
            console.log(response); // Debugging log
            if (response.data.updated_data) {
                setMessage('Data updated successfully');
                alert('Registration done succesfully')
                setShowAck(true);
                
               //navigate('/srn')  //after successfull updation of data it routes back to the inputsrn page
            } else {
                setMessage('Failed to update data.');
            }
        } catch (error) {
            console.error('Error updating data:', error);
            setMessage('An error occurred while updating the data.');
        }

        
            
    };
       


   

return (
    <>
    
        <div className="RegistrationFormComponent"> 
        <Card style={{border:'solid', border: 'solid' }}>
        <Card.Body>
        <p>Mission Buniyyad Registration Form</p>
        <form onSubmit={handleSubmit}>
            <label>Enter Your SRN: </label>
            <br/>
            <input type='text' name='srn' placeholder='Enter Your SRN' value={srn} onChange={(e) => setSrn(e.target.value)} />
            <br/>
    
            <label>Enter Your Name: </label>
            <br/>
            <input type='text' name='name' placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)} />
            <br/>
    
            <label>Enter Your Father's Name: </label>
            <br/>
            <input type='text' name='father' placeholder='Enter Your Father Name' value={father} onChange={(e) => setFather(e.target.value)} />
            <br/>
    
            <label>Enter Your Mother's Name: </label>
            <br/>
            <input type='text' name='mother' placeholder='Enter Your Mother Name' value={mother} onChange={(e) => setMother(e.target.value)} />
            <br/>
    
            <label>Enter Your D.O.B: </label>
            <br/>
            <input type='date' name='dob' value={dob} onChange={(e) => setDob(e.target.value)} />
            <br/>
    
            <label>Enter Your Gender: </label>
            <br/>
            <select value={gender} onChange={(e)=>setGender(e.target.value)}>
                <option value="">Select Your Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
           
            <br/>
    
            <label>Enter Your Category: </label>
            <br/>
            <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                <option value="">Select Your Category</option>
                <option value="BCA">BCA</option>
                <option value="BCB">BCB</option>
                <option value="GEN">GEN</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>

            </select>
            <br/>
    
            <label>Enter Your 12 digits Aadhar Number: </label>
            <br/>
            <input type='text' name='aadhar' placeholder='Enter Your Aadhar Number' value={aadhar} onChange={(e) => setAadhar(e.target.value)} />
            <br/>
    
            <label>Enter Your 00 digits Mobile Number: </label>
            <br/>
            <input type='text' name='mobile' placeholder='Enter Your Mobile Number' value={mobile} onChange={(e) => setMobile(e.target.value)} />
            <br/>
    
            <label>Enter Your 00 digits Whatsapp Number: </label>
            <br/>
            <input type='text' name='whatsapp' placeholder='Enter Your Whatsapp Number' value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
            <br/>
    
            <label>Enter Your Address: </label>
            <br/>
            <input type='text' name='address' placeholder='Enter Your Address' value={address} onChange={(e) => setAddress(e.target.value)} />
            <br/>

            
            <div style={{display:'inline'}}>

<DependentDropComponent
    setDistrict={setDistrict}
    setBlock={setBlock}
    setSchool={setSchool}
    setshowManualSchool={setshowManualSchool}
    setSchoolCode={setSchoolCode}
    />



</div>
               
    
            {/* <label>Enter Your District: </label>
            <br/>
            <input type='text' name='district' placeholder='Enter Your District' value={district} onChange={(e) => setDistrict(e.target.value)} />
            <br/>
    
            <label>Enter Your Block: </label>
            <br/>
            <input type='text' name='block' placeholder='Enter Your Block' value={block} onChange={(e) => setBlock(e.target.value)} />
            <br/>
    
            <label>Enter Your School: </label>
            <br/>
            <input type='text' name='school' placeholder='Enter Your School' value={school} onChange={(e) => setSchool(e.target.value)} />
            <br/> */}
    
            <label>Enter Your Grade: </label>
            <br/>
 
                <select value={grade} onChange={(e)=>setGrade(e.target.value)}>
                    <option value="8">8</option>
                    <option value="10">10</option>
                </select>

            {/* <input type='text' name='grade' placeholder='Enter Your Grade' value={grade} onChange={(e) => setGrade(e.target.value)} /> */}
            <br/>
    
            <label>Upload your photo: </label>
            <br/>
            <input type='file' name='image' onChange={(e) => setImage(e.target.files[0])} />
            <br/>
            <br/>
    
            <button type="submit" >Submit</button>
        </form>
    
        <p>{message}</p>
        <p>{student.name}</p>
      
        </Card.Body>
            </Card>

    </div>

    {showAck ? (
         <AcknowledgementSlip showAck = {showAck} slipData = {slipData}/>
         ):null} 
    
   
</>
)

}

export default PreFilledRegistrationForm;



