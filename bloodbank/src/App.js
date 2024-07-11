
import './App.css';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import OrgLogin from './Pages/OrgLogin';
import OrgSignup from './Pages/OrgSignup';
import Search from './Pages/Search';
import Donation from './Pages/Donation';
import UserProfile from './Pages/UserProfile';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrgProfile from './Pages/OrgProfile';
import OrgProvider from './Context/OrganizationContext';

import News from './Pages/News'
function App() {
  return (
    <OrgProvider>
    <div className="App">
       
       <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/orglogin" element={<OrgLogin/>}/>
        <Route path="/orgprofile" element={<OrgProfile/>}/>
        <Route path="/orgsignup" element={<OrgSignup/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/donation" element={<Donation/>}/>
        <Route path="/news" element={<News/>}/>
        <Route path="/userprofile" element={<UserProfile/>}/>
       
      </Routes>
      </BrowserRouter>
    </div>
    </OrgProvider>
  );
}

export default App;
