import React, { useContext } from 'react'
import orionGroups from '../../../assets/images/recentadds/orionGroup.jpeg'
import allNoor from '../../../assets/images/recentadds/alNoor.jpeg'
import khaiyalLogos from '../../../assets/images/recentadds/KhaiyalLogos.png'
import allAhmad from '../../../assets/images/recentadds/alAhmad.jpeg'
import rao1 from '../../../assets/images/rao1.jpeg';
import rao2 from '../../../assets/images/rao2.jpeg';
import mailse from '../../../assets/images/mailsi.jpeg';
import { Context } from '../../../Context/ContextProvider'
import bahawalpur from '../../../assets/images/Bahawalpur.jpeg'
import Lodhran from '../../../assets/images/Lodhran.jpeg'
import faisalabad from '../../../assets/images/Faisalabad.jpeg'
import dgKhan from '../../../assets/images/DGKhan.jpeg'
import vehari from '../../../assets/images/Vehari.jpeg'
import kahroorPakka from '../../../assets/images/kahroorPakka.jpeg'
import Multan from '../../../assets/images/Multan.jpeg'
import RYKhan from '../../../assets/images/RahimYarKhan.jpeg'
import mailsi from '../../../assets/images/MailsiBridge.jpeg'

import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
export default function Overseas() {
    const { theme } = useContext(Context)
    const products = [
        { id: 0, img: khaiyalLogos, text: "Khaiyal Group" },
        { id: 1, img: allNoor, text: "Al-Noor Garden Lodhran" },
        { id: 2, img: orionGroups, text: "Orion Town" },
        { id: 3, img: allAhmad, text: "Al Ahmed Builders" },
    ];

    const CardsItems = [
        { id: 0, img: rao2, date: "April 1, 2025", heading1: "Exclusive 20% Discount for Khaiyal Members at Chughtai Lab!", discription: "We are excited to announce a groundbreaking partnership between Khaiyal.com and Chughtai Lab, bringing exclusive healthcare benefits to our valued…" },
        { id: 1, img: mailse, date: "July 8, 2019", heading1: "Field Visit: Meeting Between Khaiyal Group and Bhukari Hub Mailsi", discription: "In a recent visit packed with potential, Rao Sajjad Ahmed, the dynamic owner of Khaiyal Group, sat down with Tasawar…" },
        { id: 2, img: rao1, date: "July 2, 2019", heading1: "Rao Sajjad Meeting withInvestors: Leads the Way in Real Estate Marketing", discription: "Rao Sajjad Ahmed, the visionary owner of Khaiyal Group, recently embarked on a series of impactful meetings with investors, town…" },
    ]

    const TopCities = [
        { id: 0, cityName: "Bahawalpur", PostedAdd: "8 ads posted", img: bahawalpur },
        { id: 1, cityName: "Lodhran", PostedAdd: "11 ads posted", img: Lodhran },
        { id: 2, cityName: "Faisalabad", PostedAdd: "1 ad posted", img: faisalabad },
        { id: 3, cityName: "DG Khan", PostedAdd: "0 ad posted", img: dgKhan },
        { id: 4, cityName: "Vehari", PostedAdd: "8 ads posted", img: vehari },
        { id: 5, cityName: "Kahroor pakka", PostedAdd: "0 ad posted", img: kahroorPakka },
        { id: 6, cityName: "Multan", PostedAdd: "1 ad posted", img: Multan },
        { id: 6, cityName: "Rahim Yar Khan", PostedAdd: "4 ads posted", img: RYKhan },
        { id: 7, cityName: "mailsi", PostedAdd: "0 ad posted", img: mailsi },
    ]
    return (
        <div className='px-5 py-6 relative top-60 bg-[#FFFFFF]'>
            <h1 className='text-3xl font-bold mb-6 text-slate-700'>Khaiyal Premium Family Projects</h1>

            <div className='flex flex-wrap gap-4 justify-between'>
                {products.map((product) => (
                    <div key={product.id} className='w-[20%] flex flex-col justify-center items-center'>
                        <img src={product.img} alt={product.text} className=' object-cover rounded-md' />
                        <a className='flex justify-center items-center hover:text-blue-500 transition transform scale-110 mt-2 font-semibold'>{product.text}</a>
                    </div>
                ))}
            </div>
            <div className='h-[200px] flex items-center'>
                <h2 className='text-2xl font-bold  text-[#181B31]'>Overseas Pakistani Members</h2>
            </div>

            <div className="bg-[#F8F8F8] pt-3 px-4">
                <h2 className="text-2xl sm:text-3xl font-[700] w-full text-center">
                    Khaiyal Community News
                </h2>

                <div className="flex flex-wrap justify-center gap-6 mt-10">
                    {CardsItems.map((card) => (
                        <div
                            key={card.id}
                            className={`flex flex-col w-full sm:w-[80%] md:w-[45%] lg:w-[30%] rounded-md h-auto p-6 ${theme.overSeasCardBg}`}>
                            <img src={card.img} alt="" className="w-full h-auto" />
                            <span className={`text-[16px] font-[600] mt-3 ${theme.whiteText}`}>
                                {card.date}
                            </span>
                            <a className={`${theme.whiteText} hover:underline transition-all ease-in-out transform hover:decoration-[#FFC720] mt-2 text-justify text-lg sm:text-xl font-[700]`} href="">
                                {card.heading1}
                            </a>

                            <div className={`${theme.iconGrayColor} mt-4 text-start text-sm sm:text-base`}>
                                {card.discription}
                            </div>
                        </div>
                    ))}

                    <button className={`uppercase hover:underline px-7 py-2 ${theme.overSeasCardBg} text-white`} type="button">view all</button>
                </div>
            </div>

            <div>
                <div className='flex justify-between px-3'>
                    <div>
                        <h2 className='text-[#2D2D2D] font-[700] text-3xl'>Browse Top Cities</h2>
                        <div className='h-1 w-[50px] mt-3 bg-blue-950'></div>
                    </div>
                    <div className=' '>
                        <button className='border border-slate-400 p-1 rounded  capitalize'>view all cities <EastOutlinedIcon className='text-[#002456]' /> </button>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 justify-center my-10">
                    {TopCities.map((city, index) => (
                        <div key={index} className="w-full sm:w-1/2 md:w-[32%] capitalize relative overflow-hidden rounded shadow group">
                            {/* Image */}
                            <img src={city.img} alt={city.cityName} className="w-full h-auto transform transition-transform duration-500 group-hover:scale-110" />

                            {/* Overlay */}
                            <div className="absolute bottom-0 left-0 w-full h-[50%] group-hover:h-[80%] bg-gradient-to-t from-black via-black/60 to-transparent group-hover:from-blue-950/100 group-hover:via-blue-950/60 group-hover:to-transparent transition-all duration-500 ease-in-out pointer-events-none"></div>
                            {/* Text */}
                            <div className="absolute bottom-4 left-4 text-white z-10">
                                <span className="block font-semibold">{city.cityName}</span>
                                <span className="block">{city.PostedAdd}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
