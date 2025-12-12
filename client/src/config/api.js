// Dynamic API URL based on environment
const API_URL = process.env.NODE_ENV === 'production' 
    ? 'https://prolancer-api.onrender.com'
 
    : 'http://localhost:10000';

export default API_URL;
