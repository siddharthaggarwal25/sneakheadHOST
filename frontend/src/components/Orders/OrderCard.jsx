import React from "react";

function OrderCard(props) {
  console.log(props);
  props = props.orderItem;
 

  return (
    <div className="mx-auto my-4 max-w-4xl md:my-12 border-y-black">
      <div className="overflow-hidden rounded-xl border border-gray-100 shadow">
        <div className="grid grid-cols-1 md:grid-cols-2">
       
          <div className="px-5 py-6 md:border-r md:border-r-gray-200 md:px-8">
            <div className="flow-root">
              <ul className="-my-7 divide-y divide-gray-200">
                {props.Items.map((product) => (
                  <li
                    key={product.id}
                    className="flex items-stretch justify-between space-x-5 py-7"
                  >
                    <div className="flex flex-1 items-stretch">
                      <div className="flex-shrink-0">
                        <img
                          className="h-20 w-20 rounded-lg border border-gray-200 object-contain"
                          src={product.imageURL}
                          alt={product.imageURL}
                        />
                      </div>

                      <div className="ml-5 flex flex-col justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900">
                            {product.name}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-auto flex flex-col items-end justify-between">
                      <p className="text-right text-sm font-bold text-gray-900">
                       $ {product.price}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <hr className="mt-6 border-gray-200" />
              <ul className="mt-6 space-y-3">
                <li className="flex items-center justify-between">
                  <p className="text-sm font-medium ">Total</p>
                  <p className="text-sm font-bold ">₹ {props.amount /100}</p>
                </li>
              </ul>
            </div>
          </div>
          {/* Contact Info */}
          <div className="px-5 py-6 md:px-8">
            <div className="flow-root">
              <div className="-my-6 divide-y divide-gray-200">
                <div className="py-6">
                  <h2 className="text-base font-bold text-black">
                    Order Information
                  </h2>
                  <p className="fontmedium mt-3 text-xs text-gray-700">
                    Order Number: {props.OrderId}
                  </p>
                  <p className="text-xs font-medium text-gray-700">
                    {props.date}
                  </p>
                  
                </div>
                <div className="py-6">
                  <h2 className="mb-2 text-base font-bold text-black">
                    Shipping Information
                  </h2>
                  <p className="text-xs font-medium text-gray-700">
                    {props.address}
                  </p>
                  <p className="text-xs font-medium text-gray-700">
                    {props.number}
                  </p>
                </div>
                <div className="py-6">
                  <h2 className="text-base font-bold text-black">
                    Payment Information
                  </h2>
                  <p className="mt-3 text-xs font-medium text-gray-700">
                    {props.paymentId}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
