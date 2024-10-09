import React, { useEffect, useState } from 'react';
import { getProjects, createProject, updateProject, deleteProject, getTeams, getProjectTypes } from '../api';
import './ProjectPage.css';

const ProjectPage = () => {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({ name: '', projectTypeId: '', teamId: '' });
    const [editingProjectId, setEditingProjectId] = useState(null);
    const [teams, setTeams] = useState([]);
    const [projectTypes, setProjectTypes] = useState([]);

    useEffect(() => {
        fetchProjects();
        fetchTeams();
        fetchProjectTypes();
    }, []);

    const fetchProjects = async () => {
        const response = await getProjects();
        setProjects(response.data);
    };

    const fetchTeams = async () => {
        const response = await getTeams();
        setTeams(response.data);
    };

    const fetchProjectTypes = async () => {
        const response = await getProjectTypes();
        setProjectTypes(response.data);
    };

    const handleCreate = async () => {
        try {
            await createProject(newProject);
            setNewProject({ name: '', projectTypeId: '', teamId: '' });
            fetchProjects();
        } catch (error) {
            console.error('Error creating project:', error);
            alert("There was an error creating the project. Please try again.");
        }
    };

    const handleUpdate = async (id) => {
        try {
            const updatedProject = {
                id: id,
                name: newProject.name,
                projectTypeId: parseInt(newProject.projectTypeId, 10),
                teamId: parseInt(newProject.teamId, 10)
            };
    
            await updateProject(id, updatedProject);
            setEditingProjectId(null);
            setNewProject({ name: '', projectTypeId: '', teamId: '' });
            fetchProjects();
            alert("Project updated successfully!");
        } catch (error) {
            console.error('Error updating project:', error);
            alert("There was an error updating the project. Please try again.");
        }
    };

    const handleDelete = async (id) => {
        await deleteProject(id);
        fetchProjects();
    };

    return (
        <div className="project-page">
            <h1>Projects</h1>
            <h2>Create a New Project</h2>
            <input
                type="text"
                placeholder="Project Name"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            />
            <select
                value={newProject.projectTypeId}
                onChange={(e) => setNewProject({ ...newProject, projectTypeId: e.target.value })}
            >
                <option value="">Select Project Type</option>
                {projectTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                        {type.name}
                    </option>
                ))}
            </select>
            <select
                value={newProject.teamId}
                onChange={(e) => setNewProject({ ...newProject, teamId: e.target.value })}
            >
                <option value="">Select Team</option>
                {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                        {team.name}
                    </option>
                ))}
            </select>
            <button className="create-button" onClick={handleCreate}>Create Project</button>

            <h2>Current Projects</h2>
            <ul className="project-list">
                {projects.map((project) => (
                    <li key={project.id} className="project-item">
                        <span className="project-name">{project.name}</span>
                        <div className="project-info">
                            <span>Project Type: {project.projectType}</span>
                            <br />
                            <span>Team: {project.team}</span>
                        </div>
                        <div className="project-buttons">
                            <button className="edit-button" onClick={() => { 
                                setEditingProjectId(project.id); 
                                setNewProject({ name: project.name, projectTypeId: project.projectTypeId, teamId: project.teamId }); 
                            }}>
                                Edit
                            </button>
                            <button className="delete-button" onClick={() => handleDelete(project.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            {editingProjectId && (
                <div>
                    <h2>Update Project</h2>
                    <input
                        type="text"
                        placeholder="Project Name"
                        value={newProject.name}
                        onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    />
                    <select
                        value={newProject.projectTypeId}
                        onChange={(e) => setNewProject({ ...newProject, projectTypeId: e.target.value })}
                    >
                        <option value="">Select Project Type</option>
                        {projectTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                    <select
                        value={newProject.teamId}
                        onChange={(e) => setNewProject({ ...newProject, teamId: e.target.value })}
                    >
                        <option value="">Select Team</option>
                        {teams.map((team) => (
                            <option key={team.id} value={team.id}>
                                {team.name}
                            </option>
                        ))}
                    </select>
                    <button className="update-button" onClick={() => handleUpdate(editingProjectId)}>Update Project</button>
                </div>
            )}
        </div>
    );
};

export default ProjectPage;
