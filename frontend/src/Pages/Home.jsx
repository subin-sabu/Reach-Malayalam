import React ,{useEffect} from 'react';
import styles from "./Home.module.css"; // Import as a module
import HomeAd1 from '../Advertisements/HomeAd1';
import { Container, Box, Typography, } from '@mui/material';
import MainNews from '../Components/MainNews/MainNews';
import NewsCardVertical from '../Components/NewsCard/NewsCardVertical';
import HomeAd16x9 from '../Advertisements/HomeAd16x9';
import NewsCard from '../Components/NewsCard/NewsCard';
import HomeBreadcrumbs from '../Components/Breadcrumbs/HomeBreadcrumb';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import NewsCardScroll from '../Components/NewsCard/NewsCardScroll';
import NewsCardEdit from '../Components/NewsCard/NewsCardEdit'
import NewsCardShare from '../Components/NewsCard/NewsCardShare'
import SamsungAd from '../Advertisements/SamsungAd'
import NewsCardSmall from '../Components/NewsCard/NewsCardSmall';
import NewsBullets from '../Components/NewsBullets/NewsBullets';



function Home() {

  // Scrolls to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Container>
        <HomeAd1 />
        <HomeBreadcrumbs />
        <div className={styles['grid-container']}>

          <NewsCardVertical cardLimit={6} heading='Latest News' className={styles.snippet1}  negativeTags={['main']} omitLimit={1}  />
          <NewsCardSmall startIndex={0} endIndex={6} heading='Latest News' className={styles.snippet1small} negativeTags={['main']} omitLimit={1}/>

          <MainNews className={styles.main} cardLimit={1} tags={['main']} />
          <NewsCard className={styles.newsCard} cardLimit={1} imageType="image" tags={['main']}/>

          <NewsCardVertical startIndex={7} endIndex={13} heading='Must Read' className={styles.snippet2} />

          <NewsCardShare className={styles.newsCardTab} startIndex={7} endIndex={13} heading={`Must Read`} />

          <NewsBullets className={styles.newsBullets} heading="News Bullets" cardLimit={10}/>


          <HomeAd16x9 className={styles.ad2} />

          {/* heading of NewsCardScroll */}
          <Typography className={styles.heading} fontSize={20} fontWeight={600} color='primary.sub' sx={{ display: 'flex', justifyContent: 'flex-start', gap: '.7rem', alignSelf: 'flex-start', marginTop: '1.5rem' }}><ArrowCircleRightIcon />{`Never miss an update`}
          </Typography>
          <NewsCardScroll className={styles.scrollCard} startIndex={13} endIndex={23} />


        </div>

        {/* page 2 starts here*/}
        <div className={styles['page-2']}>
          <SamsungAd className={styles.NewsAd1} />
          <NewsBullets className={styles.newsBulletsP2} heading="News Bullets" cardLimit={10}/>
          <NewsCardEdit className={styles.newsCardTabp2} startIndex={7} endIndex={15} heading={`In news for a while now`} />

          <Typography className={styles.headingKL} fontSize={20} fontWeight={600} color='primary.sub' sx={{ display: 'flex', justifyContent: 'flex-start', gap: '.7rem', alignSelf: 'flex-start', marginTop: '1.5rem' }}><ArrowCircleRightIcon />{`Kerala`}
          </Typography>
          <MainNews className={styles.p2kl} category={`kerala`} cardLimit={1} />
          <NewsCardEdit className={styles.p2cardkl} category={`kerala`} startIndex={1} cardLimit={4} />
          <NewsCardShare className={styles.p2cardklsmall} category={`kerala`} startIndex={1} cardLimit={6} />
        </div>
      </Container>
    </div>
  );
}

export default Home;
