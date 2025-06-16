import React, { useContext, useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { Loader } from 'lucide-react';
import TownCard from '../TownList/TownCard';
import Banner from '../../../component/Banner/Banner';
import { Context } from '../../../Context/ContextProvider';

const TownListMain = () => {
    const [towns, setTowns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userInfo } = useContext(Context)


    const id = userInfo?._id
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    // useEffect(() => {
    //   const fetchTowns = async () => {
    //     try {
    //       setLoading(true);
    //       const data = await api.getTowns();
    //       setTowns(data);
    //       setError(null);
    //     } catch (err) {
    //       console.error('Failed to fetch towns:', err);
    //       setError('Failed to load towns. Please try again later.');
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    //   fetchTowns();
    // }, []);

    useEffect(() => {
        const getTowns = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${BASE_URL}/api/town/by-user/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTowns(data.towns);
                console.log("town data", data.towns);
            } catch (err) {
                console.error('Error fetching towns:', err);
                setError('Failed to load towns. Please try again later.');
            } finally {
                setLoading(false);
            }
        }

        getTowns();
    }, []);

    console.log("object towns", towns);
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="flex flex-col items-center">
                    <Loader className="w-10 h-10 text-blue-800 animate-spin" />
                    <p className="mt-4 text-gray-600">Loading towns...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 text-center">
                <p>{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-md transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (towns.length === 0) {
        return (
            <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Towns Found</h2>
                <p className="text-gray-600 mb-6">There are no towns in the system yet.</p>
                <a
                    href="/add-town"
                    className="inline-block px-6 py-3 bg-blue-800 text-white rounded-md hover:bg-blue-900 transition-colors"
                >
                    Add Your First Town
                </a>
            </div>
        );
    }

    return (
        <>
            <Banner title='Town Directory' />
            <div className="space-y-8 p-10">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {towns.map(town => (
                        <TownCard key={town.id} town={town} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default TownListMain;