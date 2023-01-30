import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ItemsList from "./ItemsList";
import ErrorPage from "./ErrorPage";
const CategoryItems = () => {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);
  const getItems = async () => {
    try {
      setisLoading(true);
      const response = await axios.get(
        `https://fakestoreapi.com/products/category/${category}`
      );
      setItems(response.data);
      setisLoading(false);
    } catch (err) {
      setisLoading(false);
      setError(err);
    }
  };
  useEffect(() => {
    getItems();
  }, [category]);
  if (error) return <ErrorPage />;
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <ItemsList items={items} />
        </div>
      )}
    </>
  );
};
export default CategoryItems;
