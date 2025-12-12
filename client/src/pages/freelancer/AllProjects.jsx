import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import '../../styles/freelancer/AllProjects.css'
import API_URL from '../../config/api' 

const AllProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [displayprojects, setDisplayProjects] = useState([]);
  const [allSkills, setAllSkills] = useState([]); 
  const [categoryFilter, setCategoryFilter] = useState([]);

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/fetch-projects`);
      setProjects(response.data);
      setDisplayProjects(response.data.slice().reverse());
      // Collect all unique skills
      const skillsSet = new Set();
      response.data.forEach(project => {
        (project.skills || []).forEach(skill => skillsSet.add(skill));
      });
      setAllSkills(Array.from(skillsSet));
    } catch (err) {
      console.log(err);
      // Optionally show an error message, but do not retry infinitely
    }
  };

  const handleCategoryCheckBox = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setCategoryFilter([...categoryFilter, value]);
    } else {
      setCategoryFilter(categoryFilter.filter(size => size !== value));
    }
  };

  useEffect(() => {
    if (categoryFilter.length > 0) {
      setDisplayProjects(
        projects.filter(project => categoryFilter.every(skill => (project.skills || []).includes(skill))).reverse()
      );
    } else {
      setDisplayProjects(projects.slice().reverse());
    }
  }, [categoryFilter, projects]);

  return (
    <>
      {projects && (
        <div className="all-projects-page">
          <div className="project-filters">
            <h3>Filters</h3>
            <hr />
            <div className="filters">
              <h5>Skills</h5>
              {allSkills.length > 0 && (
                <div className="filter-options">
                  {allSkills.map((skill) => (
                    <div className="form-check" key={skill}>
                      <input className="form-check-input" type="checkbox" value={skill} id={"skill-"+skill} onChange={handleCategoryCheckBox} />
                      <label className="form-check-label" htmlFor={"skill-"+skill}>{skill}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="projects-list">
            <h3>All projects</h3>
            <hr />
            {displayprojects.length === 0 && <p>No projects available.</p>}
            {displayprojects.map((project) => (
              <div className="listed-project" key={project._id} onClick={() => navigate(`/project/${project._id}`)}>
                <div className='listed-project-head'>
                  <h3>{project.title}</h3>
                  <p>{String(project.postedDate).slice(0,24)}</p>
                </div>
                <h5>Budget &#8377; {project.budget}</h5>
                <p>{project.description}</p>
                <div className="skills">
                  {(project.skills || []).map((skill) => (
                    <h6 key={skill}>{skill}</h6>
                  ))}
                </div>
                <div className="bids-data">
                  <p>{project.bids ? project.bids.length : 0} bids</p>
                  <h6>&#8377; {project.bids && project.bidAmounts ? (project.bidAmounts.reduce((acc, curr) => acc + curr, 0)) : 0} (avg bid)</h6>
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default AllProjects