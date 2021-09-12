import React, { useRef } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { ImCircleRight, ImCircleLeft } from "react-icons/im";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Carousel = ({ data, title, type }) => {
  const trendingCarousel = useRef();
  const settings = {
    className: "slider variable-width",
    infinite: true,
    swipeToSlide: true,
    variableWidth: true,
  };
  return (
    <CarouselWrapper>
      <Header>
        <Title>{title}</Title>
        <HeaderIcons>
          <Icon onClick={() => trendingCarousel.current.slickPrev()}>
            <ImCircleLeft />
          </Icon>
          <Icon onClick={() => trendingCarousel.current.slickNext()}>
            <ImCircleRight />
          </Icon>
        </HeaderIcons>
      </Header>
      <CarouselComponent {...settings} ref={trendingCarousel}>
        {data.map((movie) => {
          return (
            <CarouselContent key={movie.id} to={"" + movie.id} replace>
              {movie.poster_path ? (
                <CarouselImage
                  alt="s"
                  src={
                    "https://image.tmdb.org/t/p/original" + movie.poster_path
                  }
                />
              ) : (
                <CarouselNoImage>
                  <BiErrorCircle />
                </CarouselNoImage>
              )}
              <CarouselInfo>
                <CarouselName>{movie.title}</CarouselName>
              </CarouselInfo>
            </CarouselContent>
          );
        })}
      </CarouselComponent>
    </CarouselWrapper>
  );
};

const CarouselWrapper = styled.div`
  display: grid;
  height: 240px;
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

const CarouselComponent = styled(Slider)`
  width: 100%;
  height: 200px;
  overflow: hidden;

  .slick-slide {
    margin: 0 5px;
    overflow: hidden;
    height: 190px;
    width: 130px;
    border-radius: 5px;
  }

  .slick-prev {
    display: none;
  }

  .slick-next {
    display: none;
  }
`;

const CarouselContent = styled(Link)`
  position: relative;
  width: 130px;
  height: 190px;
  transition: transform 250ms;

  &:hover {
    border: solid 2px var(--main-light-color);
    transform: scale(1.15);
    cursor: pointer;

    & div {
      display: flex;
    }
  }
`;

const CarouselImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const CarouselNoImage = styled.div`
  display: flex;
  height: 100%;
  color: red;
  font-size: 30px;
  justify-content: center;
  align-items: center;
`;

const CarouselInfo = styled.div`
  display: none;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  background: rgb(250, 250, 250);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.46852244315695024) 100%
  );
`;

const CarouselName = styled.div`
  color: white;
  font-size: 15px;
  font-weight: 500;
  text-align: center;
  overflow: hidden;
  margin-bottom: 10px;
`;

export default Carousel;
