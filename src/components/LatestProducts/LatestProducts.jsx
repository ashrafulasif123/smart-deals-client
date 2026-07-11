import { use } from "react";
import Product from "../Product/Product";
import Header from "../Header/Header";

const LatestProducts = ({ latestProductsPromise }) => {
  const products = use(latestProductsPromise);

  return (
    <div>
      <Header title="Recent" highlight="Products"></Header>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
