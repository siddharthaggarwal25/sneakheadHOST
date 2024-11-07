import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function EmptyOrder() {
  return (
    <div className="flex items-center justify-center px-2 md:px-0  mt-20  ">
      <div>
        <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl  ">
       Orders
        </h1>
        <p className="mt-4 text-gray-500">
             No Order 
        </p>
        <div className="mt-6  flex items-center   space-x-3">
          <Link to="/products">
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black  bg-black text-white"
            >
              <ArrowLeft size={16} className="mr-2" />
              To Products
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default EmptyOrder;
