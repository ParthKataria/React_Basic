import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ErrorPage from "./ErrorPage";
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);
  const getItems = async () => {
    try {
      setisLoading(true);
      const response = await axios.get(
        "https://fakestoreapi.com/products/categories"
      );
      setCategories(response.data);
      setisLoading(false);
    } catch (err) {
      setisLoading(false);
      setError(err);
    }
  };
  useEffect(() => {
    getItems();
  }, []);
  //   console.log(categories);
  if (error) return <ErrorPage />;
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <ul>
            {categories.map((category) => (
              <li>
                <Link to={`/categories/${category}`}>{category}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
export default Categories;
