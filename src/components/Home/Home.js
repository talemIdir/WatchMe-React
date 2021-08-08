import React, { useState } from "react";
import styled from "styled-components";
import useHomeData from "../../Hooks/useHomeData";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import HomeCarousel from "./HomeCarousel";
import HomeTrending from "./HomeTrending";

const Home = () => {
  const [selected, setSelected] = useState("movie");

  const { data, isLoading, error } = useHomeData(selected);

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
      {!isLoading ? <HomeCarousel data={data.slice(0, 5)} /> : <div>Hey</div>}
      <HomeTrending type={selected} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 40px 40px 0 40px;
  background-color: var(--main-bg-color);
  color: var(--main-light-color);
  font-weight: 500;
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
