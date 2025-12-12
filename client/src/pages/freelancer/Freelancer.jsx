import React, { useEffect, useState } from 'react'
import '../../styles/freelancer/freelancer.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaProjectDiagram, FaCheckCircle, FaFileAlt, FaWallet, FaUserCircle } from 'react-icons/fa';
import { MdWork, MdDescription } from 'react-icons/md';
import API_URL from '../../config/api';

const Freelancer = () => {

  const [isDataUpdateOpen, setIsDataUpdateOpen] = useState(false);

  const navigate = useNavigate();

  const [freelancerData, setFreelancerData] = useState();

  const [skills, setSkills] = useState([]);

  const [description, setDescription] = useState('');

  const [freelancerId, setFreelancerId] = useState('');

  const [updateSkills, setUpdateSkills] = useState('');

  const [updateDescription, setUpdateDescription] = useState('');

  const [applicationsCount, setApplicationsCount] = useState([]);

  useEffect(()=>{
    fetchUserData(localStorage.getItem('userId'));
  },[])

  const fetchUserData = async(id) =>{
      axios.get(`${API_URL}/fetch-freelancer/${id}`).then(
        (response)=>{
          setFreelancerData(response.data);
          if(response.data){
            setFreelancerId(response.data._id);
            setSkills(response.data.skills);
            setDescription(response.data.description);
            setUpdateSkills(response.data.skills);
            setUpdateDescription(response.data.description);
          }
        }
      )
  }

  const updateUserData = async() =>{
    axios.post(`${API_URL}/update-freelancer`, {freelancerId, updateSkills: updateSkills, description: updateDescription}).then(
        (response)=>{
          fetchUserData();
          alert("User data updated")
        }
      )
  }


  useEffect(()=>{
    fetchApplications();
  },[])

  const fetchApplications = async() =>{
    await axios.get(`${API_URL}/fetch-applications`).then(
      (response)=>{
        setApplicationsCount(response.data.filter((application)=> application.freelancerId === localStorage.getItem('userId')));
        console.log(response.data);
      }
    ).catch((err)=>{
      console.log(err);
    })
  }


  return (
    <>
      {freelancerData ? 
        <div className="freelancer-dashboard-modern">
          <div className="dashboard-welcome">
            <div className="welcome-avatar">
              <FaUserCircle size={60} />
            </div>
            <div>
              <h2>Welcome, {freelancerData.name || 'Freelancer'}!</h2>
              <p className="welcome-sub">Here's your freelance overview and quick stats.</p>
            </div>
          </div>

          <div className="dashboard-stats-grid">
            <div className="stat-card" onClick={() => navigate('/my-projects')}>
              <FaProjectDiagram className="stat-icon" />
              <div>
                <h4>Current Projects</h4>
                <p>{freelancerData.currentProjects.length}</p>
              </div>
            </div>
            <div className="stat-card" onClick={() => navigate('/my-projects')}>
              <FaCheckCircle className="stat-icon" />
              <div>
                <h4>Completed Projects</h4>
                <p>{freelancerData.completedProjects.length}</p>
              </div>
            </div>
            <div className="stat-card" onClick={() => navigate('/myApplications')}>
              <FaFileAlt className="stat-icon" />
              <div>
                <h4>Applications</h4>
                <p>{applicationsCount.length}</p>
              </div>
            </div>
            <div className="stat-card">
              <FaWallet className="stat-icon" />
              <div>
                <h4>Funds</h4>
                <p>₹{freelancerData.funds}</p>
              </div>
            </div>
          </div>

          <div className="dashboard-profile-section">
            <div className="profile-card">
              <div className="profile-header">
                <MdWork className="profile-icon" />
                <h4>My Skills</h4>
              </div>
              <div className="skills-list">
                {skills.map((skill) => (
                  <span className="skill-badge" key={skill}>{skill}</span>
                ))}
                {skills.length === 0 && <p className="no-data">No skills available</p>}
              </div>
            </div>
            <div className="profile-card">
              <div className="profile-header">
                <MdDescription className="profile-icon" />
                <h4>About Me</h4>
              </div>
              <p className="profile-description">
                {description || 'Please add your description'}
              </p>
            </div>
            <div className="profile-card profile-edit-card">
              {!isDataUpdateOpen ? (
                <button className="btn btn-outline-success" onClick={() => setIsDataUpdateOpen(true)}>
                  Update Profile
                </button>
              ) : (
                <div className="profile-edit-form">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter skills (comma separated)"
                    value={updateSkills}
                    onChange={(e) => setUpdateSkills(e.target.value)}
                  />
                  <textarea
                    className="form-control"
                    placeholder="Tell us about yourself"
                    value={updateDescription}
                    onChange={(e) => setUpdateDescription(e.target.value)}
                  ></textarea>
                  <div className="edit-actions">
                    <button className="btn btn-outline-success" onClick={updateUserData}>
                      Save Changes
                    </button>
                    <button className="btn btn-outline-secondary" onClick={() => setIsDataUpdateOpen(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      : ""}
    </>
  )
}

export default Freelancer