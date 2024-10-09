import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to ="/">Home</Link></li>
                    <li><Link to ="/projects">Projects</Link></li>
                    <li><Link to ="/developers">Developers</Link></li>
                    <li><Link to ="/teams">Teams</Link></li>
                    <li><Link to ="/project-types">Project Types</Link></li>
                    <li><Link to ="/roles">Developer Roles</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;