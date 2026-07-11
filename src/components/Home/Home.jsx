import { Suspense } from "react";
import Banner from "../Banner/Banner";
import LatestProducts from "../LatestProducts/LatestProducts";

const latestProductsPromise = fetch(
  "http://localhost:3000/latest-products"
).then((res) => res.json());
const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Suspense
        fallback={
          <div className="text-center">
            <span className="loading loading-spinner text-error w-12 h-12"></span>
          </div>
        }
      >
        <LatestProducts
          latestProductsPromise={latestProductsPromise}
        ></LatestProducts>
      </Suspense>
    </div>
  );
};

export default Home;
