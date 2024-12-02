import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import Select from 'react-select';
import '../App.css';

function AdoptPet() {
    const { id } = useParams(); // Obtiene el ID de la mascota desde la URL
    const [pet, setPet] = useState(null); // Estado para almacenar los datos de la mascota
    const [adopterOptions, setAdopterOptions] = useState([]); // Opciones del dropdown
    const [selectedAdopter, setSelectedAdopter] = useState(null); // Adopter seleccionado
    const navigate = useNavigate(); // Hook 

    useEffect(() => {
        // Fetch pet details
        API.get(`/adopt/${id}`)
            .then((response) => {
                setPet(response.data);
            })
            .catch((error) => console.error("Error fetching pet data:", error));

               
        API.get('/users/names')
            .then((response) => {
                console.log("--> Usuarios obtenidos:", response.data); 
                const options = response.data.map(user => ({
                    value: user._id,
                    label: `${user.firstName} ${user.lastName}`,
                }));
                setAdopterOptions(options);
            })
            .catch((error) => console.error("Error fetching adopters:", error));

    }, [id]);

    if (!pet) {
        return <div>Loading...please wait</div>; // Muestra un mensaje mientras se cargan los datos
    }

    const handleConfirmAdoption = () => {
        if (!selectedAdopter) {
            alert('Please select an adopter!');
            return;
        }
        // Aquí podrías enviar una solicitud al backend para registrar la adopción
        console.log('Adopter Selected:', selectedAdopter);
        alert(`Adoption confirmed for ${selectedAdopter.label}!`);
        navigate('/pets'); 
    };

    return (
        <div className="container mt-5">
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-3 d-flex justify-content-center">
                        <img 
                            src={pet.imagePath} 
                            alt={pet.namePet} 
                            className="rounded-image"
                            style={{ width: '250px', height: '250px', objectFit: 'cover' }} 
                        />
                    </div>
                    <div className="col-md-3 d-flex justify-content-center flex-column align-items-start">
                        <p><strong>Name:</strong> {pet.namePet}</p>
                        <p><strong>Type:</strong> {pet.type}</p>
                        <p><strong>Age:</strong> {pet.age}</p>
                        <p><strong>Breed:</strong> {pet.breed}</p>
                        <p><strong>Description:</strong> {pet.description}</p>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-3 d-flex justify-content-center">
                        <div className="mb-3 w-100">
                            <label htmlFor="adopterSelect" className="form-label"></label>
                            <Select
                                id="adopterSelect"
                                options={adopterOptions}
                                onChange={setSelectedAdopter}
                                value={selectedAdopter}
                                placeholder="Select adopter"
                                isSearchable
                            />
                        </div>
                    </div>
                    <div className="col-md-3 d-flex justify-content-start align-items-center">
                        <button className="btn btn-primary mt-3" onClick={handleConfirmAdoption}>
                            Confirm Adoption
                        </button>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </div>
    );
}

export default AdoptPet;
