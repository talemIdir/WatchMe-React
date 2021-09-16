import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

const Reviews = ({ type, id }) => {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const source = axios.CancelToken.source();
    setLoading(true);

    // Getting Movie Reviews
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_APIKey}&language=en-US&page=1`
      )
      .then((res) => {
        setReviews(res.data.results);
        setLoading(false);
      });

    return () => {
      source.cancel();
    };
  }, []);

  return (
    <Container>
      <Title>Reviews</Title>
      {reviews.length > 0
        ? reviews.map((review) => {
            return (
              <Review key={review.id}>
                <ReviewAuthor>{review.author}</ReviewAuthor>
                <ReviewContent>{review.content}</ReviewContent>
              </Review>
            );
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

const Review = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: var(--main-verylight-color) 1px solid;
`;

const ReviewAuthor = styled.div`
  padding: 10px;
  flex: 3;
  font-weight: 500;
  text-align: center;
`;

const ReviewDate = styled.div``;

const ReviewContent = styled.div`
  padding: 10px;
  flex: 10;
  border-left: var(--main-verylight-color) 1px solid;
`;

export default Reviews;
