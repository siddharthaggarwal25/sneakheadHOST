import React from "react";
import { useParams } from "react-router-dom";
import SuccessModal from "../SuccessModal/SuccessModal";
import ErrorModal from "../ErrorModal/ErrorModal";
import { useContext } from "react";
import NotUserAvailable from "../NotUserAvailable/NotUserAvailable";
import {AuthContext} from "../../Context/auth-context"

const ProductById = () => {
  const auth = useContext(AuthContext);
  const [shoe, setShoe] = React.useState({});
  const [isAdded, setIsAdded] = React.useState(false);
  const [isError, setIsError]=React.useState(false);
  const[isNotAvailable , setIsNotAvailable]=React.useState(false);
  const { pid } = useParams();


  React.useEffect(() => {
    async function getShoe() {
  
      try {
        const response = await fetch(`http://localhost:5000/product/${pid}`);

        if (!response.ok) {
          throw new Error("error in frontend ,try again later");
        }

        const responseData = await response.json();
        setShoe(responseData);
      } catch (error) {
        setIsError(true);
      }
    }
    getShoe();
  }, [1]);

  async function addUserItem() {
  
    let response;
    if(!auth.isLoggedIn){
     return  setIsNotAvailable(true);
    }
    try {
      response = await fetch(
        `http://localhost:5000/user/${pid}`,
        {
          method: "PUT",
          headers:{
            Authorization: "Bearer " + auth.token
          }
        }
        
      );
      if (!response.ok) {
        throw new Error("error occured try again later");
      }
      setIsAdded(true);
      setTimeout(()=> setIsAdded(false) ,1000);
    } catch (error) {
      setIsError(true);
      console.log(error);
    }
  }

  return (
    <> 
    {isNotAvailable && <NotUserAvailable  hangeProductById={ ()=> setIsNotAvailable(false)} />}
    {isError && <ErrorModal changeError={() => setIsError(false)} message="Item not added to cart ,try again later"  />}
     {isAdded && <SuccessModal message="Item added to your cart"/>}
      <section className="overflow-hidden">
        <div className="mx-auto max-w-5xl px-5 py-24">
          <div className="mx-auto flex flex-wrap items-center lg:w-4/5">
            <img
              alt={shoe.name}
              className="h-64 w-full rounded object-cover lg:h-96 lg:w-1/2"
              src={shoe.imageURL}
            />
            <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
              <h2 className="text-sm font-semibold tracking-widest text-gray-500">
                {shoe.brand}
              </h2>
              <h1 className="my-4 text-3xl font-semibold text-black">
                {shoe.name}
              </h1>

              <p className="leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
                aliq
              </p>
              <div className=" mt-7 flex items-center ">
                <div className="flex items-center">
                  <h2 className="text font-semibold  text-gray-800">
                    Type : {shoe.category}
                  </h2>
                </div>
              </div>
              <div className="mb-5 mt-6 flex items-center border-b-2 border-gray-100 pb-5">
                <div className="flex items-center">
                  <h2 className="text font-semibold  text-gray-800">
                    Gender : {shoe.gender}
                  </h2>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="title-font text-xl font-bold text-gray-900">
                  $ {shoe.price}
                </span>
                <button
                  type="button"
                  onClick={addUserItem}
                  className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductById;
