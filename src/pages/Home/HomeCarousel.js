import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";
import UseAnimations from "react-useanimations";
import loadingIcon from "react-useanimations/lib/loading";
import { Link } from "react-router-dom";

const HomeCarousel = ({ data, loading, type }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Content>
      {loading ? (
        <LoadingIconContainer
          animation={loadingIcon}
          size={70}
          speed={0.7}
          strokeColor={"var(--main-red-color)"}
        />
      ) : (
        <Carousel {...settings}>
          {data.map((movie) => {
            return (
              <CarouselContent key={movie.id}>
                <CarouselImage
                  alt="s"
                  src={
                    "https://image.tmdb.org/t/p/original" + movie.backdrop_path
                  }
                />
                <CarouselInfo>
                  <CarouselName>{movie.title}</CarouselName>
                  <CarouselOverview>{movie.overview}</CarouselOverview>
                  <CarouselSeeMore
                    to={
                      type === "movie"
                        ? "/movie/" + movie.id
                        : "/tv/" + movie.id
                    }
                  >
                    See more
                  </CarouselSeeMore>
                </CarouselInfo>
              </CarouselContent>
            );
          })}
        </Carousel>
      )}
    </Content>
  );
};

const Content = styled.div`
  display: grid;
`;

const LoadingIconContainer = styled(UseAnimations)`
  height: 100% !important;
  margin: auto;
`;

const Carousel = styled(Slider)`
  width: 100%;
  height: 350px;
  border-radius: 20px;
  overflow: hidden;

  @media (max-width: 800px) {
    width: 100%;
  }

  .slick-prev {
    left: 10px;
    z-index: 1;
  }

  .slick-next {
    right: 10px;
  }

  & img {
    width: 100%;
    height: inherit;
  }

  & .carousel {
    border-radius: 20px;
  }

  & .slider-wrapper {
    border-radius: 20px;
  }
`;

const CarouselContent = styled.div`
  position: relative;
  height: 350px;
`;

const CarouselImage = styled.img`
  height: 350px;
`;

const CarouselInfo = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-end;
  padding: 40px;
  background: linear-gradient(
    180deg,
    rgba(228, 228, 228, 0) 0%,
    rgba(0, 0, 0, 0.46852244315695024) 100%
  );
`;

const CarouselName = styled.div`
  color: white;
  font-size: 45px;
  font-weight: 500;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 10px;
`;

const CarouselOverview = styled.div`
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: rgba(255, 255, 255, 85%);
  margin-bottom: 10px;
`;

const CarouselSeeMore = styled(Link)`
  cursor: pointer;
  text-align: right;
  color: var(--main-light-color);
  text-decoration: none;
`;

export default HomeCarousel;
