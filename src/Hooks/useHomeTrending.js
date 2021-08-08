import { useEffect, useState } from "react";
import axios from "axios";

const useHomeData = (type) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setData([]);
    setIsLoading(true);

    axios
      .get(
        `
        https://api.themoviedb.org/3/trending/${type}/day?api_key=${process.env.REACT_APP_APIKey}&language=en-US&sort_by=popularity.desc&include_adult=false`
      )
      .then((res) => {
        setData(res.data.results);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, [type]);
  return { data, isLoading, error };
};

export default useHomeData;
