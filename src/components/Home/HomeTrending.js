import React, { useRef } from "react";
import styled from "styled-components";
import { ImCircleRight, ImCircleLeft } from "react-icons/im";

import useHomeTrending from "../../Hooks/useHomeTrending";
import Slider from "react-slick";
const HomeTrending = ({ type }) => {
  const { data, isLoading, error } = useHomeTrending(type);
  const trendingCarousel = useRef();

  const settings = {
    className: "slider variable-width",
    infinite: false,
    swipeToSlide: true,
    variableWidth: true,
  };

  return (
    <Container>
      <Header>
        <Title>Trending</Title>
        <HeaderIcons>
          <Icon onClick={() => trendingCarousel.current.slickPrev()}>
            <ImCircleLeft />
          </Icon>
          <Icon onClick={() => trendingCarousel.current.slickNext()}>
            <ImCircleRight />
          </Icon>
        </HeaderIcons>
      </Header>

      <Content>
        <Carousel {...settings} ref={trendingCarousel}>
          {data.map((movie) => {
            return (
              <CarouselContent key={movie.id}>
                <CarouselImage
                  alt="s"
                  src={
                    "https://image.tmdb.org/t/p/original" + movie.poster_path
                  }
                />
              </CarouselContent>
            );
          })}
        </Carousel>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.5em;
`;

const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 24px;
`;

const Icon = styled.div`
  display: flex;
  margin: 0px 4px;

  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.div`
  font-weight: 500;
`;

const Content = styled.div`
  display: grid;
  height: 200px;
`;

const Carousel = styled(Slider)`
  width: 100%;
  height: 200px;
  overflow: hidden;

  .slick-slide {
    margin: 0 5px;
  }

  .slick-prev {
    display: none;
  }

  .slick-next {
    display: none;
  }
`;

const CarouselContent = styled.div`
  height: 190px;
  width: 130px;
`;

const CarouselImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 5px;
`;

export default HomeTrending;
