import { useEffect, useState } from "react";
import axios from "axios";

const useHomeData = (type, link) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setData([]);
    setIsLoading(true);
    const source = axios.CancelToken.source();

    axios
      .get(link)
      .then((res) => {
        const operatedData = res.data.results.map((movie) => {
          if (typeof movie["title"] === "undefined")
            movie["title"] = movie["name"];
          if (movie["backdrop_path"] === null)
            movie["backdrop_path"] = movie["poster_path"];
          return movie;
        });
        setData(operatedData);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.status_message);
      });
    return () => {
      source.cancel();
    };
  }, [type, link]);
  return { data, isLoading, error };
};

export default useHomeData;
