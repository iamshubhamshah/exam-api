import './App.css';
import RegistrationForm from './components/RegistrationFormComponent';
import InputSrn from './components/InputSrn'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationFormPutComponent from './components/RegistrationFormPutComponent';
import DependentDropComponent from './components/DependentDropComponent';
import SearchableDropdown from './components/custdrop';
import UserSignUp from './components/UserSignup'
import UserSignIn from './components/UserSignIn';
import UserPage from './components/UserPage';
import BulkUpload from './components/BulkUpload';
import UserProvider from './components/ContextApi/UserContextAPI/UserContext';
import RegistrationFormComponent from './components/RegistrationFormComponent';
import LandingPage from './pages/LandingPage'
import RegistrationPage from './pages/RegistrationPage';
import BulkUploadWithDistBC from './components/BulkUploadWithDistBC';
import StudentProvider from './components/ContextApi/StudentContextAPI/StudentContext';
import AcknowledgementSlip from './components/AcknowledgementSlip';
import StudentSignIn from './components/StudentSignIn';
import StudentPage from './components/StudentPage';
import RegistrationDashComponent from './components/RegistrationDashComponent';
import UserDash8 from './components/UserDash';
import UserRegistrationPageMB from './pages/UserRegistrationPageMB';
import UserRegistrationPage100 from './pages/UserRegistrationPage100';
import UserDash from './components/UserDash'





function App() {
  return (
    <Router>
      <UserProvider>
        <StudentProvider>
        
        <Routes>

                <Route path="/examination" element={<LandingPage />} />

                <Route path="/srn" element={<InputSrn />} />
                <Route path="/srn-100" element={<InputSrn />} />


                {/* below are the self links */}
                <Route path="/Registration-form/MB" element={<RegistrationFormComponent />} />
                <Route path="/Registration-form/put/MB" element={<RegistrationFormPutComponent />} />
                <Route path="/Registration-form/S100" element={<RegistrationForm />} />
                <Route path="/Registration-form/put/S100" element={<RegistrationFormPutComponent />} />

                <Route path='/Registration-dash' element = {<RegistrationDashComponent/>}/>
                
                <Route path="/dependent" element ={<DependentDropComponent/>}/>
            
                <Route path="/searchable" element = {<SearchableDropdown/>}/>

                {/* Below routes are for users */}

                <Route path='/user-signup' element = {<UserSignUp/>}/>
                <Route path = '/user-signin' element = {<UserSignIn/>}/>
                <Route path = '/user-page' element = {<UserPage/>}/>

                <Route path="/user-srn" element = {<InputSrn/>}/>
                <Route path = '/userprofile' element = {<UserPage/>}/>

                <Route path="/user-Registration-form/MB" element={<RegistrationForm />} />
                <Route path="/user-Registration-form/put/MB" element={<RegistrationFormPutComponent />} />

                <Route path='/userprofile/registration-mb' element ={<UserRegistrationPageMB/>}/> 
                <Route path='/userprofile/registration-100' element ={<UserRegistrationPage100/>}/>

                  {/* BulkUpload */}

                  <Route path="/Bulkupload" element={<BulkUpload />} />
                  <Route path="/userprofile/bulkregister-mb" element={<BulkUploadWithDistBC />} />
                  <Route path="/userprofile/bulkregister-100" element={<BulkUploadWithDistBC />} />  


                  
                  {/*                   
                  <Route path="/contextsignin" element={<UserState />} />
                  <Route path="/usernewpage" element={<UserNewPage />} /> */}
                  <Route path = "/Registration-page" element ={<RegistrationPage/>}/>
                  <Route path = "/Acknowledgement" element = {<AcknowledgementSlip/>}/>

                  {/* StudentLogin page and Student Account */}

                  <Route path='/Student-SignIN' element = {<StudentSignIn/>}/>
                  <Route path = '/Student-dash' element = {<StudentPage/>}/>

                  {/* Dashboard routes below */}
                  <Route path='/User-dash' element = {<UserDash8/>}/>

                  {/* Acknowledgement slip routes for mb and 100 */}
                  <Route path='/acknowledgementslip-mb' element = {<AcknowledgementSlip/>}/>
                  <Route path='/acknowledgementslip-100' element = {<AcknowledgementSlip/>}/>



                  {/* Dasdhboar routes */}
                  <Route path='/userprofile/dashboard-mb' element = {<UserDash/>}/>
                  <Route path='/userprofile/dashboard-100' element = {<UserDash/>}/>
            </Routes>
            </StudentProvider>
            
            </UserProvider>
            
        </Router>
  );
}


export default App;
