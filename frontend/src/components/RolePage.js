import React, { useEffect, useState } from 'react';
import { getRoles, createRole, updateRole, deleteRole } from '../api';
import './RolePage.css';

const RolePage = () => {
    const [roles, setRoles] = useState([]);
    const [newRole, setNewRole] = useState({ name: '' });
    const [editingRoleId, setEditingRoleId] = useState(null);

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        const response = await getRoles();
        setRoles(response.data);
    };

    const handleCreate = async () => {
        try {
            await createRole(newRole);
            setNewRole({ name: '' });
            fetchRoles();
            alert("Role created successfully!");
        } catch (error) {
            console.error('Error creating role:', error);
            alert("There was an error creating the role. Please try again.");
        }
    };

    const handleUpdate = async (id) => {
        try {
            const updatedRole = {
                id: id,
                name: newRole.name
            };
    
            await updateRole(id, updatedRole);
            setEditingRoleId(null);
            setNewRole({ name: '' });
            fetchRoles();
            alert("Role updated successfully!");
        } catch (error) {
            console.error('Error updating role:', error);
            alert("There was an error updating the role. Please try again.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteRole(id);
            fetchRoles();
        } catch (error){
            if (error.response) {
                alert("This role cannot be deleted because it is assigned to one or more developers. Please delete the developers first.");
            } else {
                console.error('Error deleting role:', error);
            }
        }
    };

    return (
        <div className="role-page">
            <h1>Roles</h1>
            <h2>Create a New Role</h2>
            <input
                type="text"
                placeholder="Role Name"
                value={newRole.name}
                onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
            />
            <button className="create-button" onClick={handleCreate}>Create Role</button>

            <h2>Current Roles</h2>
            <ul className="role-list">
                {roles.map((role) => (
                    <li key={role.id} className="role-item">
                        <span className="role-name">{role.name}</span>
                        <div className="role-buttons">
                            <button className="edit-button" onClick={() => { 
                                setEditingRoleId(role.id); 
                                setNewRole({ name: role.name }); 
                            }}>
                                Edit
                            </button>
                            <button className="delete-button" onClick={() => handleDelete(role.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            {editingRoleId && (
                <div>
                    <h2>Update Role</h2>
                    <input
                        type="text"
                        placeholder="Role Name"
                        value={newRole.name}
                        onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                    />
                    <button className="update-button" onClick={() => handleUpdate(editingRoleId)}>Update Role</button>
                </div>
            )}
        </div>
    );
};

export default RolePage;