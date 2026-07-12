import { use, useRef } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";

const ProductDetails = () => {
  const product = useLoaderData();
  const {
    _id,
    title,
    price_min,
    price_max,
    email,
    category,
    created_at,
    image,
    status,
    location,
    seller_image,
    seller_name,
    condition,
    usage,
    description,
    seller_contact,
  } = product;
  // ডেট ফরম্যাট করার জন্য (যেমন: 10/19/2024)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  };
  const bidModalRef = useRef();
  const { user } = use(AuthContext);
  const handleBidModalOpen = () => {
    bidModalRef.current.showModal();
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = e.target.bid.value;
    const newBid = { _id, name, email, bid };

    fetch("http://localhost:3000/bids/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 bg-gray-50 font-sans min-h-screen">
      {/* Main Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Image & Description */}
        <div className="lg:col-span-5 space-y-6">
          {/* Dynamic Image */}
          <div className="w-full aspect-[4/3] bg-gray-300 rounded-2xl overflow-hidden shadow-sm">
            {image ? (
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300" />
            )}
          </div>

          {/* Product Description Box */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-slate-900">
              Product Description
            </h3>

            {/* Condition & Usage */}
            <div className="flex justify-between items-center text-sm border-b border-gray-200 pb-3">
              <div>
                <span className="text-violet-600 font-medium">
                  Condition :{" "}
                </span>
                <span className="text-slate-900 font-semibold capitalize">
                  {condition}
                </span>
              </div>
              <div>
                <span className="text-violet-600 font-medium">
                  Usage Time :{" "}
                </span>
                <span className="text-slate-900 font-semibold capitalize">
                  {usage}
                </span>
              </div>
            </div>

            {/* Description Text */}
            <p className="text-sm text-gray-400 leading-relaxed text-justify whitespace-pre-line">
              {description}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Details & Actions */}
        <div className="lg:col-span-7 space-y-4">
          {/* Back Button */}
          <button className="flex items-center text-slate-800 font-medium text-base hover:text-violet-600 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            Back To Products
          </button>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight">
            {title}
          </h1>

          {/* Tag / Category */}
          <div>
            <span className="inline-block bg-violet-100 text-violet-500 text-xs px-3 py-1 rounded-full font-medium">
              {category}
            </span>
          </div>

          {/* Price Box */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-emerald-600">
              ৳ {price_min?.toLocaleString()} - {price_max?.toLocaleString()}
            </h2>
            <p className="text-sm text-gray-500 mt-1">Price starts from</p>
          </div>

          {/* Product Details Box */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-3">
            <h3 className="text-lg font-bold text-slate-900">
              Product Details
            </h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-500">
                <strong className="text-slate-800">Product ID:</strong>{" "}
                {product?._id}
              </p>
              <p className="text-gray-500">
                <strong className="text-slate-800">Posted:</strong>{" "}
                {formatDate(created_at)}
              </p>
            </div>
          </div>

          {/* Seller Information Box */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              Seller Information
            </h3>

            {/* User Profile Info */}
            <div className="flex items-center space-x-3">
              {seller_image ? (
                <img
                  src={seller_image}
                  alt={seller_name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0" />
              )}
              <div>
                <h4 className="font-semibold text-slate-900 text-base">
                  {seller_name}
                </h4>
                <p className="text-xs text-slate-400">{email}</p>
              </div>
            </div>

            {/* Extra Meta Data */}
            <div className="space-y-2 text-sm pt-2">
              <p className="text-gray-500">
                <strong className="text-slate-800">Location:</strong> {location}
              </p>
              <p className="text-gray-500">
                <strong className="text-slate-800">Contact:</strong>{" "}
                {seller_contact}
              </p>
              <div className="flex items-center text-gray-500">
                <strong className="text-slate-800 mr-2">Status:</strong>
                <span
                  className={`text-white text-xs px-2.5 py-0.5 rounded-full font-medium capitalize ${
                    status === "pending" ? "bg-amber-500" : "bg-green-500"
                  }`}
                >
                  {status}
                </span>
              </div>
            </div>
          </div>

          {/* Buy Button */}
          <button
            onClick={() => handleBidModalOpen()}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3.5 rounded-xl shadow-md transition duration-200 text-base"
          >
            I Want Buy This Product
          </button>
          <dialog
            ref={bidModalRef}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box max-w-2xl mx-auto">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm font-sans">
                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-slate-950 text-center mb-8">
                  Give Seller Your Offered Price
                </h2>

                {/* Form Container */}
                <form onSubmit={handleBidSubmit} className="space-y-5">
                  {/* Row 1: Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-sm font-semibold text-slate-800">
                        Buyer Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        readOnly
                        defaultValue={user.displayName}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-slate-900 placeholder-gray-400 focus:outline-none focus:border-violet-500 transition text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-sm font-semibold text-slate-800">
                        Buyer Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        readOnly
                        defaultValue={user.email}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-slate-900 placeholder-gray-400 focus:outline-none focus:border-violet-500 transition text-sm"
                      />
                    </div>
                  </div>

                  {/* Row 2: Image URL */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-800">
                      Buyer Image URL
                    </label>
                    <input
                      type="url"
                      name="buyerImage"
                      placeholder="https://...your_img_url"
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-slate-900 placeholder-gray-400 focus:outline-none focus:border-violet-500 transition text-sm"
                    />
                  </div>

                  {/* Row 3: Place Price */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-800">
                      Place your Price
                    </label>
                    <input
                      type="text"
                      name="bid"
                      placeholder="Place Bid"
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-slate-900 placeholder-gray-400 focus:outline-none focus:border-violet-500 transition text-sm"
                    />
                  </div>

                  {/* Row 4: Contact Info */}
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-800">
                      Contact Info
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. +1-555-1234"
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-slate-900 placeholder-gray-400 focus:outline-none focus:border-violet-500 transition text-sm"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end items-center space-x-3 pt-6">
                    <div className="">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="px-6 py-2.5 bg-gray-600 hover:bg-gray-900 text-white font-medium rounded-lg shadow-sm transition duration-200 text-sm">
                          Close
                        </button>
                      </form>
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-violet-500 hover:bg-violet-600 text-white font-medium rounded-lg shadow-sm transition duration-200 text-sm"
                    >
                      Submit Bid
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
