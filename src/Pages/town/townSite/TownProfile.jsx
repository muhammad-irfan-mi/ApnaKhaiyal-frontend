import React, { useEffect, useState } from 'react';
import Banner from '../../../component/Banner/Banner';
import img from '../../../assets/images/Premium/bukhari.jpeg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const profiles = [
    { name: 'Al Qamar Developers', img: img, ad: false },
    { name: 'Rajpoot Farm House', img: img, ad: false },
    { name: 'Khyban Commercial Centre', img: img, ad: true },
    { name: 'Al Ghafar City', img: img, ad: false },
    { name: 'Smart Builders', img: img, ad: false },
    { name: 'Tulip Real Real Estate', img: 'https://via.placeholder.com/100', ad: false },
    { name: 'Agency Name', img: img, ad: false },
    { name: 'Jinnah Garden', img: img, ad: false },
];

function TownProfile() {
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('Town Owner');
    const [townOwners, setTownOwners] = useState([]);
    const navigate = useNavigate();

    const BASE_URL = import.meta.env.VITE_BASE_URL;


    const handleSearch = () => {
        console.log('Searching for:', keyword, category);
    };
    useEffect(() => {
        const getTownOwners = async () => {
            const response = await axios.get(`${BASE_URL}/api/user/get-all-town-owner/`);
            console.log('Fetched town owners:', response);
            setTownOwners(response.data);
        }
        getTownOwners();
    }, []);

    return (
        <>
            <Banner title='Town Owner' />
            <div className="bg-gray-100 min-h-screen p-6">
                {/* Top Search Bar */}
                <div className="flex flex-col md:flex-row items-center gap-4 my-10">
                    <input
                        type="text"
                        placeholder="Enter your keyword here"
                        className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option >City</option>
                        <option value="Multan">Multan</option>
                        <option value="Bahawalpur">Bahawalpur</option>
                    </select>
                    <button
                        onClick={handleSearch}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Search
                    </button>
                </div>

                <div className='flex justify-between gap-3'>
                    {/* Profile Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" onClick={() => navigate('/profile/town-owner')}>
                        {townOwners.map((town, index) => (
                            <div
                                key={index}
                                className={`rounded-md shadow-md overflow-hidden`}
                            >
                                <img
                                    src={town.img}
                                    alt={town.name}
                                    className="w-full h-32 object-contain bg-white p-2"
                                />
                                <div className="p-3">
                                    <h2 className="font-semibold text-lg">{town.name}</h2>
                                    {/* <p className="text-sm mt-1">{profile.ad ? 'Ad Sponsored' : 'No ad'}</p> */}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='w-[20%] bg-white p-5 h-[1%]'>
                        <h2 className="text-xl font-semibold mb-4">Search Profiles</h2>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Enter your keyword here ..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="">Select a category</option>
                                <option value="town-owner">Town Owner</option>
                            </select>
                        </div>

                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">
                            Search Profile
                        </button>
                    </div>
                </div>
            </div >
        </>
    );
}


export default TownProfile;