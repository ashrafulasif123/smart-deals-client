import { Link } from "react-router";

const Product = ({ product }) => {
  const { _id, title, image, price_min, price_max } = product;
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm font-sans">
      {/* Image Placeholder */}
      <div className="w-full h-62.5 bg-gray-300 rounded-xl overflow-hidden mb-4">
        <img className="w-full h-full object-cover" src={image} alt="" />
      </div>

      {/* Content */}
      <div className="space-y-2 mb-4">
        <h3 className="text-xl font-semibold text-gray-900 leading-snug">
          {title}
        </h3>
        <p className="text-lg font-bold text-violet-600">
          $ {price_min}- {price_max}
        </p>
      </div>

      {/* Button */}
      <Link to={`/productDetails/${_id}`} className="btn-secondary">
        View Details
      </Link>
    </div>
  );
};

export default Product;
