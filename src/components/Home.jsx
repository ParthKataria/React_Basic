import { useEffect, useState } from "react";
import axios from "axios";
import ErrorPage from "./ErrorPage";
import ItemsList from "./ItemsList";
const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState(null);
  const getItems = async () => {
    setError(null);
    setisLoading(true);
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setItems(response.data);
      setisLoading(false);
    } catch (err) {
      console.log(err);
      setisLoading(false);
      setError(err);
    }
  };
  useEffect(() => {
    getItems();
  }, []);
  console.log(items);
  if (error) return <ErrorPage />;
  return (
    <div>{isLoading ? <div>Loading...</div> : <ItemsList items={items} />}</div>
  );
};
export default Home;
