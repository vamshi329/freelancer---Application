import React, { useContext } from 'react';
import '../styles/navbar.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/GeneralContext';
import { FaHome, FaProjectDiagram, FaUserFriends, FaSignOutAlt, FaPlus, FaClipboardList, FaUsersCog } from 'react-icons/fa';

const Navbar = () => {
  const usertype = localStorage.getItem('usertype');
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  return (
    <nav className="sidebar-nav">
      <div className="sidebar-logo" onClick={() => navigate('/')}>ProLancer</div>
      <ul className="sidebar-menu">
        {usertype === 'freelancer' && (
          <>
            <li onClick={() => navigate('/freelancer')}><FaHome /><span>Dashboard</span></li>
            <li onClick={() => navigate('/all-projects')}><FaProjectDiagram /><span>All Projects</span></li>
            <li onClick={() => navigate('/my-projects')}><FaClipboardList /><span>My Projects</span></li>
            <li onClick={() => navigate('/myApplications')}><FaUserFriends /><span>Applications</span></li>
            <li onClick={logout}><FaSignOutAlt /><span>Logout</span></li>
          </>
        )}
        {usertype === 'client' && (
          <>
            <li onClick={() => navigate('/client')}><FaHome /><span>Dashboard</span></li>
            <li onClick={() => navigate('/new-project')}><FaPlus /><span>New Project</span></li>
            <li onClick={() => navigate('/project-applications')}><FaClipboardList /><span>Applications</span></li>
            <li onClick={logout}><FaSignOutAlt /><span>Logout</span></li>
          </>
        )}
        {usertype === 'admin' && (
          <>
            <li onClick={() => navigate('/admin')}><FaHome /><span>Home</span></li>
            <li onClick={() => navigate('/all-users')}><FaUsersCog /><span>All Users</span></li>
            <li onClick={() => navigate('/admin-projects')}><FaProjectDiagram /><span>Projects</span></li>
            <li onClick={() => navigate('/admin-applications')}><FaClipboardList /><span>Applications</span></li>
            <li onClick={logout}><FaSignOutAlt /><span>Logout</span></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;