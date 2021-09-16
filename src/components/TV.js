import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import UseAnimations from "react-useanimations";
import loadingIcon from "react-useanimations/lib/loading";

import Carousel from "./Carousel";
import Reviews from "./Reviews";

const TV = () => {
  let { id } = useParams();
  const [TV, setTV] = useState();
  const [similar, setSimilar] = useState();
  const [similarLoading, setSimilarLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState();

  useEffect(() => {
    const cat = [];
    const source = axios.CancelToken.source();
    setLoading(true);
    setSimilarLoading(true);
    // Getting TV Information
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_APIKey}&language=en-US`
      )
      .then((res) => {
        setTV(res.data);

        res.data.genres.map((genre) => {
          cat.push(genre.name);
          return null;
        });
        setGenres(cat);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));

    // Gettin Similar TVs
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${process.env.REACT_APP_APIKey}&language=en-US&page=1`
      )
      .then((res) => {
        setSimilar(res.data.results);
        setSimilarLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
    return () => {
      source.cancel();
    };
  }, [id]);

  return (
    <Container>
      {loading ? (
        <LoadingIconContainer
          animation={loadingIcon}
          size={70}
          speed={0.7}
          strokeColor={"var(--main-red-color)"}
        />
      ) : (
        <>
          <ImageContainer>
            <BackgroundImage
              src={"https://image.tmdb.org/t/p/original" + TV.poster_path}
              alt="background-image"
            />
          </ImageContainer>
          <Content>
            <TVInformation>
              <Genres>{genres.join(", ")}</Genres>
              <TVName>{TV.name}</TVName>
              <TVTagline>{TV.tagline}</TVTagline>
              <TVOverview>{TV.overview}</TVOverview>
              <TVRelease>
                First Air Date: {TV.first_air_date} | Vote average:{" "}
                {TV.vote_average}
              </TVRelease>
            </TVInformation>
            {!similarLoading ? (
              <Carousel data={similar} title={"Similar TV Series"} />
            ) : (
              <div>Hey there</div>
            )}
            <Reviews type="tv" id={id} />
          </Content>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  overflow: hidden;
  position: relative;
  padding: 40px;
  flex: 1;
  overflow-y: auto;
`;

const LoadingIconContainer = styled(UseAnimations)`
  height: 100% !important;
  margin: auto;
`;

const ImageContainer = styled.div`
  overflow: hidden;
`;

const BackgroundImage = styled.img`
  position: absolute;
  bottom: 20%;
  left: 15%;
  width: 100%;
  height: 100%;
  transform: scale(0.72);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 0;
  height: -webkit-fill-available;
  padding: 30px;
  color: var(--main-dark-color);
  background: radial-gradient(
    at 90% 10%,
    rgba(255, 255, 255, 0) 8%,
    rgba(252, 252, 253, 1) 40%
  );
`;

const TVInformation = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
`;

const Genres = styled.div`
  font-size: 1.2vw;
  font-weight: 300;

  @media (max-width: 1000px) {
    font-size: 1.4vw;
  }
  @media (max-width: 800px) {
    font-size: 2.2vw;
  }
  @media (max-width: 500px) {
    font-size: 3vw;
  }
`;

const TVName = styled.div`
  font-weight: 500;
  font-size: 3vw;

  @media (max-width: 1000px) {
    font-size: 3.5vw;
  }
  @media (max-width: 800px) {
    font-size: 4.5vw;
  }

  @media (max-width: 500px) {
    font-size: 6vw;
  }
`;

const TVTagline = styled.div`
  color: var(--main-verylight-color);
  font-size: 1.1vw;

  @media (max-width: 1000px) {
    font-size: 1.4vw;
  }
  @media (max-width: 800px) {
    font-size: 2.2vw;
  }
  @media (max-width: 500px) {
    font-size: 3vw;
  }
`;

const TVOverview = styled.div`
  padding: 20px 40% 20px 0px;
  font-weight: 300;
  font-size: 1.3vw;

  @media (max-width: 1000px) {
    font-size: 1.8vw;
  }
  @media (max-width: 800px) {
    font-size: 2.8vw;
  }
  @media (max-width: 500px) {
    font-size: 4vw;
  }
`;

const TVRelease = styled(Genres)`
  font-weight: 400;
  margin-bottom: 10px;
`;

export default TV;
