import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Movie = () => {
  let { id } = useParams();
  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState();

  useEffect(() => {
    const cat = [];
    const axiosFetch = axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_APIKey}&language=en-US`
      )
      .then((res) => {
        setMovie(res.data);

        res.data.genres.map((genre) => {
          cat.push(genre.name);
        });
        setGenres(cat);

        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
      });
    return axiosFetch;
  }, []);

  return (
    <Container>
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <BackgroundImage
            src={"https://image.tmdb.org/t/p/original" + movie.backdrop_path}
            alt="background-image"
          />
          <Content>
            <Genres>{genres.join(", ")}</Genres>
            <MovieName>{movie.title}</MovieName>
            <MovieTagline>{movie.tagline}</MovieTagline>
            <MovieOverview>{movie.overview}</MovieOverview>
            <MovieRelease>
              Release date: {movie.release_date} | Vote average:{" "}
              {movie.vote_average}
            </MovieRelease>
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
`;

const BackgroundImage = styled.img`
  position: absolute;
  bottom: 10%;
  left: 15%;
  width: 100%;
  height: 100%;
  transform: scale(0.9);
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
  background: rgb(255, 255, 255);
  background: radial-gradient(
    at 100% 0%,
    rgba(255, 255, 255, 0) 8%,
    rgba(252, 252, 253, 1) 40%
  );
`;

const Genres = styled.div`
  font-size: 1.4vw;
  font-weight: 300;

  @media (max-width: 800px) {
    font-size: 2.5vw;
  }
  @media (max-width: 500px) {
    font-size: 3vw;
  }
`;

const MovieName = styled.div`
  font-weight: 500;
  font-size: 3.2vw;

  @media (max-width: 800px) {
    font-size: 5vw;
  }

  @media (max-width: 500px) {
    font-size: 6vw;
  }
`;

const MovieTagline = styled.div`
  color: var(--main-verylight-color);
  font-size: 1.4vw;

  @media (max-width: 800px) {
    font-size: 2.5vw;
  }
  @media (max-width: 500px) {
    font-size: 3vw;
  }
`;

const MovieOverview = styled.div`
  padding: 20px 40% 20px 0px;
  font-weight: 300;
  font-size: 1.5vw;

  @media (max-width: 800px) {
    font-size: 3vw;
  }
  @media (max-width: 500px) {
    font-size: 4vw;
  }
`;

const MovieRelease = styled(Genres)`
  font-weight: 500;
`;

export default Movie;
