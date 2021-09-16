import { useEffect, useState } from "react";
import axios from "axios";

const useHomeData = (type) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setData([]);
    setIsLoading(true);
    const source = axios.CancelToken.source();

    axios
      .get(
        `https://api.themoviedb.org/3/discover/${type}?api_key=${process.env.REACT_APP_APIKey}&language=en-US&sort_by=popularity.desc&include_adult=false`
      )
      .then((res) => {
        const operatedData = res.data.results.map((movie) => {
          if (typeof movie["title"] === "undefined")
            movie["title"] = movie["name"];
          if (movie["backdrop_path"] === null)
            movie["backdrop_path"] = movie["poster_path"];
          return movie;
        });
        setData(operatedData);
      })
      .catch((err) => {
        setError(err.response.data.status_message);
      })
      .finally(() => setIsLoading(false));

    return () => {
      source.cancel();
    };
  }, [type]);
  return { data, isLoading, error };
};

export default useHomeData;
