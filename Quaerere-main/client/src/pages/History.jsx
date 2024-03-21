import React, { useState, useEffect } from 'react';
import axios from 'axios';
import.meta.env.VITE_API_URL

const History = () => {
    const [historyData, setHistoryData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Define a function to fetch data from the API
        const fetchData = async () => {
            try {
                setLoading(true);

                // Your data
                const user_data = localStorage.getItem('user')
                const user = JSON.parse(user_data)
                const email = user.email
                const token = user.token
                const headers = {
                    'Authorization': `Bearer ${token}`,
                };
                // Send a POST request to the API
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/fetchData`, {email},{headers});

                // Set the data received from the API
                setHistoryData(response.data);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl mb-4 font-extrabold underline">History</h1>
            {loading && <p>Loading...</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {historyData.map((item, index) => (
                    <div key={index} className="bg-gray-600 text-white p-4 rounded overflow-hidden">
                        <code>
                            <p>title: {item.title}</p>
                            <p>url: <a href={item.url} className="text-yellow-300" target="_blank" rel="noopener noreferrer">{item.url}</a></p>
                            <p>publishedDate: {item.publishedDate}</p>
                            <p>id: <span className="text-blue-400">{item.id}</span></p>
                            <p>score: {item.score}</p>
                        </code>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default History;
