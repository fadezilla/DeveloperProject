import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7082/api',
});

export const getDevelopers = () => api.get('/developer');
export const createDeveloper = (developer) => api.post('/developer', developer);
export const updateDeveloper = (id, developer) => api.put(`/developer/${id}`, developer);
export const deleteDeveloper = (id) => api.delete(`/developer/${id}`);

export const getProjects = () => api.get('/projects');
export const createProject = (project) => api.post('/projects', project);
export const updateProject = (id, project) => api.put(`/projects/${id}`, project);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

export const getTeams = () => api.get('/team');
export const createTeam = (team) => api.post('/team', team);
export const updateTeam = (id, team) => api.put(`/team/${id}`, team);
export const deleteTeam = (id) => api.delete(`/team/${id}`);

export const getProjectTypes = () => api.get('/projecttypes');
export const createProjectType = (projectType) => api.post('/projecttypes', projectType);
export const updateProjectType = (id, projectType) => api.put(`/projecttypes/${id}`, projectType);
export const deleteProjectType = (id) => api.delete(`/projecttypes/${id}`);

export const getRoles = () => api.get('/role');
export const createRole = (role) => api.post('/role', role);
export const updateRole = (id, role) => api.put(`/role/${id}`, role);
export const deleteRole = (id) => api.delete(`/role/${id}`);