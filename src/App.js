import './App.css';
import RegistrationForm from './components/RegistrationFormComponent';
import InputSrn from './components/InputSrn'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationDashComponent from './components/RegistrationDashComponent'
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




function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>

                <Route path="/examination" element={<LandingPage />} />

                <Route path="/srn" element={<InputSrn />} />


                {/* below are the self links */}
                <Route path="/Registration-form/MB" element={<RegistrationFormComponent />} />
                <Route path="/Registration-form/put/MB" element={<RegistrationFormPutComponent />} />
                <Route path="/Registration-form/S100" element={<RegistrationForm />} />
                <Route path="/Registration-form/put/S100" element={<RegistrationFormPutComponent />} />

                <Route path="/Registration-form/all" element={<RegistrationDashComponent />} />
                
                <Route path="/dependent" element ={<DependentDropComponent/>}/>
            
                <Route path="/searchable" element = {<SearchableDropdown/>}/>

                {/* Below routes are for users */}

                <Route path='/user-signup' element = {<UserSignUp/>}/>
                <Route path = '/user-signin' element = {<UserSignIn/>}/>
                <Route path = '/user-page' element = {<UserPage/>}/>

                <Route path="/user-srn" element = {<InputSrn/>}/>
                <Route path = '/user-page' element = {<UserPage/>}/>

                <Route path="/user-Registration-form/MB" element={<RegistrationForm />} />
                <Route path="/user-Registration-form/put/MB" element={<RegistrationFormPutComponent />} />

                  {/* BulkUpload */}

                  <Route path="/Bulkupload" element={<BulkUpload />} />
                  {/*                   
                  <Route path="/contextsignin" element={<UserState />} />
                  <Route path="/usernewpage" element={<UserNewPage />} /> */}
                  <Route path = "/Registration-page" element ={<RegistrationPage/>}/>

                
            </Routes>
            </UserProvider>
            
        </Router>
  );
}


export default App;
