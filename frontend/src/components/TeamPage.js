import React, { useEffect, useState } from 'react';
import { getTeams, createTeam, updateTeam, deleteTeam } from '../api';
import './TeamPage.css';

const TeamPage = () => {
    const [teams, setTeams] = useState([]);
    const [newTeam, setNewTeam] = useState({ name: '' });
    const [editingTeamId, setEditingTeamId] = useState(null);

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        const response = await getTeams();
        setTeams(response.data);
    };

    const handleCreate = async () => {
        try {
            await createTeam(newTeam);
            setNewTeam({ name: '' });
            fetchTeams();
            alert("Team created successfully!");
        } catch (error) {
            console.error('Error creating team:', error);
            alert("There was an error creating the team. Please try again.");
        }
    };

    const handleUpdate = async (id) => {
        try {
            const updatedTeam = {
                id: id,
                name: newTeam.name
            };
    
            await updateTeam(id, updatedTeam);
            setEditingTeamId(null);
            setNewTeam({ name: '' });
            fetchTeams();
            alert("Team updated successfully!");
        } catch (error) {
            console.error('Error updating team:', error);
            alert("There was an error updating the team. Please try again.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTeam(id);
            fetchTeams();
        } catch (error){
            if (error.response) {
                alert("This team cannot be deleted because it is assigned to one or more projects. Please delete the projects first.");
            } else {
                console.error('Error deleting team:', error);
            }
        }
    };

    return (
        <div className="team-page">
            <h1>Teams</h1>
            <h2>Create a New Team</h2>
            <input
                type="text"
                placeholder="Team Name"
                value={newTeam.name}
                onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
            />
            <button className="create-button" onClick={handleCreate}>Create Team</button>

            <h2>Current Teams</h2>
            <ul className="team-list">
                {teams.map((team) => (
                    <li key={team.id} className="team-item">
                        <span className="team-name">{team.name}</span>
                        <div className="team-members">
                            {team.developers && team.developers.length > 0 ? (
                                team.developers.map(developer => (
                                    <div key={developer.id}>
                                    {developer.firstName} {developer.lastName} 
                                    </div>
                                ))
                            ) : (
                                <div>No members in this team.</div>
                            )}
                        </div>
                        <div className="team-buttons">
                            <button className="edit-button" onClick={() => { 
                                setEditingTeamId(team.id); 
                                setNewTeam({ name: team.name }); 
                            }}>
                                Edit
                            </button>
                            <button className="delete-button" onClick={() => handleDelete(team.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            {editingTeamId && (
                <div>
                    <h2>Update Team</h2>
                    <input
                        type="text"
                        placeholder="Team Name"
                        value={newTeam.name}
                        onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                    />
                    <button className="update-button" onClick={() => handleUpdate(editingTeamId)}>Update Team</button>
                </div>
            )}
        </div>
    );
};

export default TeamPage;