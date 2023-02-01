import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GoChevronDown } from "react-icons/go";
import ErrorPage from "./ErrorPage";
const Dropdown = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdown = useRef();
  useEffect(() => {
    const handler = (event) => {
      //   console.log(dropdown.current);
      if (!dropdown.current) return;
      if (!dropdown.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler);
  }, [dropdown]);

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
  if (error) return <ErrorPage />;
  return (
    <div ref={dropdown} className="relative inline-block text-left ml-5 ">
      <div>
        <button
          className="inline-flex w-full justify-center rounded-md  "
          onClick={() => setIsOpen(!isOpen)}
        >
          CATEGORIES
          <GoChevronDown className="-mr-1 h-5 w-5" />
        </button>
      </div>
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg  focus:outline-none">
          {isLoading ? (
            <div className="py-1">Loading...</div>
          ) : (
            <div>
              {categories.map((category, id) => (
                <div key={id} onClick={() => setIsOpen(false)} className="py-1">
                  <Link
                    className="text-gray-700 block px-4 py-2 text-sm"
                    to={`/categories/${category}`}
                  >
                    {category}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Dropdown;
