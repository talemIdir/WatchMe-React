import React, { useState } from "react";
import styled from "styled-components";
import useHomeData from "../../Hooks/useHomeData";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

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
      {!isLoading ? (
        <HomeCarousel>
          <Carousel>
            <div>
              <img
                alt="s"
                src={
                  "https://image.tmdb.org/t/p/original" + data[0].backdrop_path
                }
              />
              <p className="legend">Legend 1</p>
            </div>
            <div>
              <img
                alt="s"
                src={
                  "https://image.tmdb.org/t/p/original" + data[1].backdrop_path
                }
              />
              <p className="legend">Legend 2</p>
            </div>
          </Carousel>
        </HomeCarousel>
      ) : (
        <div>Hey</div>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 3.5em;
  color: var(--main-light-color);
  font-weight: 500;
`;

const Categories = styled.div`
  display: flex;
  flex-direction: row;
`;

const Category = styled.div`
  margin: 0 0.5em;
  color: ${(props) => (props.focused ? "var(--main-dark-color)" : "")};
  &:hover {
    cursor: pointer;
    color: var(--main-dark-color);
  }
`;

const HomeCarousel = styled.div`
  height: 200px;
`;

export default Home;
