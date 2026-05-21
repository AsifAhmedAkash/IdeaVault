import BannerSliderComponent from '../components/BannerSliderComponent';
import NewsComponent from '../components/NewsComponent';
import TrendingIdeasSection from '../components/TrendingIdeasSection';
import OurMissionComponent from '../components/OurMissionComponent';
import TopInvestorSection from '../components/TopInvestorSection';

const HomePage = () => {
    return (
        <div className='bg-background'>
            <BannerSliderComponent></BannerSliderComponent>
            <TrendingIdeasSection></TrendingIdeasSection>
            <NewsComponent></NewsComponent>
            <OurMissionComponent></OurMissionComponent>
            <TopInvestorSection></TopInvestorSection>
        </div>
    );
};

export default HomePage;