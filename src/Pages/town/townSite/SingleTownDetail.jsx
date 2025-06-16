import { Box } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ImageIcon from '@mui/icons-material/Image';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Banner from '../../../component/Banner/Banner';
import { Context } from '../../../Context/ContextProvider';
import PLotStatusforAdmin from '../../../component/modal/townplot/PLotStatusforAdmin';
import PLotStatusforUser from '../../../component/modal/townplot/PlotStatusforUser';

const SingleTownDetail = () => {
    const [town, setTown] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [plotInfo, setPlotInfo] = useState([]);
    const [plotNumberId, setPlotNumberId] = useState('');
    const [plotStatusModal, setPlotStatusModal] = useState(false);
    const location = useLocation();
    const { townId } = location.state || {};
    const { userInfo } = useContext(Context)

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const userId = town?.userId

    useEffect(() => {
        if (!townId) return;

        const getTown = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/town/${townId}`);
                console.log('Fetched town:', response.data.town);
                setTown(response.data.town);
            } catch (error) {
                console.error('Error fetching town data:', error);
            }
        };

        getTown();
    }, [townId]);

    const handlePlotStatus = (plotId, plotInfo) => {
        if (userInfo._id == userId) {
            setIsAdmin(true)
        }
        setPlotNumberId(plotId)
        setPlotStatusModal(true);
        setPlotInfo(plotInfo)
    }

    if (!town) return <p className="text-center text-gray-500">Loading town details...</p>;

    return (
        <>
            <Banner />
            <div className="p-6 bg-white rounded-xl shadow-lg space-y-6 relative">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{town?.name}</h2>
                    <div className="flex items-center text-gray-600 gap-4">
                        <LocationOnIcon />
                        <span>{town?.address}, {town?.city}</span>
                    </div>
                    <p className="text-sm text-gray-500">Area: {town?.area}</p>
                    <img src={town?.location} alt="Town Main" className="w-full max-h-96 object-cover rounded-lg mt-4" />
                </div>

                {town?.noc && (
                    <div className="flex items-center gap-2">
                        <PictureAsPdfIcon className="text-red-500" />
                        <a href={town.noc} target="_blank" rel="noreferrer" className="text-blue-600 underline">NOC Document</a>
                    </div>
                )}

                {/* Documents */}
                {Array.isArray(town?.documents) && town.documents.length > 0 && (
                    <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Documents:</h3>
                        <div className="flex flex-wrap gap-4">
                            {town.documents.map((doc, idx) => (
                                <a key={idx} href={doc} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-blue-500">
                                    <DescriptionIcon />
                                    Document {idx + 1}
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* Phases */}
                {Array.isArray(town?.phases) && town.phases.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800">Phases</h3>
                        {town.phases.map((phase, i) => {
                            const totalPlots = phase.plots.reduce((sum, p) => sum + p.quantity, 0);
                            return (
                                <div key={i} className="bg-gray-100 rounded-xl p-4 shadow">
                                    <h4 className="text-md font-bold mb-2"> {phase.name} </h4>
                                    <h4 className="text-md font-bold mb-2"> Total Plots: {totalPlots}</h4>

                                    {/* Plot boxes */}
                                    <div className="flex flex-wrap gap-4">
                                        {phase.plots.map((plot, j) => (
                                            <div
                                                key={j}
                                                className="border border-gray-300 p-4 rounded-lg shadow-md bg-white w-full"
                                            >
                                                <p className="font-semibold mb-2">Marla: {plot.marla}</p>

                                                <div className="flex flex-wrap gap-4">
                                                    {plot.plotNumbers.map((plotNumObj, idx) => {
                                                        const isPending = plotNumObj.status?.toLowerCase() === 'pending';
                                                        return (
                                                            <div
                                                                key={plotNumObj._id || idx}
                                                                className={`rounded-md p-3 w-fit text-white shadow-md text-sm ${isPending ? 'bg-green-500' : 'bg-red-500'
                                                                    }`}
                                                                onClick={() => handlePlotStatus(plotNumObj._id, plotNumObj)}
                                                            >
                                                                <p className="font-semibold">Plot No : {plotNumObj.number}</p>
                                                                <p> {plotNumObj.status}</p>
                                                                {/* <p className="text-xs text-gray-200 mt-1">{plot.dealerName || 'No Name'}</p>
                                                                <p className="text-xs text-gray-200 mt-1">{plot.dealerContact || '123'}</p> */}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {phase.images?.length > 0 && (
                                        <div className="mt-3">
                                            <p className="text-sm font-medium text-gray-600">Images:</p>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {phase.images.map((img) => (
                                                    <img
                                                        key={img._id}
                                                        src={img.path}
                                                        alt="Phase"
                                                        className="w-28 h-20 object-cover rounded-md border"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {phase.video && (
                                        <div className="mt-3">
                                            <p className="text-sm font-medium text-gray-600 flex items-center gap-1">
                                                <VideoLibraryIcon fontSize="small" /> Video:
                                            </p>
                                            <video controls className="w-full max-w-md mt-1 rounded-md">
                                                <source src={phase.video} type="video/webm" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            {isAdmin ?
                <PLotStatusforAdmin
                    open={plotStatusModal}
                    onClose={() => setPlotStatusModal(false)}
                    plotNumberId={plotNumberId}
                    plotInfo={plotInfo}
                /> :
                <PLotStatusforUser
                    open={plotStatusModal}
                    onClose={() => setPlotStatusModal(false)}
                    plotInfo={plotInfo}
                />
            }

        </>
    );
};

export default SingleTownDetail;
