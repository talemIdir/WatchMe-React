import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import UseAnimations from "react-useanimations";
import loadingIcon from "react-useanimations/lib/loading";
import axios from "axios";
import ReactPaginate from "react-paginate";

const Discover = () => {
  const [keywordInput, setKeywordInput] = useState("");
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("movie");
  const [numberPages, setNumberPages] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const [error, setError] = useState("");

  const params = new URLSearchParams(useLocation().search);
  let history = useHistory();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const keyword = params.get("keyword");
    setKeywordInput(keyword);
    const page = params.get("page") ? params.get("page") : 1;
    setSelectedPage(page);

    if (keyword && keyword !== "") {
      setLoading(true);

      // Search for movies by keywords
      axios
        .get(
          `https://api.themoviedb.org/3/search/${type}?api_key=${process.env.REACT_APP_APIKey}&query=${keyword}&page=${page}`
        )
        .then((res) => {
          setData(
            res.data.results.sort((a, b) =>
              a.vote_average > b.vote_average
                ? -1
                : a.vote_average < b.vote_average
                ? 1
                : 0
            )
          );

          if (data.length === 0) setError("Not found");

          setNumberPages(res.data.total_pages);
          setSelectedPage(page - 1);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err.response.data);
        });
    }

    return () => {
      source.cancel();
    };
  }, [type]);

  function handleSearchByKeyword(e) {
    e.preventDefault();
    history.push("/discover?keyword=" + keywordInput + "&page=1");
  }

  function handlePageChange(selected) {
    history.push(
      "/discover?keyword=" + keywordInput + "&page=" + (selected + 1)
    );
  }

  return (
    <Container>
      <Categories>
        <Category
          focused={type === "movie" ? true : false}
          onClick={() => setType("movie")}
        >
          Movies
        </Category>
        <Category
          focused={type === "tv" ? true : false}
          onClick={() => setType("tv")}
        >
          TV Series
        </Category>
      </Categories>
      <SearchByKeyWord>
        <Title>Search by keyword</Title>
        <KeywordForm>
          <Input
            type="text"
            name="name"
            onChange={(e) => setKeywordInput(e.target.value)}
          />
          <Button type="submit" value="Submit" onClick={handleSearchByKeyword}>
            Search
          </Button>
        </KeywordForm>
      </SearchByKeyWord>
      {loading ? (
        <LoadingIconContainer
          animation={loadingIcon}
          size={70}
          speed={0.7}
          strokeColor={"var(--main-red-color)"}
        />
      ) : data && data.length > 0 ? (
        <>
          <StyledPaginateContainer>
            <Pagination
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              pageCount={numberPages}
              forcePage={selectedPage}
              onPageChange={(selected) => handlePageChange(selected.selected)}
              containerClassName={"pagination"}
              previousLinkClassName={"pagination__link"}
              nextLinkClassName={"pagination__link"}
              disabledClassName={"pagination__link--disabled"}
              activeClassName={"pagination__link--active"}
            />
          </StyledPaginateContainer>
          <Results>
            {data.map((movie) => {
              return (
                <Movie key={movie.id} to={"/" + type + "/" + movie.id}>
                  <MoviePoster>
                    <Image
                      src={
                        movie.poster_path
                          ? "https://image.tmdb.org/t/p/original" +
                            movie.poster_path
                          : ""
                      }
                      alt="background-image"
                    />
                  </MoviePoster>
                  <MovieInformation>
                    <MovieTitle>
                      {movie.title ? movie.title : movie.name}
                    </MovieTitle>
                    <MovieOverview>{movie.overview}</MovieOverview>
                    <MovieDate>
                      Release date:{" "}
                      {movie.release_date
                        ? movie.release_date
                        : movie.first_air_date}
                    </MovieDate>
                  </MovieInformation>
                </Movie>
              );
            })}
          </Results>
          <StyledPaginateContainer>
            <Pagination
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              pageCount={numberPages}
              forcePage={selectedPage}
              onPageChange={(selected) => handlePageChange(selected.selected)}
              containerClassName={"pagination"}
              previousLinkClassName={"pagination__link"}
              nextLinkClassName={"pagination__link"}
              disabledClassName={"pagination__link--disabled"}
              activeClassName={"pagination__link--active"}
            />
          </StyledPaginateContainer>
        </>
      ) : (
        <div>{error}</div>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
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
  margin: 0 0.5em 0 0;
  color: ${(props) => (props.focused ? "var(--main-dark-color)" : "")};
  &:hover {
    cursor: pointer;
    color: var(--main-dark-color);
  }
`;

const SearchByKeyWord = styled.form``;

const Title = styled.div`
  display: block;
`;

const KeywordForm = styled.div`
  display: flex;
`;

const Input = styled.input`
  flex: 10;
  padding: 5px;
  margin: 5px 5px 5px 1px;
`;

const Button = styled.button`
  flex: 2;
  margin: 5px;
`;

const LoadingIconContainer = styled(UseAnimations)`
  height: 100% !important;
  margin: auto;
`;

const StyledPaginateContainer = styled.div`
  .pagination {
    display: flex;
    flex-direction: row;
    justify-content: center;
    list-style: none;
    user-select: none;
  }
  li {
    padding: 10px;
  }
  li:hover {
    cursor: pointer;
    text-decoration: underline;
    color: var(--main-red-color);
  }
  .pagination__link--active {
    color: var(--main-red-color);
    text-decoration: underline;
  }

  .pagination__link--disabled:hover {
    text-decoration: none;
    color: var(--main-verylight-color);
  }
`;

const Pagination = styled(ReactPaginate)``;

const Results = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 15px;
  grid-column-gap: 15px;
  padding: 20px 0px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const Movie = styled(Link)`
  display: flex;
  height: 200px;
  border: 1px solid var(--main-verylight-color);
  color: var(--main-light-color);
  text-decoration: none;

  * {
    box-sizing: border-box;
  }

  &:hover {
    cursor: pointer;
    background-color: rgba(210, 47, 38, 0.05);
  }
`;

const MoviePoster = styled.div`
  min-width: 120px;
  margin: 5px;
  box-sizing: border-box;
  border-radius: 5px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

const MovieInformation = styled.div`
  display: flex;
  flex-direction: column;
`;

const MovieTitle = styled.div`
  max-lines: 1;
  text-overflow: ellipsis;
  color: var(--main-dark-color);
  padding: 5px;
`;

const MovieOverview = styled.div`
  flex: 1;
  overflow: hidden;
  padding: 5px;
`;

const MovieDate = styled.div`
  color: var(--main-dark-color);
  padding: 5px;
`;

export default Discover;
