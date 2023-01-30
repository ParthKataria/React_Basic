import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import ErrorPage from "./ErrorPage";
const AllItems = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(null);
  const observer = useRef();
  const lastElement = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setCurrentPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );
  const getItems = async (page) => {
    setError(null);
    setisLoading(true);
    try {
      const response = await axios.get(
        `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list`,
        {
          params: {
            country: "us",
            lang: "en",
            currentpage: page,
            pagesize: "10",
          },
          headers: {
            "X-RapidAPI-Key":
              "864dac725amshac87f811e37cacdp1def16jsn271d0e0550d4",
            "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
          },
        }
      );
      //   console.log(response);
      setItems([...items, ...response.data.results]);
      setisLoading(false);
    } catch (err) {
      console.log(err);
      setisLoading(false);
      setError(err);
    }
  };
  useEffect(() => {
    getItems(currentPage);
  }, [currentPage]);
  //   console.log(items);
  if (error) return <ErrorPage />;
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5">
        {items.map((product, id) => {
          if (items.length === id + 1)
            return (
              <div key={id} className="mx-2 my-5 bg-white shadow p-2">
                <img
                  className="block w-full"
                  ref={lastElement}
                  src={product.images[0].url}
                />
              </div>
            );
          return (
            <div
              key={product.defaultArticle.code}
              className="mx-2 my-5 bg-white shadow p-2"
            >
              <img className="block w-full" src={product.images[0].url} />
            </div>
          );
        })}
      </div>
      {isLoading && <div>Loading...</div>}
    </>
  );
};
export default AllItems;
