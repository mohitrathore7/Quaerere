import { create } from 'zustand'
import axios from 'axios'
import.meta.env.VITE_API_URL

const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: localStorage.getItem('user') ? true : false,
    login: async(userData) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, userData);
      
            const user = response.data; 
            console.log('api',user)
            set({ user, isAuthenticated: true });
      
            localStorage.setItem('user', JSON.stringify(user));
          } catch (error) {
            console.error('Error logging in:', error);
            throw error;
          }
    },
    register: async(userData) => { 
        try {
            // Make a POST request to the registration API
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, userData);
      
            // Assuming the response contains the user data, update the store
            const newUser = response.data; // Modify this based on your API response structure
            console.log(response)
            set({ user: newUser, isAuthenticated: true });
      
            // Store user data in local storage
            localStorage.setItem('user', JSON.stringify(newUser));
          } catch (error) {
            console.error('Error registering user:', error);
            // Handle registration failure (e.g., show an error message)
          }
    },
    logout: () => {
        // Implement your logout logic here
        // Example:
        // Clear user data and set isAuthenticated to false.

        // Simulate a logout for testing purposes.
        set({ user: null, isAuthenticated: false });

        // Remove user data from local storage
        localStorage.removeItem('user');
    },
}));

export default useAuthStore;