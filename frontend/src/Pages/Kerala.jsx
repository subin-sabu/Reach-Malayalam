import React ,{useEffect} from 'react'
import NewsCardShare from '../Components/NewsCard/NewsCardShare'
import { Container , Typography} from '@mui/material'
import styles from './Kerala.module.css'
import PageAd1 from '../Advertisements/PageAd1'
import MainNews from '../Components/MainNews/MainNews'
import { useParams } from 'react-router-dom'
import BasicBreadcrumbs from '../Components/Breadcrumbs/PageBreadcrumbs'
import NewsCardScroll from '../Components/NewsCard/NewsCardScroll'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import NewsCard from '../Components/NewsCard/NewsCard'
import NewsCardEdit from '../Components/NewsCard/NewsCardEdit'
import NewsCardVertical from '../Components/NewsCard/NewsCardVertical'
import NewsAd1 from '../Advertisements/NewsAd1'


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Kerala() {
  // extract category from url
  const { category } = useParams();
  const capitalizedCategory = capitalizeFirstLetter(category);

  // scrolls to top of News Page when category changes
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [category]);

  return (
    <div>
      <Container >
        <PageAd1 />
        <BasicBreadcrumbs category={category} />
        <div className={styles[`page-2`]}>
          
          <MainNews category={category} cardLimit={1} className={styles.main} />
          <NewsCard category={category} cardLimit={1} className={styles.newsCard} />

          <NewsCardVertical category={category} heading={`Recent in ${capitalizedCategory}`} cardLimit={4} startIndex={1} className={styles.share}/>

          <NewsAd1 className={styles.newsAd1}/>

          <NewsCardShare category={category} heading={`More in ${capitalizedCategory}`} cardLimit={16} startIndex={5} className={styles.more}/>

          <Typography className={styles.h1scroll} fontSize={20} fontWeight={600} color='primary.sub' sx={{ display: 'flex', justifyContent: 'flex-start', gap: '.7rem', alignSelf: 'flex-start', marginTop: '1.5rem' }}><ArrowCircleRightIcon />{`Latest from all categories`}
          </Typography>
          <NewsCardScroll startIndex={1} endIndex={30}  className={styles.newsScroll}/>
        </div>

      </Container>
    </div>
  )
}

export default Kerala