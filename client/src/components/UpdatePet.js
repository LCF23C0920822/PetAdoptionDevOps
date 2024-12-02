//Miguel Poma
//c0920822
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

function UpdatePet() {
    const { id } = useParams();
    const navigate = useNavigate(); // Hook 
    const [formData, setFormData] = useState({
        namePet: '',
        type: '',
        age: '',
        breed: '',
        description: '',
        imagePath: ''
    });

    // Cargar datos de la mascota llamando a un endpoint
    useEffect(() => {
        API.get(`/adopt/${id}`)
            .then((response) => setFormData(response.data))
            .catch((error) => console.error(error));
    }, [id]);

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validación para Age, solo valores numéricos dentro de rango
        if (name === 'age') {
            const numericValue = value.replace(/[^0-9]/g, ''); // Solo valores numéricos
            if (numericValue === '' || parseInt(numericValue) < 1 || parseInt(numericValue) > 30) {
                return; // Detener si está fuera de rango
            }
            setFormData({ ...formData, [name]: numericValue });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Manejar cambios en el campo de archivo
    const handleFileChange = (e) => {
        const fileName = e.target.files[0]?.name || ''; // Obtener el nombre del archivo seleccionado
        setFormData({ ...formData, imagePath: fileName ? `/images/${fileName}` : '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

       // Si no se seleccionó una nueva imagen, no actualizar imagePath
        const updatedData = { ...formData };
        if (!updatedData.imagePath.startsWith('/images/')) {
            updatedData.imagePath = formData.imagePath; // Conservar el valor actual
        }

        API.put(`/updatePet/${id}`, formData)
            .then(() => {
                alert('Pet updated successfully');
                navigate('/pets');
            })
            .catch((error) =>
                console.error(error) // Mantener la línea original que imprime el error
            );
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Update Pet</h2>
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
                            <label className="form-label">Type</label>
                            <select className="form-select w-25" name="type" value={formData.type} onChange={handleChange} required                           >
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
                                min="1" // Valor mínimo de 1
                                max="30" // Valor máximo de 30
                                placeholder="1 - 30"
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
                                    onChange={handleFileChange}

                                />
                        </div>
                        {formData.imagePath && (
                            <p>
                                Current Image Path: <strong>{formData.imagePath}</strong>
                            </p>
                        )}
                    </div>
                </div>
                <button type="submit" className="btn btn-warning">
                    Update Pet
                </button>
            </form>
        </div>
    );
}

export default UpdatePet;
