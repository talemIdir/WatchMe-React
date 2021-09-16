import React, { useState } from "react";
import styled from "styled-components";
import useHomeData from "../../Hooks/useHomeData";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import HomeCarousel from "./HomeCarousel";
import HomeComponents from "./HomeComponents";

const Home = () => {
  const [selected, setSelected] = useState("movie");

  const { data, isLoading } = useHomeData(selected);

  return (
    <Container>
      <Categories>
        <Category
          focused={selected === "movie" ? true : false}
          onClick={() => setSelected("movie")}
        >
          Movies
        </Category>
        <Category
          focused={selected === "tv" ? true : false}
          onClick={() => setSelected("tv")}
        >
          TV Series
        </Category>
      </Categories>
      <HomeCarousel
        data={data.slice(0, 5)}
        loading={isLoading}
        type={selected}
      />

      <HomeComponents
        type={selected}
        link={`https://api.themoviedb.org/3/trending/${selected}/day?api_key=${process.env.REACT_APP_APIKey}&language=en-US&sort_by=popularity.desc&include_adult=false`}
        title={"Trending"}
      />
      <HomeComponents
        type={selected}
        link={`
        https://api.themoviedb.org/3/${selected}/popular?api_key=${process.env.REACT_APP_APIKey}&language=en-US&page=1`}
        title={"Popular"}
      />
      <HomeComponents
        type={selected}
        link={
          selected === "movie"
            ? `
        https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_APIKey}&language=en-US&page=1`
            : `https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.REACT_APP_APIKey}&language=en-US&page=1`
        }
        title={"Latest"}
      />
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

const Categories = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-bottom: 1.5em;
`;

const Category = styled.div`
  margin: 0 0.5em;
  color: ${(props) => (props.focused ? "var(--main-dark-color)" : "")};
  &:hover {
    cursor: pointer;
    color: var(--main-dark-color);
  }
`;

export default Home;
