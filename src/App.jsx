import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './LoginRegister/login';
import Register from './LoginRegister/register';
import Logout from './LoginRegister/logout';
import EditUser from './EditCustomer/EditUser';
import MuesliMixer from './Mix/Mix';
import Myorder from './Orders/Myorders';
import Ordernow from './Orders/Ordernow';
import Mymuesli from './Orders/Mymuesli';
import './App.css';
import Dashboard from './Dashboard/Dashboard';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/editUser" element={<EditUser/>} />
      <Route path="/mix" element={<MuesliMixer/>} />
      <Route path="/myorder" element={<Myorder/>} />
      <Route path="/order" element={<Ordernow/>} />
      <Route path="/myMix" element={<Mymuesli/>} />
      <Route path="/exit" element={<Logout/>}/>
      <Route path="/logout" element={<Logout/>} />

      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
