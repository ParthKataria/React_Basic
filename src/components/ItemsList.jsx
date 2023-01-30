import Card from "./Card";
const ItemsList = ({ items }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4">
      {items.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </div>
  );
};
export default ItemsList;
