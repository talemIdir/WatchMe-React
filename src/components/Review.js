import React, { useState } from "react";
import styled from "styled-components";

const Review = ({ review }) => {
  const [readAll, setReadAll] = useState(false);

  return (
    <ReviewContainer>
      <ReviewAuthor>{review.author}</ReviewAuthor>
      <ReviewContent>
        <div style={{ height: readAll ? "auto" : "90px", overflow: "hidden" }}>
          {review.content}
        </div>
        <Expand onClick={() => setReadAll(!readAll)} readAll={readAll}>
          {readAll ? "Read Less" : "Read More"}
        </Expand>
      </ReviewContent>
    </ReviewContainer>
  );
};

const ReviewContainer = styled.div`
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

const ReviewContent = styled.div`
  padding: 10px;
  flex: 10;
  border-left: var(--main-verylight-color) 1px solid;
`;

const Expand = styled.div`
  text-align: right;
  font-weight: 500;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export default Review;
