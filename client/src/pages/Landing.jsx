import React, { useEffect } from 'react'
import '../styles/landing.css'
import {PiStudent} from 'react-icons/pi'
import {FaHandHoldingWater} from 'react-icons/fa'
import {MdHealthAndSafety} from 'react-icons/md'
import {useNavigate} from 'react-router-dom'
import landingBg from '../images/landing-bg.jpg';

const Landing = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    if (localStorage.getItem("usertype") === 'freelancer'){
      navigate("/freelancer")
    } else if (localStorage.getItem("usertype") === 'client'){
      navigate("/client")
    } else if (localStorage.getItem("usertype") === 'admin'){
      navigate("/admin")
    }
  }, [navigate])


  return (
    <div className="landing-page" style={{
      background: `linear-gradient(135deg, rgba(245,247,250,0.95) 0%, rgba(232,240,254,0.95) 100%), url(${landingBg}) center/cover no-repeat`
    }}>

        <div className="landing-hero">

            <div className='landing-nav'>
              <h3>ProLancer</h3>
              <button onClick={()=> navigate('/authenticate')} >Sign In</button>
            </div>

            <div className="landing-hero-text fade-in">
              <span className="landing-tagline">The Future of Freelancing Starts Here</span>
              <h1>Empower Your Journey<br />Elevate Your Craft on ProLancer</h1>
              <p>Dive into a realm of endless possibilities. Unleash your creativity, skills, and passion as you embark on a freelancing journey like never before. ProLancer connects talented freelancers with businesses seeking excellence.</p>
            </div>

            <div className="landing-features fade-in">
              <div className="feature-card">
                <PiStudent size={48} color="#4A90E2" />
                <h4>For Freelancers</h4>
                <p>Showcase your skills, find exciting projects, and grow your career with trusted clients worldwide.</p>
              </div>
              <div className="feature-card">
                <FaHandHoldingWater size={48} color="#E74C3C" />
                <h4>For Clients</h4>
                <p>Post projects, discover top talent, and bring your ideas to life with the right freelancer for every job.</p>
              </div>
              <div className="feature-card">
                <MdHealthAndSafety size={48} color="#2C3E50" />
                <h4>Secure & Reliable</h4>
                <p>Enjoy a safe, transparent platform with secure payments and dedicated support for every user.</p>
              </div>
            </div>

            <div className="trusted-by fade-in">
              <span>Trusted by:</span>
              <div className="trusted-logos">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Dell_Logo.png" alt="Dell" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Microsoft_logo_%282012%29.svg" alt="Microsoft" />
              </div>
            </div>

            <footer className="landing-footer fade-in">
              <span>© {new Date().getFullYear()} ProLancer. All rights reserved.</span>
            </footer>

        </div>

    </div>
  )
}

export default Landing