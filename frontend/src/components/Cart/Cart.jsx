import React from "react";
import EmptyCart from "./EmptyCart";
import EmptyCart2 from "./EmptyCart2";
import { Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/auth-context";
import useRazorpay from "react-razorpay";

function Cart() {
  const [Razorpay] = useRazorpay();
  let auth = useContext(AuthContext);
  let [userCart, setUserCart] = React.useState([]);
  let [isupadate, setIsUpdate] = React.useState(1);
  let [netPrice, setNetPrice] = React.useState(0);


  React.useEffect(() => {
    async function getCartItem() {
      let response;
      try {
        response = await fetch(`http://localhost:5000/user`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        });
        
        if (!response.ok) {
          throw new Error("error occured try again leter", 422);
        }
        let responseData = await response.json();
        let value = 0;
        responseData.Cart.map((product) => {
          value = Number(product.price) + value;
        });
        setNetPrice(value);
        setUserCart([...responseData.Cart]);
 
      } catch (error) {
        console.log(error);
      }
    }
    getCartItem();
  }, [isupadate ,auth ]);

  async function removeCartItem(idofproduct) {
    let response;
    try {
      response = await fetch(
        `http://localhost:5000/user/${idofproduct}`,
        {
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("error occured try again later ");
      }
      let responseData = await response.json();
      setIsUpdate((prevalue) => prevalue + 1);
    } catch (error) {
      console.log(error );
    }
  }

  const amount = netPrice*100*90 ;
  const currency = "INR";
  const receiptId = "qwsaq1";

  const paymentHandler = async (e) => {
    const response = await fetch("http://localhost:5000/order", {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      }, 
    });
    const order = await response.json();
  

    var options = {
      key: "rzp_test_pBjWhXmDvQr9bP",
      amount,
      currency,
      name: "SneakHead",
      description: "Order P",
      image: "https://example.com/your_logo",
      order_id: order.id,
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(
          "http://localhost:5000/order/validate",
          
          {
            method: "POST",
            body: JSON.stringify({...body , amount : amount}),
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth.token,
            },
          }
        );
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    let rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error);
    });
    rzp1.open();
    e.preventDefault();
  };

  const finalCart = (
    <div className="mx-auto flex max-w-3xl flex-col space-y-4 p-6 px-2 sm:p-10 sm:px-2">
      <h2 className="text-3xl font-bold">Your cart</h2>
      <p className="mt-3 text-sm font-medium text-gray-700">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eius
        repellat ipsam, sit praesentium incidunt.
      </p>
      <ul className="flex flex-col divide-y divide-gray-200">
        {userCart.map((product) => (
          <li
            key={product._id}
            className="flex flex-col py-6 sm:flex-row sm:justify-between"
          >
            <div className="flex w-full space-x-2 sm:space-x-4">
              <img
                className="h-20 w-20 flex-shrink-0 rounded object-contain outline-none dark:border-transparent sm:h-32 sm:w-32"
                src={product.imageURL}
                alt={product.name}
              />
              
              <div className="flex w-full flex-col justify-between pb-4">
                <div className="flex w-full justify-between space-x-2 pb-2">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                      {product.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold"> $ {product.price}</p>
                  </div>
                </div>
                <div className="flex divide-x text-sm">
                  <button
                    type="button"
                    onClick={() => removeCartItem(product._id)}
                    className="flex items-center space-x-2 px-2 py-1 pl-0"
                  >
                    <Trash size={16} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="space-y-1 text-right">
        <p>
          Total amount:
          <span className="font-semibold"> ${netPrice}</span>
        </p>
      </div>
      <div className="flex justify-end space-x-4">
        <Link to="/products">
          <button
            type="button"
            className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Back to shop
          </button>
        </Link>
        <button
          type="button"
          className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={paymentHandler}
        >
          Checkout
        </button>
      </div>
      </div>
  );

  return (
    <>
      {!auth.isLoggedIn ? (
        <EmptyCart2 />
      ) : netPrice === 0 ? (
        <EmptyCart />
      ) : (
        finalCart
      )}
    </>
  );
}

export default Cart;
