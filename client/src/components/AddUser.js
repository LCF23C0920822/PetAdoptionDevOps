//Miguel Poma
//c0920822
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

function AddUser() {
    const navigate = useNavigate(); // Hook 
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        country:'',
        city:'',
        address1:'',
        postalCode:'',
        phoneNumber:''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        API.post('/users', formData)
            .then(() => {
                alert('User added successfully');
                navigate('/users');
            })
            .catch((error) => console.error(error));
    };

    
    return (
        <div className="container mt-4">
        <h2 className="mb-4">Add User</h2>
        <form onSubmit={handleSubmit}>
        <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="firstName" 
                            value={formData.firstName} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="lastName" 
                            value={formData.lastName} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Country</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="country" 
                            value={formData.country} 
                            onChange={handleChange} 
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                                    <label className="form-label">City</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="city" 
                                        value={formData.city} 
                                        onChange={handleChange} 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="address1" 
                                        value={formData.address1} 
                                        onChange={handleChange} 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Postal Code</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="postalCode" 
                                        value={formData.postalCode} 
                                        onChange={handleChange} 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Phone Number</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="phoneNumber" 
                                        value={formData.phoneNumber} 
                                        onChange={handleChange} 
                                    />
                                </div>
                </div>
        </div>       
            <button type="submit" className="btn btn-primary">Add User</button>
        </form>
    </div>
    );
}

export default AddUser;
