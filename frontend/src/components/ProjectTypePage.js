import React, { useEffect, useState } from 'react';
import { getProjectTypes, createProjectType, updateProjectType, deleteProjectType } from '../api';
import './ProjectTypePage.css';

const ProjectTypePage = () => {
    const [projectTypes, setProjectTypes] = useState([]);
    const [newProjectType, setNewProjectType] = useState({ name: '' });
    const [editingProjectTypeId, setEditingProjectTypeId] = useState(null);

    useEffect(() => {
        fetchProjectTypes();
    }, []);

    const fetchProjectTypes = async () => {
        const response = await getProjectTypes();
        setProjectTypes(response.data);
    };

    const handleCreate = async () => {
        try {
            await createProjectType(newProjectType);
            setNewProjectType({ name: '' });
            fetchProjectTypes();
        } catch (error) {
            console.error('Error creating project type:', error);
            alert("There was an error creating the project type. Please try again.");
        }
    };

    const handleUpdate = async (id) => {
        try {
            const updatedProjectType = {
                id: id,
                name: newProjectType.name
            };
            
            await updateProjectType(id, updatedProjectType);
            setEditingProjectTypeId(null);
            setNewProjectType({ name: '' });
            fetchProjectTypes();
            alert("Project Type updated successfully!");
        } catch (error) {
            console.error('Error updating project type:', error);
            alert("There was an error updating the project type. Please try again.");
        }
    };
    

    const handleDelete = async (id) => {
        try {
            await deleteProjectType(id);
            fetchProjectTypes();
        } catch (error) {
            if (error.response) {
                alert("This project type cannot be deleted because it is assigned to one or more projects. Please delete the projects first.");
            } else {
                console.error('Error deleting project type:', error);
            }
        }
    };

    return (
        <div className="project-type-page">
            <h1>Project Types</h1>
            <h2>Create a New Project Type</h2>
            <input
                type="text"
                placeholder="Project Type Name"
                value={newProjectType.name}
                onChange={(e) => setNewProjectType({ ...newProjectType, name: e.target.value })}
            />
            <button className="create-button" onClick={handleCreate}>Create Project Type</button>

            <h2>Current Project Types</h2>
            <ul className="project-type-list">
                {projectTypes.map((projectType) => (
                    <li key={projectType.id} className="project-type-item">
                        <span className="project-type-name">{projectType.name}</span>
                        <div className="project-type-buttons">
                            <button className="edit-button" onClick={() => { 
                                setEditingProjectTypeId(projectType.id); 
                                setNewProjectType({ name: projectType.name }); 
                            }}>
                                Edit
                            </button>
                            <button className="delete-button" onClick={() => handleDelete(projectType.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            {editingProjectTypeId && (
                <div>
                    <h2>Update Project Type</h2>
                    <input
                        type="text"
                        placeholder="Project Type Name"
                        value={newProjectType.name}
                        onChange={(e) => setNewProjectType({ ...newProjectType, name: e.target.value })}
                    />
                    <button className="update-button" onClick={() => handleUpdate(editingProjectTypeId)}>Update Project Type</button>
                </div>
            )}
        </div>
    );
};

export default ProjectTypePage;
