import { useEffect, useState } from "react";
import axios from "axios";

const useHomeData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_APIKey}&language=en-US&sort_by=popularity.desc&include_adult=false`
      )
      .then((res) => {
        setData(res.data.results);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);
  return { data, isLoading, error };
};

export default useHomeData;
