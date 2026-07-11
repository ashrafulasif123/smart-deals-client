import { FiSearch } from "react-icons/fi";

const Banner = () => {
  return (
    <section className="py-15">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Heading */}
        <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
          Deal your Products
          <br />
          <span className="bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">
            in a Smart way !
          </span>
        </h1>

        {/* Description */}
        <p className="max-w-2xl mx-auto mt-6 text-lg text-base-content/70">
          SmartDeals helps you sell, resell, and shop from trusted local sellers
          — all in one place!
        </p>

        <div className="max-w-2xl mx-auto mt-10">
          <div className="flex items-center h-16 rounded-xl overflow-hidden border border-base-300 shadow-lg bg-base-100">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 h-full px-6 outline-none bg-transparent"
            />

            <button className="btn btn-primary h-full rounded-none px-7">
              <FiSearch className="text-xl" />
            </button>
          </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button className="btn btn-primary px-8">Watch All Products</button>

          <button className="btn btn-outline border-[#632EE3] hover:border-[#632EE3] bg-transparent">
            <span className="bg-gradient-to-br from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent font-semibold">
              Post a Product
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
