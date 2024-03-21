import React, { useState } from 'react';
import axios from 'axios';
import.meta.env.VITE_API_URL

function Similar() {
    const [response, setResponse] = useState(null);
    const [url, setUrl] = useState("");
    const [num, setNum] = useState(1);
    const [excludeDomains, setExcludeDomains] = useState([""]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState("");
    const [loading, setLoading] = useState(false);
    const [SaveData, setToSave] = useState(false);

    const sendCurlRequest = async () => {
        try {
            setLoading(true);
            const request_body = {
                url: url,
                numResults: Number(num),
                excludeDomains: excludeDomains.filter(domain => domain.trim() !== "")
            };
            const user = localStorage.getItem('user');
            const user_data = JSON.parse(user);
            const email = user_data.email;
            const accessToken = user_data.token;
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/find-similar`, { request_body }, { headers });

            console.log(response)
            setResponse(response.data);
            console.log('Curl request successfully sent:', response.data);
        } catch (error) {
            console.error('Error sending curl request:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDomainChange = (index, value) => {
        const newDomains = [...excludeDomains];
        newDomains[index] = value;
        setExcludeDomains(newDomains);
    };

    const addDomainInput = () => {
        setExcludeDomains([...excludeDomains, ""]);
    };

    const deleteDomain = (index) => {
        const newDomains = [...excludeDomains];
        newDomains.splice(index, 1);
        setExcludeDomains(newDomains);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const exploreItem = async (id) => {
        try {
            setLoading(true);
            const requestBody = {
                id: id,
            };

            const user = localStorage.getItem('user');
            const user_data = JSON.parse(user);
            const accessToken = user_data.token;

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/fetch-Content`, requestBody,{headers});
            console.log(response,"response")
            setModalData(response.data.contents[0].extract);
        } catch (error) {
            console.error('Error sending curl request:', error);
        } finally {
            setLoading(false);
            openModal();
        }
    };

    const saveItem = async (item) => {
        try {
            const user = localStorage.getItem('user');
            const user_data = JSON.parse(user);
            const email = user_data.email;
            const toSave = true; // You want to save the item
            const accessToken = user_data.token;
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
            };
            const requestBody = {
                email,
                toSave,
                item ,
            };
            const data = await axios.post(`${import.meta.env.VITE_API_URL}/api/saveData`, requestBody, { headers });
            // You can optionally handle success here or update the UI
            alert("Item saved")
            console.log(data)
        } catch (error) {
            console.error('Error saving item:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-wrap justify-between">
                {/* Input Section */}
                <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                    <h1 className="text-3xl mb-4 font-extrabold underline">Find Similar Links</h1>
                    <div className="mb-4">
                        <label className="block mb-2">URL:</label>
                        <input
                            type="text"
                            className="border-2 p-2 w-full"
                            onChange={(e) => { setUrl(e.target.value) }}
                            placeholder="URL"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Number of Results:</label>
                        <input
                            type="number"
                            value={num}
                            className="border-2 p-2 w-full"
                            onChange={(e) => { setNum(e.target.value) }}
                            placeholder="Number of Results"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Exclude Domains:</label>
                        {excludeDomains.map((domain, index) => (
                            <div key={index} className="mb-2">
                                <input
                                    type="text"
                                    value={domain}
                                    onChange={(e) => handleDomainChange(index, e.target.value)}
                                    placeholder={`Excluded Domain ${index + 1}`}
                                    className="border-2 p-2 w-full"
                                />
                                <button onClick={() => deleteDomain(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 w-full rounded mt-2">
                                    Delete Domain
                                </button>
                            </div>
                        ))}
                        <button onClick={addDomainInput} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                            Add Excluded Domain
                        </button>
                    </div>
                    <button onClick={sendCurlRequest} className="bg-green-500 w-full hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Send Curl Request
                    </button>
                </div>

                {/* Cards Section */}
                <div className="w-full md:w-1/2 lg:w-2/3 p-4">
                    {loading && <p>Loading...</p>}
                    {response && (
                        <div className="mt-4" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'scroll' }}>
                            <h2 className="text-2xl mb-2">Results:</h2>
                            <div className="flex-col justify-between gap-4">
                                {response.map((item, index) => (
                                    <div key={index} className="bg-gray-600 my-4 text-white p-4 rounded overflow-hidden">
                                        <code>
                                            <p>title : {item.title}</p>
                                            <p className='overflow-x-auto'>url : <a href={`${item.url}`} className='text-yellow-300'>{item.url}</a></p>
                                            <p>Published Data : <span className='overflow-x-auto'>{item.publishedDate}</span></p>
                                            <div className='flex justify-stretch gap-6'>
                                            <button onClick={() => exploreItem(item.id)} className="bg-blue-500 hover.bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                                                Learn More
                                            </button>
                                            <button onClick={() => saveItem(item)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded mt-2">
                                                Save
                                            </button>
                                            </div>
                                        </code>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="border-2 text-white bg-gray-600 p-4 rounded-lg shadow-md">
                        <h2 className="text-xl mb-2 font-extrabold">Exploration Result</h2>
                        <p className='w-[100vw] h-[50vh]'>{modalData}</p>
                        <button onClick={closeModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Similar;
