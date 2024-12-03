import axios from 'axios';

const API = axios.create({
    baseURL: 'http://98.81.244.21:5000/api',
});

/*const API = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
});*/

/*const API = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
});*/


export default API;


export const fetchAdoptersForDropdown = async () => {
    try {
        const response = await API.get('/users');
        return response.data.map(user => ({
            value: user._id,
            label: `${user.firstName} ${user.lastName}`,
        }));
    } catch (error) {
        console.error('Error fetching adopters:', error);
        throw error; 
    }
};
