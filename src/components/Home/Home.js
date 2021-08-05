import React, { useState } from "react";
import styled from "styled-components";
import useHomeData from "../../Hooks/useHomeData";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import HomeCarousel from "./HomeCarousel";

const Home = () => {
  const [selected, setSelected] = useState("movies");

  const { data, isLoading, error } = useHomeData();

  console.log(data);

  return (
    <Container>
      <Categories>
        <Category focused={selected === "movies" ? true : false}>
          Movies
        </Category>
        <Category focused={selected === "series" ? true : false}>
          TV Series
        </Category>
      </Categories>
      {!isLoading ? <HomeCarousel data={data.slice(0, 5)} /> : <div>Hey</div>}
    </Container>
  );
};

const Container = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
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
