import Navbar from '../../component/global/Navbar'
import HomeSwiper from './Component/HomeSwiper'
import BuySellNav from './Component/BuySellNav'
import RecentAdds from './Component/RecentAdds'
import Overseas from './Component/Overseas'
import Advertise from './Component/Advertise'
import Premium from './Component/Premium'
import Testimonial from './Component/Testimonial'
import MembershipCard from './Component/MembershipCard'
import ComingSoon from './Component/ComingSoon'
export default function () {
    return (
        <>
            <HomeSwiper />
            <BuySellNav />
            <RecentAdds />
            <Overseas />
            <Advertise />
            <Premium />
            <Testimonial/>
            <MembershipCard/>
            <ComingSoon/>
        </>
    )
}