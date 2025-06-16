import { Swiper, SwiperSlide } from 'swiper/react';
import khayal from '../../../assets/images/khayal.jpeg';
import group from '../../../assets/images/group.jpeg';
import family from '../../../assets/images/faimily.jpeg';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper/modules';
import { TypeAnimation } from 'react-type-animation';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FormatTextdirectionRToLIcon from '@mui/icons-material/FormatTextdirectionRToL';
import { useContext } from 'react';
import { Context } from '../../../Context/ContextProvider';
import SearchFilter from '../Models/SearchFilter';

export default function HomeSwiper() {
  const { theme } = useContext(Context);
  // const theme = theme
  console.log("first", theme.iconGrayColor)

  const products = [
    { id: 0, img: khayal },
    { id: 1, img: group },
    { id: 2, img: family }
  ];

  return (
    <>
      <Swiper
        navigation={false}
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        className="mySwiper h-[100vh] w-full"
      >
        {products.map((product) => (
          <SwiperSlide
            key={product.id}
            className="h-[100vh] w-full"
            style={{
              background: `url(${product.img}) no-repeat center center`,
              backgroundSize: 'cover'
            }}
          />
        ))}
      </Swiper>

      {/* Typing Animation - Made responsive */}
      <div className={`text-center text-[#d29c2f]  md:text-4xl h-[50px] font-extrabold mt-[-330px] mb-[20px] z-90 relative px-4 `}>
        <TypeAnimation className='text-5xl ' sequence={['Find Your Next Destination', 2000, '', 1000,]}
          wrapper="h1"
          speed={50}
          repeat={Infinity}
          cursor={false}
        />
      </div>

      <div className={`h-auto py-4 md:py-0 md:h-28 absolute flex justify-center items-center z-90 w-full`}>
        {/* <div className={`w-[97%] md:w-[95%] flex bg-white/10 backdrop-blur-x justify-center items-center rounded h-auto md:h-[110px] ${theme.iconGrayColor}`}>
          <form action="" method="get" className={`h-full md:h-[50%] flex justify-between md:flex-row items-center ${theme.formBg} rounded w-full md:w-[95%] overflow-hidden`}>

            <div className='flex w-[100%] justify-between px-1'>
              <div className={`w-[25%] flex items-center  border-b md:border-b-0 md:border-r ${theme.formBorder} px-3 h-12 md:h-[100%]`}>
                <LocationOnIcon
                  fontSize="16px"
                  className={`mr-2`} />
                <h3 className='w-full outline-none bg-transparent text-sm'> Select Location</h3>
               
              </div>

              <div className={`w-[25%] flex items-center gap-2 border-b md:border-b-0 md:border-r ${theme.formBorder} px-3 h-12 md:h-[100%]`}>
                <LocalOfferIcon
                  fontSize="16px" />
                <h3 className='w-full outline-none bg-transparent text-sm'> Select Category</h3>
              </div>

              <div className={`w-[25%] flex items-center gap-2 border-b md:border-b-0 md:border-r ${theme.formBorder} px-3 h-12 md:h-[100%]`}>
                <ListOutlinedIcon
                  fontSize="small"
                />
                <h3 className='w-full outline-none bg-transparent text-sm'> Select Type</h3>
              </div>
              <div className={`w-[25%] flex items-center gap-2 border-b md:border-b-0  ${theme.formBorder} px-3 h-12 md:h-[100%]`}>
                <FormatTextdirectionRToLIcon
                  fontSize="16px" />
                <input
                  type="text"
                  placeholder="Enter Keyword here ..."
                  className='w-full outline-none bg-transparent text-sm'
                />
              </div>
            </div>

            <div className={` ${theme.btnBg} ${theme.whiteText}`}>
              <div className=' flex justify-center h-12 md:h-[100%] font-semibold'>
                <button
                  type="submit"
                  className={` md:w-auto px-2 md:px-10 py-2 md:py-5 flex items-center justify-center gap-2 text-lg lg:text-2xl h-full text-sm `}>
                  <span className='text-[17px]'><SearchOutlinedIcon /></span>
                  <span className='text-[17px]'>Search</span>
                </button>
              </div>
            </div>

          </form>
        </div> */}

        <SearchFilter/>
      </div>
      <div className={`absolute ${theme.overlayBg} z-50 h-[100vh] w-full top-0 opacity-60`}></div>
    </>
  );
}