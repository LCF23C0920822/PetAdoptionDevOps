//Miguel Poma
//c0920822
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

function AddPet() {
    const navigate = useNavigate(); // Hook
    const [formData, setFormData] = useState({
        namePet: '',
        type: '', // Ahora es un string vacío para que no haya selección por defecto
        age: '',
        breed: '',
        description: '',
        imagePath: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validación para Age, solo valores numéricos mayores a cero
        if (name === 'age') {
            const numericValue = value.replace(/[^0-9.]/g, ''); // Remover caracteres no numéricos
            if (numericValue === '' || parseFloat(numericValue) <= 0) {
                return; // Si el valor no es numérico o es menor o igual a 0, no se actualiza
            }
            setFormData({ ...formData, [name]: numericValue });
        } else if (name === "imagePath") {
            // Handle file input
            const file = e.target.files[0]; // Get selected file
            if (file) {
                setFormData({ ...formData, imagePath: `/images/${file.name}` });
            }
        } else {
            // Handle other inputs
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar que todos los campos necesarios estén presentes y no estén vacíos
        if (!formData.namePet || !formData.type || !formData.age || !formData.breed || !formData.description || !formData.imagePath) {
            alert("All fields are required.");
            return;
        }

        // Enviar la solicitud solo si los datos son válidos
        API.post('/pets', formData)
            .then(() => {
                alert('Pet added successfully');
                navigate('/pets');
            })
            .catch((error) => {
                console.error(error);
                alert("Error adding pet");
            });
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Add Pet</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label">Name Pet</label>
                            <input
                                type="text"
                                className="form-control"
                                name="namePet"
                                value={formData.namePet}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" >Type</label>
                            <select className="form-select w-25" name="type" value={formData.type} onChange={handleChange} required                               >
                                <option value="" disabled>Select type</option>
                                <option value="Dog">Dog</option>
                                <option value="Cat">Cat</option>
                            </select>
                        </div>
                        
                        <div className="mb-3">
                            <label className="form-label">Age</label>
                            <input
                                type="number"
                                className="form-control w-25"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                required
                                min="1"  // Valor mínimo de 1
                                max="30" // Valor máximo de 30
                                placeholder="between 1 - 30)"
                            />

                        </div>
                        <div className="mb-3">
                            <label className="form-label">Breed</label>
                            <input
                                type="text"
                                className="form-control"
                                name="breed"
                                value={formData.breed}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Image</label>
                            <input
                                type="file"
                                className="form-control"
                                name="imagePath"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Add Pet</button>
            </form>
        </div>
    );
}

export default AddPet;
