import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import DeveloperPage from './components/DeveloperPage';
import ProjectPage from './components/ProjectPage';
import TeamPage from './components/TeamPage';
import ProjectTypePage from './components/ProjectTypePage';
import RolePage from './components/RolePage';
import './App.css';

function App() {
    return (
        <Router>
        <div className='app-container'>
            <Header />
            <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/developers" element={<DeveloperPage />} />
                <Route path="/projects" element={<ProjectPage />} />
                <Route path="/teams" element={<TeamPage />} />
                <Route path="/project-types" element={<ProjectTypePage />} />
                <Route path="/roles" element={<RolePage />} /> 
            </Routes>
            </main>
            <Footer />
            </div>
        </Router>
    );
}

export default App;