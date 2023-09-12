import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Protect from './components/Protect';
import PageNotFound from './Pages/PageNotFound';
import InterMediatoryAuth from './Pages/InterMediattoryAuth';
import UpdatePassword from './Pages/UpdatePassword';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Protect><Dashboard /></Protect>} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/updatePassword' element={<UpdatePassword />} />
            <Route path='/auth' element={<InterMediatoryAuth />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
