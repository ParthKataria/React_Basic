import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import ErrorPage from "./ErrorPage";
const Item = () => {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);
  const getItems = async () => {
    try {
      setisLoading(true);
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      setItem(response.data);
      setisLoading(false);
    } catch (err) {
      setisLoading(false);
      setError(err);
    }
  };
  useEffect(() => {
    getItems();
  }, []);
  if (error) return <ErrorPage />;
  const { image, price, title, description } = item;
  console.log(item);
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-2">
          <img
            className="block w-full my-5 mx-5 h-3/4 border border-green-200 col-span-1 "
            src={image}
          />
          <ul className="col-span-1 m-5 text-center items-center">
            <li className="text-6xl">{title}</li>
            <li className="text-xl">{description}</li>
            <li className="text-3xl">Cost - ${price}</li>
          </ul>
        </div>
      )}
    </>
  );
};
export default Item;
