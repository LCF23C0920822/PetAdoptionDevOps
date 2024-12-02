import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';
import '../App.css';

function DisplayPets() {
    const [pets, setPets] = useState([]);
    const [selectedPet, setSelectedPet] = useState(null); // Usuario seleccionado para eliminar
    const [filter, setFilter] = useState('');  // Estado para el tipo de filtro (All, Cat, Dog)
    const navigate = useNavigate(); 

    useEffect(() => {
        fetchPets(filter);  // Cambiar aquí para pasar el filtro
    }, [filter]);  // Re-renderiza cuando el filtro cambia

    const fetchPets = (type) => {
        let url = '/pets';
        if (type) {
            url = `/pets?type=${type}`;  // Filtra por tipo de mascota
        }

        API.get(url)  // Realiza la consulta con el filtro
            .then((response) => setPets(response.data))
            .catch((error) => console.error(error));
    };

    //Realiza la eliminacion de una mascota
    const handleDelete = () => {
        if (selectedPet) {
            API.delete(`/pets/${selectedPet}`)
                .then(() => {
                    alert('Pet deleted successfully');
                    setPets(pets.filter(pet => pet._id !== selectedPet));
                    setSelectedPet(null); // Resetear el usuario seleccionado
                })
                .catch((error) => console.error(error));
        }
    };
    
        
    //Realiza la actualizacion, la ruta  /updatePet/${id}  tiene que estar configurado en el archivo App.js 
    const handleUpdate = (id) => {
        navigate(`/updatePet/${id}`);
    };


    const handleAdopt = (id) => {
        navigate(`/adopt/${id}`);
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.textContent === 'All pets' ? '' : e.target.textContent); // Establece el tipo (Cat, Dog, o all)
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-between">
                    <div className="dropdown">
                        <button className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton1" 
                                data-bs-toggle="dropdown" aria-expanded="false">&nbsp;Type Pet&nbsp;&nbsp;</button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a className="dropdown-item" href="#" onClick={handleFilterChange} value = "">All pets</a></li>
                            <li><a className="dropdown-item" href="#" onClick={handleFilterChange} value = "cat">Cat</a></li>
                            <li><a className="dropdown-item" href="#" onClick={handleFilterChange} value = "dog">Dog</a></li>
                        </ul>
                    </div>
                    <Link to="/addPet" className="btn btn-primary mb-4">Add New Pet</Link>
                </div>
            </div>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>name Pet</th>
                        <th>type</th>
                        <th>age</th>
                        <th>breed</th>
                        <th>description</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {pets.map((pet) => (
                        <tr key={pet._id}>
                            <td>{pet.namePet}</td>
                            <td>{pet.type}</td>
                            <td>{pet.age}</td>
                            <td>{pet.breed}</td>
                            <td>{pet.description}</td>
                            <td className="text-center">
                                <img src={pet.imagePath} alt={pet.namePet}
                                     style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                            </td>
                           
                            <td className="text-center">
                                <button className="btn btn-warning me-2" onClick={() => handleUpdate(pet._id)}>Update</button>
                                <button className="btn btn-danger me-2" data-bs-toggle="modal" data-bs-target="#deleteModal"
                                    onClick={() => setSelectedPet(pet._id)} >Delete
                                </button>
                                
                                <button className="btn btn-success" data-bs-toggle="tooltip" data-bs-placement="top" 
                                        title="Click here to adopt this pet" onClick={() => handleAdopt(pet._id)}>Adopt me</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {/* Modal de confirmación */}
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteModalLabel">Confirm Delete</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this pet?
                        </div>  
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default DisplayPets;
