import { useState } from 'react';
import bgKhayal from '../../assets/images/Premium/bgKhayal.jpeg';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchFilter from '../Home/Models/SearchFilter';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
// Icons
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import GirlIcon from '@mui/icons-material/Girl';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import SearchIcon from '@mui/icons-material/Search';
import HotelIcon from '@mui/icons-material/Hotel';
import HouseIcon from '@mui/icons-material/House';
import MapIcon from '@mui/icons-material/Map';
import StoreIcon from '@mui/icons-material/Store';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AllPropertiesCard from './component/AllPropertiesCard';
import Banner from '../../component/Banner/Banner';

function AllProperties() {
    // State for filters
    const [showTypeForm, setShowTypeForm] = useState(true);
    const [showCategory, setShowCategory] = useState(true);
    const [showLocation, setShowLocation] = useState(true);
    const [showSindhCities, setShowSindhCities] = useState(true);
    const [showPunjabCities, setShowPunjabCities] = useState(true);
    const [showPriceRange, setShowPriceRange] = useState(true);

    const [showRating, setShowRating] = useState(true);
    const [selectedRating, setSelectedRating] = useState(null);

    const ratings = [
        { stars: 5, label: "5 Stars", count: 24 },
        { stars: 4, label: "4 & Up", count: 18 },
        { stars: 3, label: "3 & Up", count: 12 },
        { stars: 2, label: "2 & Up", count: 6 },
        { stars: 1, label: "1 & Up", count: 3 }
    ];
    // Data
    const categories = [
        { name: "Agricultural Land", count: 2, icon: <LocationOnIcon style={{ color: '#4CAF50' }} /> },
        { name: "Apartment", count: 0, icon: <ApartmentIcon style={{ color: '#3F51B5' }} /> },
        { name: "Architecture Engineer", count: 0, icon: <ArchitectureIcon style={{ color: '#FF9800' }} /> },
        { name: "Boys Hostel", count: 0, icon: <PeopleAltIcon style={{ color: '#9C27B0' }} /> },
        { name: "Girls Hostel", count: 0, icon: <GirlIcon style={{ color: '#E91E63' }} /> },
        { name: "Home Developer", count: 0, icon: <EngineeringIcon style={{ color: '#795548' }} /> },
        { name: "Home Inspector", count: 0, icon: <SearchIcon style={{ color: '#607D8B' }} /> },
        { name: "Hotels", count: 0, icon: <HotelIcon style={{ color: '#00BCD4' }} /> },
        { name: "Houses", count: 17, icon: <HouseIcon style={{ color: '#2196F3' }} /> },
        { name: "Map Officer", count: 0, icon: <MapIcon style={{ color: '#8BC34A' }} /> },
        { name: "Plot", count: 0, icon: <LocationOnIcon style={{ color: '#009688' }} /> },
        { name: "Real Estate Photographers", count: 0, icon: <CameraAltIcon style={{ color: '#F44336' }} /> },
        { name: "Shops", count: 5, icon: <StoreIcon style={{ color: '#FF5722' }} /> },
    ];

    const locations = {
        Sindh: ['Karachi', 'Hyderabad', 'Sukkur', 'Larkana', 'Mirpur Khas'],
        Punjab: ['Lahore', 'Faisalabad', 'Rawalpindi', 'Multan', 'Gujranwala']
    };

    return (
        <>
            {/* <div
                style={{
                    backgroundImage: `url(${bgKhayal})`,
                    backgroundPosition: "top",
                    backgroundSize: "cover",
                }}
                className="h-[52vh] w-full border"
            >
                <div className="h-full flex items-center pl-12">
                    <div>
                        <h1 className="text-[40px] text-white font-bold">House</h1>
                        <div className="text-white text-lg">
                            <span>Khaiyal<ChevronRightIcon /></span>
                            <span>All Properties</span>
                        </div>
                    </div>
                </div>
            </div> */}
            <Banner title="All Properties"/>

            <div className='absolute top-[40%] pl-10 w-full'>
                <SearchFilter isHome={true} />
            </div>

            <div className='bg-[#F8F7FA]  flex justify-between  p-8 pt-20'>
                <div className='w-[22%] space-y-3 mt-9'>
                    <div className='border border-slate-100 rounded-lg p-4 bg-white shadow-md'>
                        <div
                            className='flex justify-between font-[700] cursor-pointer'
                            onClick={() => setShowTypeForm(!showTypeForm)}
                        >
                            <div className='flex flex-col'>
                                Type
                                <span className='bg-[#002456] h-1 w-[40px]'></span>
                            </div>
                            <KeyboardArrowUpIcon
                                className={`transform transition-transform duration-300 ${showTypeForm ? 'rotate-0' : 'rotate-180'}`}
                            />
                        </div>
                        <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${showTypeForm ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <form className='flex flex-col mt-4 space-y-3'>
                                {['Buy', 'Sell', 'Rent', 'To-Let', 'Local-services'].map((label, idx) => (
                                    <div key={idx} className='flex items-center'>
                                        <input type="radio" name="type" id={label} className='mr-3' />
                                        <label htmlFor={label} className="text-sm text-slate-700">{label}</label>
                                    </div>
                                ))}
                                <div className='flex items-center text-sm text-slate-700 mt-2'>
                                    <ControlPointIcon sx={{ fontSize: "16px" }} className='mr-2' />
                                    Show More
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className='border border-slate-100 rounded-lg p-4 bg-white shadow-md'>
                        <div
                            className='flex justify-between font-[700] cursor-pointer'
                            onClick={() => setShowCategory(!showCategory)}
                        >
                            <div className='flex flex-col'>
                                Category
                                <span className='bg-[#002456] h-1 w-[40px]'></span>
                            </div>
                            <KeyboardArrowUpIcon
                                className={`transform transition-transform duration-300 ${showCategory ? 'rotate-0' : 'rotate-180'}`}
                            />
                        </div>
                        <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${showCategory ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="overflow-y-auto max-h-[400px] mt-3 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]">
                                <ul className="space-y-3 text-sm text-slate-800 pe-2">
                                    {categories.map((cat, index) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <span className="text-lg">{cat.icon}</span>
                                            <span className="flex-1">{cat.name}</span>
                                            <span className="text-gray-500 text-xs">({cat.count})</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Location Filter */}
                    <div className='border border-slate-100 rounded-lg p-4 bg-white shadow-md'>
                        <div
                            className='flex justify-between font-[700] cursor-pointer'
                            onClick={() => setShowLocation(!showLocation)}
                        >
                            <div className='flex flex-col'>
                                Location
                                <span className='bg-[#002456] h-1 w-[40px]'></span>
                            </div>
                            <KeyboardArrowUpIcon
                                className={`transform transition-transform duration-300 ${showLocation ? 'rotate-0' : 'rotate-180'}`}
                            />
                        </div>

                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${showLocation ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            {/* Sindh Cities */}
                            <div className="mt-4">
                                <div
                                    className="flex justify-between font-[600] cursor-pointer text-slate-700 items-center"
                                    onClick={() => setShowSindhCities(!showSindhCities)}
                                >
                                    <span>Sindh</span>
                                    <KeyboardArrowUpIcon
                                        className={`transform transition-transform duration-300 ${showSindhCities ? 'rotate-0' : 'rotate-180'}`}
                                    />
                                </div>
                                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${showSindhCities ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <ul className="space-y-2 text-sm text-slate-800 pl-7 pt-3">
                                        {locations.Sindh.map((city, index) => (
                                            <li key={`sindh-${index}`} className="hover:text-blue-600 cursor-pointer py-1">
                                                {city}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Punjab Cities */}
                            <div className="mt-4">
                                <div
                                    className="flex justify-between font-[600] cursor-pointer text-slate-700 items-center"
                                    onClick={() => setShowPunjabCities(!showPunjabCities)}
                                >
                                    <span>Punjab (34)</span>
                                    <KeyboardArrowUpIcon
                                        className={`transform transition-transform duration-300 ${showPunjabCities ? 'rotate-0' : 'rotate-180'}`}
                                    />
                                </div>
                                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${showPunjabCities ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <ul className="space-y-2 text-sm text-slate-800 pl-7 pt-3">
                                        {locations.Punjab.map((city, index) => (
                                            <li key={`punjab-${index}`} className="hover:text-blue-600 cursor-pointer py-1">
                                                {city}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Rating Filter */}
                    <div className='border border-slate-100 rounded-lg p-4 bg-white shadow-md'>
                        <div
                            className='flex justify-between font-[700] cursor-pointer'
                            onClick={() => setShowRating(!showRating)}
                        >
                            <div className='flex flex-col'>
                                Rating
                                <span className='bg-[#002456] h-1 w-[40px]'></span>
                            </div>
                            <KeyboardArrowUpIcon
                                className={`transform transition-transform duration-300 ${showRating ? 'rotate-0' : 'rotate-180'}`}
                            />
                        </div>

                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${showRating ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="mt-3">
                                {/* 3.0 & up summary */}
                                <div className="flex items-center    bg-blue-50 rounded">
                                    <div className="flex">
                                        {[1, 2, 3].map((star) => (
                                            <StarIcon key={star} className="text-yellow-400" />
                                        ))}
                                        <StarHalfIcon className="text-yellow-400" />
                                        <StarBorderIcon className="text-yellow-400" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">3.0 & up</span>
                                    <span className="text-xs text-gray-500 ml-auto">(34)</span>
                                </div>

                                {/* Rating options */}
                                <ul className="space-y-1">
                                    {[4, 3, 2, 1].map((stars) => (
                                        <li
                                            key={stars}
                                            className="flex items-center rounded hover:bg-gray-50 cursor-pointer"
                                        >
                                            <div className="flex">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    star <= stars ?
                                                        <StarIcon key={star} className="text-yellow-400 text-sm" /> :
                                                        <StarBorderIcon key={star} className="text-gray-300 text-sm" />
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-700">{stars}.0 & up</span>
                                            <span className="text-xs text-gray-500 ml-auto">({stars * 6})</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Price Range Filter */}
                    <div className='border border-slate-100 rounded-lg p-4 bg-white shadow-md'>
                        <div
                            className='flex justify-between font-[700] cursor-pointer'
                            onClick={() => setShowPriceRange(!showPriceRange)}
                        >
                            <div className='flex flex-col'>
                                Price Range
                                <span className='bg-[#002456] h-1 w-[40px]'></span>
                            </div>
                            <KeyboardArrowUpIcon
                                className={`transform transition-transform duration-300 ${showPriceRange ? 'rotate-0' : 'rotate-180'}`}
                            />
                        </div>

                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${showPriceRange ? 'max-h-[200px] opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                            <div className="flex items-center gap-3">
                                <div className="flex-1">
                                    <input
                                        type="number"
                                        id="minPrice"
                                        placeholder="min"
                                        className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="number"
                                        id="maxPrice"
                                        placeholder="max"
                                        className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div>
                        <button className="mt-4 w-full py-3 bg-[#002456] text-white text-sm font-medium rounded hover:bg-blue-900 transition-colors">
                            Apply Filter
                        </button>
                        <button className="mt-4 w-full py-3 bg-[#002456] text-white text-sm font-medium rounded hover:bg-blue-900 transition-colors">
                            Clear Filter
                        </button>
                    </div>
                </div>

                {/* Right Content Area */}
                <div className='w-[73%]  rounded-lg '>
                    <div className="p-6">
                        <div className="mt-4 text-gray-500">
                            <AllPropertiesCard/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AllProperties;