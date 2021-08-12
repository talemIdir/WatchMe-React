import { useEffect, useState } from "react";
import axios from "axios";

const useHomeData = (type, link) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  console.log(link);
  useEffect(() => {
    setData([]);
    setIsLoading(true);

    axios
      .get(link)
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
