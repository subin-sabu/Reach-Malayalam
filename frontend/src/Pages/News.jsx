import React, { useEffect } from 'react';
import NewsElaborate from '../Components/NewsElaborate/NewsElaborate';
import NewsAd1 from '../Advertisements/NewsAd1';
import { Grid, Box, Container, Typography, Button } from '@mui/material';
import NewsCardVertical from '../Components/NewsCard/NewsCardVertical';
import { useParams, useNavigate } from 'react-router-dom';
import BasicBreadcrumbs from '../Components/Breadcrumbs/Breadcrumbs';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import styles from './News.module.css';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import HomeAd16x9 from '../Advertisements/NewsAd16x9';
import NewsCardShare from '../Components/NewsCard/NewsCardShare';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function News() {
  // extract id and category from url
  const { category, id } = useParams();
  const capitalizedCategory = capitalizeFirstLetter(category);
  const navigate = useNavigate();

  // scrolls to top of News Page when id changes
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  //navigation for load more button
  function handleButtonClick(category) {
    // Navigate to the category page
    navigate(`/${category}`);

    // Jump to the top of the landing page without smooth scrolling
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  return (
    <div>
      <Container>
        <NewsAd1 />
        <BasicBreadcrumbs category={category} id={id} />

        <div className={styles['page-2']}>

          <NewsElaborate category={category} id={id}  className={styles.headingKL} /> {/* pass id to NE */}
          <Button
            variant="contained"
            fullWidth='true'
            endIcon={<OpenInNewIcon />}
            sx={{ marginTop: '1rem' }}
            onClick={() => handleButtonClick(category)}
            className={styles.btn}
          >
            view more in {`${capitalizedCategory}`}
          </Button>

          <HomeAd16x9 className={styles.NewsAd1} />

          <NewsCardVertical
            startIndex={7}
            endIndex={13}
            heading="Must Read"
            className={styles.p2kl}
          />

          <NewsCardShare  startIndex={7} cardLimit={6} heading={`Must Read`} className={styles.p2cardklsmall}/>

        </div>
      </Container>
    </div>
  );
}

export default News;
