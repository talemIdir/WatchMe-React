import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactPaginate from "react-paginate";

const Coming = () => {
  const [numberPages, setNumberPages] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    setLoading(true);

    // Getting Upcoming Movies Information
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_APIKey}&language=en-US&page=1&region=US`
      )
      .then((res) => {
        setData(res.data.results);
        setNumberPages(res.data.total_pages);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      source.cancel();
    };
  }, []);

  return (
    <Container>
      <PageTitle>Upcoming Movies</PageTitle>
      <Content>
        {data.map((movie) => {
          return (
            <Movie key={movie.id}>
              <MoviePoster>
                <Image
                  src={
                    "https://image.tmdb.org/t/p/original" + movie.poster_path
                  }
                  alt="background-image"
                />
              </MoviePoster>
              <MovieInformation>
                <MovieTitle>{movie.title}</MovieTitle>
                <MovieOverview>{movie.overview}</MovieOverview>
                <MovieDate>Release date: {movie.release_date}</MovieDate>
              </MovieInformation>
            </Movie>
          );
        })}
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={numberPages}
        />
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 40px 100px 0 100px;
  background-color: var(--main-bg-color);
  color: var(--main-light-color);
  font-weight: 500;
  overflow-y: auto;

  @media (max-width: 1100px) {
    padding: 40px 40px 0 40px;
  }
`;

const PageTitle = styled.div`
  color: var(--main-dark-color);
  font-size: 30px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 15px;
  grid-column-gap: 15px;
  padding: 20px 0px;
`;

const Movie = styled.div`
  display: flex;
  height: 200px;
  border: 1px solid var(--main-verylight-color);
  * {
    box-sizing: border-box;
  }

  &:hover {
    cursor: pointer;
    background-color: rgba(210, 47, 38, 0.05);
  }
`;

const MoviePoster = styled.div`
  min-width: 120px;
  margin: 5px;
  box-sizing: border-box;
  border-radius: 5px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

const MovieInformation = styled.div`
  display: flex;
  flex-direction: column;
`;

const MovieTitle = styled.div`
  max-lines: 1;
  text-overflow: ellipsis;
  color: var(--main-dark-color);
  padding: 5px;
`;
const MovieOverview = styled.div`
  flex: 1;
  overflow: hidden;
  padding: 5px;
`;
const MovieDate = styled.div`
  color: var(--main-dark-color);
  padding: 5px;
`;
export default Coming;
