import React from "react";
import { Link } from "react-router-dom";

function ProductsList(props){
    return (
        <div className="bg-white h-full">
          <div className="mx-auto">
            <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-6">
              {props.shoes.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="group"
                >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src={product.imageURL}
                      alt={product.name}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                   ${' '}{product.price}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )
}

export default ProductsList;
