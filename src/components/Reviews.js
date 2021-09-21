import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import Review from "./Review";

const Reviews = ({ type, id }) => {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const source = axios.CancelToken.source();
    setLoading(true);

    // Getting Reviews
    axios
      .get(
        `https://api.themoviedb.org/3/${type}/${id}/reviews?api_key=${process.env.REACT_APP_APIKey}&language=en-US&page=1`
      )
      .then((res) => {
        setReviews(res.data.results);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      source.cancel();
    };
  }, [id, type]);

  return (
    <Container>
      <Title>Reviews</Title>
      {!loading && reviews.length > 0
        ? reviews.map((review) => {
            return <Review key={review.id} review={review} />;
          })
        : "No reviews at the moment."}
    </Container>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  padding: 20px 0px;
`;

const Title = styled.div`
  font-weight: 500;
`;

export default Reviews;
