// Miguel Poma
// c0920822
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';

function DisplayUsers() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // Usuario seleccionado para eliminar
    const [showAlert, setShowAlert] = useState(false); // Estado para mostrar el alert
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        API.get('/users')
            .then((response) => setUsers(response.data))
            .catch((error) => console.error(error));
    };

    const handleDelete = () => {
        if (selectedUser) {
            API.delete(`/users/${selectedUser}`)
                .then(() => {
                    setUsers(users.filter(user => user._id !== selectedUser));
                    setSelectedUser(null); // Resetear el usuario seleccionado
                    setShowAlert(true); // Mostrar el alert de éxito
                    setTimeout(() => setShowAlert(false), 4000); // Ocultar el alert automáticamente después de 4 segundos
                })
                .catch((error) => console.error(error));
        }
    };

    const handleUpdate = (id) => {
        navigate(`/updateUser/${id}`);
    };

    return (
        <div className="container mt-4">
            <Link to="/addUser" className="btn btn-primary mb-4">Add New User</Link>

            {/* Alert de confirmación */}
            {showAlert && (
                 <div 
                 className="alert alert-primary d-flex align-items-center position-fixed top-0 end-0 mt-3 me-3" 
                 style={{ zIndex: 1050 }} role="alert">
                 <div>User deleted successfully!</div>
             </div>
            )}

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Country</th>
                        <th>City</th>
                        <th>Address</th>
                        <th>Postal Code</th>
                        <th>Phone Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.country}</td>
                            <td>{user.city}</td>
                            <td>{user.address1}</td>
                            <td>{user.postalCode}</td>
                            <td>{user.phoneNumber}</td>
                            <td className="text-center">
                                <button className="btn btn-warning me-2" onClick={() => handleUpdate(user._id)}>Update</button>
                                <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal"
                                    onClick={() => setSelectedUser(user._id)}>Delete</button>
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
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this user?
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

export default DisplayUsers;
