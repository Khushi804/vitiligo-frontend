import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import ImageUpload from './components/ImageUpload';

function App() {
    return (
       
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/imageupload" element={<ImageUpload />} />
            </Routes>
        
    );
}

export default App;