import { Link } from "react-router-dom";
const Card = ({ product }) => {
  const { id, image, price, title } = product;
  return (
    <div className="mx-2 mt-5 bg-white shadow p-2 border border-green-200">
      <div>
        <img className="block w-full h-80" src={image} />
        <ul className="text-center bg-green-100 h-32">
          <li>Name-{title}</li>
          <li>Cost-${price}</li>
        </ul>
      </div>
      <Link to={`/products/${id}`}>
        <div className="bg-black text-white w-full text-center">
          View Product
        </div>
      </Link>
    </div>
  );
};
export default Card;
