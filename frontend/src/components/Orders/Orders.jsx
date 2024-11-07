import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../Context/auth-context";
import OrderCard from "./OrderCard";
import EmptyOrder from "./EmptyOrder";

function Order() {
  let auth = useContext(AuthContext);
  let [check, setCheck] = React.useState(false);
  let [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    async function getOrderItem() {
      let response;
      try {
        response = await fetch(`http://localhost:5000/user`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        });

        if (!response.ok) {
          throw new Error("error occured try again leter");
        }

        let responseData = await response.json();
        setOrders(responseData.Orders);
        setCheck(true);
      } catch (error) {}
    }
    auth.token && getOrderItem();
  }, [auth]);

  console.log(orders);

  return <> {check ?  (orders.length !==0 ? orders.map((item) => <OrderCard orderItem={item} />): <EmptyOrder/>) : <div></div>}</>;
}

export default Order;
