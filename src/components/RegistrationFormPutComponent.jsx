
import React, { useState, useEffect, useContext } from "react";
import RegistrationFormService from "../services/RegistrationFormService";
// import InputSrn from "./InputSrn";
import {  Navigate, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
import DependentDropComponent from "./DependentDropComponent";

import { StudentContext } from "./ContextApi/StudentContextAPI/StudentContext";
import { UserContext } from "./ContextApi/UserContextAPI/UserContext";
import { toast } from "react-toastify";
import {Container, Row, Col, Form, Card, Button, CardFooter } from "react-bootstrap";

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

   //Acknowledgement id generation logic below.

    //Logic goes: slicing three digits of name and slicing last 5 digits of srn and then combining it to create SlipID

    let slicedName = name.slice(0,3)
    let slicedSrn = srn.slice(5);


    let slipId = (slicedName + slicedSrn).toUpperCase();

    console.log(slipId);
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    
    

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


  //Below logics puts the validation on the form.
  const [errSrn, setErrSrn] = useState(true);
  const [errName, setErrName] = useState(true);
  const [errFather, setErrFather] = useState(true);
  const [errMother, setErrMother] = useState(true);
  const [errDob, setErrDob] = useState(true);
  const [errGender, setErrGender] = useState(true);
  const [errCategory, setErrCategory] = useState(true);
  const [errAadhar, setErrAadhar] = useState(true);
  const [errMobile, setErrMobile] = useState(true);
  const [errWhatsapp, setErrWhatsapp] = useState(true);
  const [errAddress, setErrAddress] = useState(true);
  const [errDistrict, setErrDistrict] = useState(true);
  const [errBlock, setErrBlock] = useState(true);
  const [errSchool, setErrSchool] = useState(true);
  //if all the validation passes then below state hook lets the send data;
  const [formValidated, setFormValidated] = useState(false);

  function formValidation() {
    if (srn.length === 10 && /[^\d]/.test(srn) == false) {
      setErrSrn(false);
    } else {
      setErrSrn(true);
      toast.error("Srn must contain only 10 digits");
    }

    if (/\d/.test(name) == false && name.length != 0) {
      setErrName(false);
    } else {
      setErrName(true);
      toast.error("Student Name must not contain any Number");
    }
    if (/\d/.test(father) == false && father.length != 0) {
      setErrFather(false);
    } else {
      setErrFather(true);
      toast.error("Father name must not contain any Number");
    }
    if (/\d/.test(mother) == false && mother.length != 0) {
      setErrMother(false);
    } else {
      setErrMother(true);
      toast.error("Mother name must not contain any Number");
    }

    //Below check is for dob.
    if (dob !== "") {
      setErrDob(false);
    } else {
      setErrDob(true);
      toast.error("Selct your D.O.B");
    }

    if (gender !== "") {
      setErrGender(false);
    } else {
      setErrGender(true);
      toast.error("Select Gender");
    }

    if (category !== "") {
      setErrCategory(false);
    } else {
      setErrCategory(true);
      toast.error("Select Category");
    }

    //checks if the srn has exact 12 digits and does not contain any apphabet.

    if (aadhar.length === 12 && /[^\d]/.test(aadhar) == false) {
      setErrAadhar(false);
    } else {
      setErrAadhar(true);
      toast.error(
        "Aadhar number should have 12 digits only and must not contain any alphabet"
      );
    }

    //below check for mobile validation
    if (mobile.length === 10 && /[^\d]/.test(mobile) == false) {
      setErrMobile(false);
    } else {
      setErrMobile(true);
      toast.error(
        "Mobile number should contain 10 digits only and must not contain any alphabet"
      );
    }

    //below check for whatsapp validation

    if (whatsapp.length === 10 && /[^\d]/.test(whatsapp) == false) {
      setErrWhatsapp(false);
    } else {
      setErrWhatsapp(true);
      toast.error(
        "Whatsapp number should contain 10 digits only and must not contain any alphabet"
      );
    }

    //below check for address validation
    if (address.length !== 0) {
      setErrAddress(false);
    } else {
      setErrAddress(true);
      toast.error("Please fill your address");
    }

    //below check for district validation
    if (district.length !== 0) {
      setErrDistrict(false);
    } else {
      setErrDistrict(true);
      toast.error("Please select your district");
    }

    //below check for block validation
    if (block.length !== 0) {
      setErrBlock(false);
    } else {
      setErrBlock(true);
      toast.error("Please select your block");
    }

    //below check for school validation
    if (school.length !== 0) {
      setErrSchool(false);
    } else {
      setErrSchool(true);
      toast.error("Please select your school");
    }
  }

  function formValidate() {
    if (
      errSrn === false &&
      errName === false &&
      errFather === false &&
      errMother === false &&
      errDob === false &&
      errGender === false &&
      errCategory === false &&
      errAadhar === false &&
      errMobile === false &&
      errWhatsapp === false &&
      errAddress === false &&
      errDistrict === false &&
      errBlock === false &&
      errSchool === false
    ) {
      // All error states are
      setFormValidated(true);
      console.log("All error states are clear.");
    } else {
      setFormValidated(false);
      console.log("All states are not cleared.");
    }
  }
  useEffect(() => {
    formValidate();
  }, [
    errSrn,
    errName,
    errFather,
    errMother,
    errDob,
    errGender,
    errCategory,
    errAadhar,
    errMobile,
    errWhatsapp,
    errAddress,
    errDistrict,
    errBlock,
    errSchool,
  ]);

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  


//Below function runs when submit button is hit on the prefilled form functionality and updates the data in db.

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Call the formValidation function
    formValidation();

    // Check if the form is validated
    if (!formValidated) {
      alert("Please fix the errors before submitting the form.");
      return; // Stop execution if validation fails
    } else {
      toast.success("registration done");
    }

    try {

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
        formData.append('slipId' , slipId);
        
        console.log(slipId)
        
        
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
                alert('Form updated succesfully')
                setShowAck(true); //this was for showing Acknowledgement slip dynamically.
                // if (location.pathname === '/Registration-form/put/MB'){
                //     navigate('/acknowledgementslip-mb')
                // } else if (location.pathname === '/Registration-form/put/S100'){
                //     navigate('/acknowledgementslip-100')
                // }
                 
               //navigate('/srn')  //after successfull updation of data it routes back to the inputsrn page
            } else {
                setMessage('Failed to update data.');
            }
        } catch (error) {
            console.error('Error updating data:', error);
            setMessage('An error occurred while updating the data.');
        }

        
        
    } catch (error) {
        console.log("Some error occured");
        
    }
       
            
    };

    
       


   

return (
    <Container>
    
        <h1>Mission Buniyaad Registration Form</h1>
        <Form onSubmit={handleSubmit}>

        <Row className="border mb-3 rounded-2">
        <Col xs={12} >
        <Form.Group className="mb-3" controlId="srnInput">
        <Form.Label>Enter Your SRN:</Form.Label>
                    <Form.Control
                    type='text' name='srn' placeholder='Enter Your SRN' value={srn} onChange={(e) => setSrn(e.target.value)} 
                    
                    />   
                </Form.Group>
                </Col>
            </Row>
    
            <Row className="border mb-3 rounded-2">
            <Col xs={12} md={6} className="border-end p-3">
            <h2>Personal Details:</h2>
            <Form.Group className="mb-3" controlId="nameInput">
            <Form.Label>Enter Your Name:</Form.Label>
            
            <Form.Control type='text' name='name' placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)} />
         
            </Form.Group>

            <Form.Group className="mb-3" controlId="fatherInput">
              <Form.Label>Enter Your Father's Name:</Form.Label>
            
            <Form.Control type='text' name='father' placeholder='Enter Your Father Name' value={father} onChange={(e) => setFather(e.target.value)} />
            
            </Form.Group>

            <Form.Group className="mb-3" controlId="motherInput">
            <Form.Label>Enter Your Mother's Name:</Form.Label>
            
            <Form.Control type='text' name='mother' placeholder='Enter Your Mother Name' value={mother} onChange={(e) => setMother(e.target.value)} />
            
            </Form.Group>
            <Form.Group className="mb-3" controlId="dobInput">
            <Form.Label>Enter Your D.O.B:</Form.Label>
            
            <Form.Control type='date' name='dob' value={dob} onChange={(e) => setDob(e.target.value)} />
            
            </Form.Group>

            <Form.Group className="mb-3" controlId="genderSelect">
            <Form.Label>Enter Your Gender:</Form.Label>
            
            <Form.Select value={gender} onChange={(e)=>setGender(e.target.value)}>
                <option value="">Select Your Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </Form.Select>

            </Form.Group>
           
            <Form.Group className="mb-3" controlId="categorySelect">
            <Form.Label>Enter Your Category:</Form.Label>
            
            <Form.Select value={category} onChange={(e)=>setCategory(e.target.value)}>
                <option value="">Select Your Category</option>
                <option value="BCA">BCA</option>
                <option value="BCB">BCB</option>
                <option value="GEN">GEN</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>

            </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="aadharInput">
            <Form.Label>Enter Your 12 digits Aadhar Number:</Form.Label>
            <Form.Control type='text' name='aadhar' placeholder='Enter Your Aadhar Number' value={aadhar} onChange={(e) => setAadhar(e.target.value)} />
            
            </Form.Group>
             </Col>

              {/* Second Column inside the Second Row */}
          
              <Col className="border-end p-3">
              <h2>Contact Details:</h2>
              <Form.Group className="mb-3" controlId="mobileInput">
              <Form.Label>Enter Your 10 digits Mobile Number:</Form.Label>
            <Form.Control type='text' name='mobile' placeholder='Enter Your Mobile Number' value={mobile} onChange={(e) => setMobile(e.target.value)} />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="whatsappInput">
              <Form.Label>Enter Your 10 digits Whatsapp Number:</Form.Label>
            <Form.Control type='text' name='whatsapp' placeholder='Enter Your Whatsapp Number' value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="addressInput">
              <Form.Label>Enter Your Address:</Form.Label>
            <Form.Control type='text' name='address' placeholder='Enter Your Address' value={address} onChange={(e) => setAddress(e.target.value)} />
            </Form.Group>
        {/* Nested Row inside a second column of the second Row    */}
            
        <h2>Academic Details:</h2>     

<DependentDropComponent
    setDistrict={setDistrict}
    setBlock={setBlock}
    setSchool={setSchool}
    setshowManualSchool={setshowManualSchool}
    setSchoolCode={setSchoolCode}
    />




               
    
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
    
    <Form.Group className="mb-3" controlId="gradeSelect">
    <Form.Label>Enter Your Grade:</Form.Label>
 
                <Form.Select value={grade} onChange={(e)=>setGrade(e.target.value)}>
                    <option value="8">8</option>
                    <option value="10">10</option>
                </Form.Select>
                </Form.Group>

                {/* ^^^^^Nested Row inside a second column of the second Row ^^^^*/}

            {/* <input type='text' name='grade' placeholder='Enter Your Grade' value={grade} onChange={(e) => setGrade(e.target.value)} /> */}
         </Col>
          {/*^^^ Second Column inside the Second Row^^^*/}
            </Row>
            <Row className="border mb-3 rounded-2">
          <Col xs={12} md={6}>
            <Form.Group className="mb-3" controlId="photoInput">
              <Form.Label>Upload your photo:</Form.Label>
            <Form.Control type='file' name='image' onChange={(e) => setImage(e.target.files[0])} />
            </Form.Group>
             
            </Col>
            </Row>
            <Row>
            <Button type="submit" >Register</Button>
            </Row>
        </Form>
    
        <p>{message}</p>
        <p>{student.name}</p>
      
      

    

    {showAck ? (
         <AcknowledgementSlip showAck = {showAck} slipData = {slipData}/> //showAck = {showAck} slipData = {slipData} <= these are the props if needed i can use from here.
         ):null} 
    
   
</Container>
)

}

export default PreFilledRegistrationForm;



