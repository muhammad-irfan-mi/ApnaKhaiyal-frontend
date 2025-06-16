import React from 'react';
import presentedtBy from '../../../assets/images/recentadds/presentedBy.jpeg';
import towstoryhouse from '../../../assets/images/recentadds/doubleStory.jpeg';
import plot from '../../../assets/images/recentadds/plot.jpeg';
import bookNow from '../../../assets/images/recentadds/bookNow.jpeg';
import tableInCard from '../../../assets/images/tableInCard.jpeg';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewIcon from '@mui/icons-material/GridView';
function AllPropertiesCard() {
    const products = [
        {
            id: 0,
            img: presentedtBy,
            textItem: '10 marla',
            timeperiod: "4 month ago",
            location: "Vehari, Punjab",
            views: "15 Views",
            price: "Rs 500,000",
            newOne: "new"
        },
        {
            id: 1,
            img: towstoryhouse,
            textItem: '10 Marla Double-Story Corner House for Sale',
            timeperiod: "5 month ago",
            location: "Lahore, Punjab",
            views: "20 Views",
            price: "Rs 1,500,000",
            newOne: "new"
        },
        {
            id: 2,
            img: bookNow,
            textItem: '10 Marla Residential Plot in Orion Town Lodhran',
            timeperiod: "5 month ago",
            location: "Lodhran, Punjab",
            views: "25 Views",
            price: "Rs 800,000",
            newOne: "new"
        },
        {
            id: 3,
            img: bookNow,
            textItem: '15 Marla Residential Plot in Orion Town Lodhran',
            timeperiod: "4 month ago",
            location: "Multan, Punjab",
            views: "18 Views",
            price: "Rs 1,200,000",
            newOne: "new"
        },
        {
            id: 4,
            img: presentedtBy,
            textItem: '2 marla',
            timeperiod: "4 month ago",
            location: "Islamabad",
            views: "30 Views",
            price: "Rs 500,000",
            newOne: "new"
        },
        {
            id: 5,
            img: towstoryhouse,
            textItem: '2 story house',
            timeperiod: "1 month ago",
            location: "Karachi, Sindh",
            views: "22 Views",
            price: "Rs 1,300,000 - Rs 1,400,000",
            newOne: "new"
        },
        {
            id: 6,
            img: presentedtBy,
            textItem: '2 Marla',
            timeperiod: "4 month ago",
            location: "Faisalabad, Punjab",
            views: "17 Views",
            price: "Rs 500,000 - Rs 700,000",
            newOne: "new"
        },
        {
            id: 7,
            img: plot,
            textItem: '5 Marla residential plot In Arena City',
            timeperiod: "5 month ago",
            location: "Rawalpindi, Punjab",
            views: "28 Views",
            price: "Rs 900,000",
            newOne: "new"
        },
        {
            id: 8,
            img: plot,
            textItem: '5 Marla Residential Plot in Orion Town Lodhran',
            timeperiod: "5 month ago",
            location: "Bahawalpur, Punjab",
            views: "19 Views",
            price: "Rs 850,000",
            newOne: "new"
        },
        {
            id: 9,
            img: plot,
            textItem: '6 Marla Double Story luxury House for sale',
            timeperiod: "1 month ago",
            location: "Gujranwala, Punjab",
            views: "35 Views",
            price: "Rs 2,200,000",
            newOne: "new"
        },
        {
            id: 10,
            img: tableInCard,
            textItem: '6 Marla Residential Plot in Orion Town Lodhran',
            timeperiod: "5 month ago",
            location: "Sialkot, Punjab",
            views: "24 Views",
            price: "Rs 950,000",
            newOne: "new"
        },
        {
            id: 11,
            img: towstoryhouse,
            textItem: '6 Marla Residential Plot in Orion Town Lodhran',
            timeperiod: "5 month ago",
            location: "Sargodha, Punjab",
            views: "21 Views",
            price: "Rs 920,000",
            newOne: "new"
        },
        {
            id: 12,
            img: towstoryhouse,
            textItem: 'House For Rent (Double Story)',
            timeperiod: "1 month ago",
            location: "Vehari, Punjab",
            views: "15 Views",
            price: "₨32,000 – ₨35,000 per month",
            newOne: "new"
        }
    ];

    return (
        <div className=' mx-auto'>
            <div className='flex justify-between items-center bg-white shadow-lg rounded-lg capitalize px-7 py-2  mb-6'>
                <h2 className='text-md font-bold text-gray-800'>Showing 1-7 of 7 results</h2>
                <div className='w-[35%] h-[45px] flex  items-center'>
                    <select name="" id="" className='h-[60%] border border-slate-600 rounded-[2px] focus:border-slate-300 cursor-pointer'>
                        <option value="">Select option</option>
                        <option value="">A to Z title</option>
                        <option value="">Z to A title</option>
                        <option value="">Recently Added (latest) </option>
                        <option value="">Data Added (oldest) </option>
                        <option value="">Most Views </option>
                        <option value="">Less Views </option>
                        <option value="">Price (Low to hight) </option>
                        <option value="">Price (high to low) </option>
                        <option value="">Less Viewed </option>
                    </select>

                    <FormatListBulletedIcon className='text-slate-500 mx-2' />
                    <GridViewIcon className='text-slate-500' />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300" 
                    >
                        {/* Image Section */}
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={product.img}
                                alt={product.textItem}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />


                            {/* For Sale Badge */}
                            {/* <div className="absolute top-3 left-0 bg-[#0b2a53] text-white px-3 py-1 font-bold text-sm after:content-[''] after:absolute after:top-0 after:right-[-12px] after:border-y-[16px] after:border-l-[12px] after:border-y-transparent after:border-l-[#0b2a53]">
                                For Sale
                            </div> */}

                            <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black to-transparent transform translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-in-out z-0"></div>

                            {/* Action Buttons */}
                            <div className="absolute bottom-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button className="transition transform duration-300 ease-in-out cursor-pointer bg-white px-2 rounded-md shadow hover:text-white hover:bg-blue-950">
                                    <FavoriteBorderOutlinedIcon fontSize="small" />
                                </button>
                                <button className="transition transform ease-in-out duration-300 cursor-pointer bg-white p-2 rounded-md shadow hover:bg-blue-950 hover:text-white">
                                    <ZoomInOutlinedIcon fontSize="small" />
                                </button>
                                <button className="transition transform ease-in-out duration-300 cursor-pointer bg-white  p-2 rounded-md shadow hover:text-white hover:bg-blue-950">
                                    <CompareArrowsOutlinedIcon fontSize="small" />
                                </button>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-4">
                            <div className='bg-red-600 w-fit text-sm p-1 rounded capitalize text-white'>
                                {product.newOne}
                            </div>
                            <h3 className="font-semibold text-lg text-gray-800 mb-1 line-clamp-2 hover:text-blue-950 hover:underline hover:decoration-amber-400 cursor-pointer">
                                {product.textItem}
                            </h3>

                            {/* Time Period */}
                            <div className="flex items-center text-gray-500 text-sm mt-2">
                                <AccessTimeOutlinedIcon fontSize="small" className="mr-1" />
                                <span>{product.timeperiod}</span>
                            </div>

                            {/* Location */}
                            <div className="flex items-center text-gray-500 text-sm mt-1">
                                <LocationOnOutlinedIcon fontSize="small" className="mr-1" />
                                <span>{product.location}</span>
                            </div>

                            {/* Views */}
                            <div className="flex items-center text-gray-500 text-sm mt-1">
                                <VisibilityOutlinedIcon fontSize="small" className="mr-1" />
                                <span>{product.views}</span>
                            </div>

                            {/* Price */}
                            <div className="font-bold text-blue-900 mt-2">
                                {product.price}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllPropertiesCard;