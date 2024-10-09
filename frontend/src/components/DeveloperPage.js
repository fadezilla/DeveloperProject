import React, { useEffect, useState } from 'react';
import { getDevelopers, createDeveloper, updateDeveloper, deleteDeveloper, getRoles, getTeams } from '../api';
import './DeveloperPage.css';

const DeveloperPage = () => {
    const [developers, setDevelopers] = useState([]);
    const [newDeveloper, setNewDeveloper] = useState({ firstName: '', lastName: '', roleId: '', teamId: '' });
    const [editingDeveloperId, setEditingDeveloperId] = useState(null);
    const [roles, setRoles] = useState([]);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        fetchDevelopers();
        fetchRoles();
        fetchTeams();
    }, []);

    const fetchDevelopers = async () => {
        const response = await getDevelopers();
        setDevelopers(response.data);
    };

    const fetchRoles = async () => {
        const response = await getRoles();
        setRoles(response.data);
    };

    const fetchTeams = async () => {
        const response = await getTeams();
        setTeams(response.data);
    };

    const handleCreate = async () => {
        try {
            await createDeveloper(newDeveloper);
            setNewDeveloper({ firstName: '', lastName: '', roleId: '', teamId: '' });
            fetchDevelopers();
        } catch (error) {
            console.error('Error creating developer:', error);
            alert("There was an error creating the developer. Please try again.");
        }
    };

    const handleUpdate = async (id) => {
        try {
            const updatedDeveloper = {
                id: id,
                firstName: newDeveloper.firstName,
                lastName: newDeveloper.lastName,
                teamId: parseInt(newDeveloper.teamId, 10),
                roleId: parseInt(newDeveloper.roleId, 10)
            };
    
            await updateDeveloper(id, updatedDeveloper);
            setEditingDeveloperId(null);
            setNewDeveloper({ firstName: '', lastName: '', roleId: '', teamId: '' });
            fetchDevelopers();
            alert("Developer updated successfully!");
        } catch (error) {
            console.error('Error updating developer:', error);
            alert("There was an error updating the developer. Please try again.");
        }
    };

    const handleDelete = async (id) => {
        await deleteDeveloper(id);
        fetchDevelopers();
    };

    return (
        <div className="developer-page">
            <h1>Developers</h1>
            <h2>Create a New Developer</h2>
            <input
                type="text"
                placeholder="First Name"
                value={newDeveloper.firstName}
                onChange={(e) => setNewDeveloper({ ...newDeveloper, firstName: e.target.value })}
            />
            <input
                type="text"
                placeholder="Last Name"
                value={newDeveloper.lastName}
                onChange={(e) => setNewDeveloper({ ...newDeveloper, lastName: e.target.value })}
            />
            <select
                value={newDeveloper.roleId}
                onChange={(e) => setNewDeveloper({ ...newDeveloper, roleId: e.target.value })}
            >
                <option value="">Select Role</option>
                {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                        {role.name}
                    </option>
                ))}
            </select>
            <select
                value={newDeveloper.teamId}
                onChange={(e) => setNewDeveloper({ ...newDeveloper, teamId: e.target.value })}
            >
                <option value="">Select Team</option>
                {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                        {team.name}
                    </option>
                ))}
            </select>
            <button className="create-button" onClick={handleCreate}>Create Developer</button>

            <h2>Current Developers</h2>
            <ul className="developer-list">
                {developers.map((developer) => (
                    <li key={developer.id} className="developer-item">
                        <span className="developer-name">
                            {developer.firstName} {developer.lastName}
                        </span>
                        <div className="developer-role-team">
                            <span>Role: {developer.role}</span>
                            <br />
                            <span>Team: {developer.team}</span>
                        </div>
                        <div className="developer-buttons">
                            <button className="edit-button" onClick={() => { 
                                setEditingDeveloperId(developer.id); 
                                setNewDeveloper({ firstName: developer.firstName, lastName: developer.lastName, roleId: developer.roleId, teamId: developer.teamId }); 
                            }}>
                                Edit
                            </button>
                            <button className="delete-button" onClick={() => handleDelete(developer.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            {editingDeveloperId && (
                <div>
                    <h2>Update Developer</h2>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={newDeveloper.firstName}
                        onChange={(e) => setNewDeveloper({ ...newDeveloper, firstName: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={newDeveloper.lastName}
                        onChange={(e) => setNewDeveloper({ ...newDeveloper, lastName: e.target.value })}
                    />
                    <select
                        value={newDeveloper.roleId}
                        onChange={(e) => setNewDeveloper({ ...newDeveloper, roleId: e.target.value })}
                    >
                        <option value="">Select Role</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                    <select
                        value={newDeveloper.teamId}
                        onChange={(e) => setNewDeveloper({ ...newDeveloper, teamId: e.target.value })}
                    >
                        <option value="">Select Team</option>
                        {teams.map((team) => (
                            <option key={team.id} value={team.id}>
                                {team.name}
                            </option>
                        ))}
                    </select>
                    <button className="update-button" onClick={() => handleUpdate(editingDeveloperId)}>Update Developer</button>
                </div>
            )}
        </div>
    );
};

export default DeveloperPage;