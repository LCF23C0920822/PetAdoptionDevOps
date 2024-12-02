//Miguel Poma
//c0920822
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';

import AddUser from './components/AddUser';
import UpdateUser from './components/UpdateUser';
import DisplayUsers from './components/DisplayUsers';

import AddNewPet  from './components/AddPet';
import DisplayPets from './components/DisplayPets';
import AdoptPet from './components/AdoptPet';
import UpdatePet from './components/UpdatePet';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/users" element={<DisplayUsers />} /> 
                    <Route path="/addUser" element={<AddUser />} />
                    <Route path="/updateUser/:id" element={<UpdateUser />} />
                    
                    <Route path="/adopt/:id" element={<AdoptPet />} />
                    <Route path="/pets" element={<DisplayPets />} />
                    <Route path="/addPet" element={<AddNewPet />} />
                    <Route path="/updatePet/:id" element={<UpdatePet />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
