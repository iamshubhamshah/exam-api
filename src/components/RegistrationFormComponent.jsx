import React, {useState, useEffect, useContext} from 'react';
import RegistrationFormService from '../services/RegistrationFormService';
import { useNavigate, useLocation } from "react-router-dom"; 
import DependentDropComponent from './DependentDropComponent';
import { UserContext } from './ContextApi/UserContextAPI/UserContext';




//React boottrap css-------------------
import 'bootstrap/dist/css/bootstrap.min.css';

import { Card, Button } from 'react-bootstrap';
//_____________________________


//-----------------------------------

export default function RegistrationFormComponent () {

    const {user} = useContext(UserContext);

    const navigate = useNavigate();
    const location = useLocation();

    //this below code dynamically updates the isRegisteredBy schema in the db on the basis of url.

 
    let isRegisteredBy;
    let grade;

    
        
   

// 
    if (location.pathname==='/Registration-form/MB'){
        // isRegisteredBy = "Self"
        grade = "8"
        console.log('I am /Registration-form/MB ')
       } else if (location.pathname === "/Registration-form/S100" ) {
        console.log('i am s100 registration form')
        grade = "10"
       }
    //---------------------------------------------------------------------------------------------------
    const [userObj, setUserObj] = useState(null)
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
    // const [grade, setGrade] = useState('');
    const [image, setImage] = useState(''); // For file uploads
    // const [isRegisteredBy] = useState('Self')
    const [message, setMessage] = useState('');

    if(user){
        isRegisteredBy = user.mobile;
    }else {
        isRegisteredBy = 'Self'
    }

useEffect(()=>{
    setUserObj(user)
},[user])

    
  

    const handleSubmit = async (e)=>{
        
        e.preventDefault();
        
        const formData = new FormData ();
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
        formData.append('image', image); 
        formData.append('isRegisteredBy', isRegisteredBy);


        const response = await RegistrationFormService.RegistrationCreate(formData);
        console.log(response);

        if (response.data.success === true){
            setMessage('Post created successfully')
            alert('Registration done succesfully')
            navigate('/srn')  //after successfull updation of data it routes back to the inputsrn page

        } else {
            setMessage('Post not created')
        }
        setImage('')

        setTimeout(function(){
            setMessage('');
        },2000);

        e.target.reset();
    }



    // It has a CSS in Index.css
    return (
        
        <div id="RegistrationFormComponent" > 
        <Card style={{border:'solid', border: 'solid' }}>
        <Card.Body>
            <p>Mission Buniyyad Registration Form</p>
            <form onSubmit={handleSubmit}>
                
                <label>Enter Your SRN: </label>
                <br/>
                <input  type='text' name='srn' placeholder='Enter Your SRN' onChange={(e)=>setSrn(e.target.value)}/>
                <br/>
                <label>Enter Your Name: </label>
                <br/>
                <input type='text' name='name' placeholder='Enter Your SRN' onChange={(e)=>setName(e.target.value)}/>
                <br/>
                <label>Enter Your Fathers' Name: </label>
                <br/>
                <input type='text' name='father' placeholder='Enter Your Father Name' onChange={(e)=>setFather(e.target.value)}/>
                <br/>
                <label>Enter Your Mother's Name: </label>
                <br/>
                <input type='text' name='mother' placeholder='Enter Your Mother Name' onChange={(e)=>setMother(e.target.value)}/>
                <br/>
                <label>Enter Your D.O.B: </label>
                <br/>
                <input type='date' name='dob' onChange={(e)=>setDob(e.target.value)}/>
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
                <input type='text' name='aadhar' placeholder='Enter Your Aadhar Number' onChange={(e)=>setAadhar(e.target.value)}/>
                <br/>
                <label>Enter Your 10 digits Mobile Number: </label>
                <br/>
                <input type='text' name='mobile' placeholder='Enter Your Mobile Number' onChange={(e)=>setMobile(e.target.value)}/>
                <br/>
                <label>Enter Your 10 digits Whatsapp Number: </label>
                <br/>
                <input type='text' name='whatsapp' placeholder='Enter Your Whatsapp Number' onChange={(e)=>setWhatsapp(e.target.value)}/>
                <br/>
                <label>Enter Your Address: </label>
                <br/>
                <input type='text' name='address' placeholder='Enter Your Address' onChange={(e)=>setAddress(e.target.value)}/>
                <br/>
                
                    <DependentDropComponent
                    setDistrict={setDistrict}
                    setBlock={setBlock}
                    setSchool={setSchool}
                    />
                
               
                {/* <label>Enter Your District: </label>
                <br/>
                <input type='text' name='district' placeholder='Enter Your District' onChange={(e)=>setDistrict(e.target.value)}/>
                <br/>
                <label>Enter Your Block: </label>
                <br/>
                <input type='text' name='block' placeholder='Enter Your Block' onChange={(e)=>setBlock(e.target.value)}/>
                <br/>
                <label>Enter Your School: </label>
                <br/>
                <input type='text' name='school' placeholder='Enter Your School' onChange={(e)=>setSchool(e.target.value)}/>
                <br/> */}
                <label>Enter Your Grade: </label>
                <br/>
                <select value = {grade} onChange={(e)=>(e.target.value)}>
                    <option value="8">8</option>
                    <option value="10">10</option>
                </select>

                {/* <input type='text' name='grade' placeholder='Enter Your Grade' onChange={(e)=>setGrade(e.target.value)}/> */}
                <br/>
                <label>Upload your photo </label>
                <br/>
                <input type='file' name='image' onChange={(e)=>setImage(e.target.files[0])}/>
                <br/>
                <br/>

               

                <button type="submit">Register</button>
            </form>

            <p>{message}</p>
            </Card.Body>
            </Card>

        </div>
       
    )

}