import React, { useEffect } from "react";
import ProductsList from "./ProductsList";

const filters = [
  {
    id: "brand",
    name: "Brand",
    options: [
      { value: "NIKE", label: "Nike" },
      { value: "REEBOK", label: "Reebok" },
      { value: "VANS", label: "Vans" },
      { value: "ADIDAS", label: "Adidas" },
    ],
  },
  {
    id: "gender",
    name: "Gender",
    options: [
      { value: "MEN", label: "Men" },
      { value: "WOMEN", label: "Women" },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "FORMAL", label: "Formal" },
      { value: "CASUAL", label: "Casual" },
      { value: "RUNNING", label: "Running" },
      { value: "FOOTBALL", label: "FootBall" },
    ],
  },
];

function Products() {
  let [shoes, setShoes] = React.useState([
    {
      _id: "65802743ace4c0f600d98fe5",
      name: "Nike React Infinity Run Flyknit",
      brand: "NIKE",
      gender: "MEN",
      category: "RUNNING",
      imageURL:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-665455a5-45de-40fb-945f-c1852b82400d/react-infinity-run-flyknit-mens-running-shoe-zX42Nc.jpg",
      price: "160",
      __v: 0,
    },
  ]);

  const filterObject = {
    brand: [],
    gender: [],
    category: [],
  };

  useEffect(() => {
    async function getShoes() {
      try {
        const response = await fetch("http://localhost:5000/products");
        if (!response.ok) {
          throw new Error("error occured frontend , try again later");
        }
        const responseData = await response.json();
        setShoes(responseData);
      } catch (error) {
        console.log(error);
      }
    }
    getShoes();
  }, [1]);

  const filterShoesList = async () => {
    let response;
  
    try {
      response = await fetch("http://localhost:5000/products/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filterObject),
      });

      if (!response.ok) {
        throw new Error("error occured try again later");
      }
      const responseData = await response.json();
      setShoes(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  function addFilterObject(e) {
    if (e.target.checked) {
      if (e.target.name == "brand") {
        filterObject.brand.push(e.target.value);
      }
      if (e.target.name == "gender") {
        filterObject.gender.push(e.target.value);
      }
      if (e.target.name == "category") {
        filterObject.category.push(e.target.value);
      }
    } else {
      if (e.target.name == "brand") {
        filterObject.brand = filterObject.brand.filter(
          (value) => value !== e.target.value
        );
      }
      if (e.target.name == "gender") {
        filterObject.gender = filterObject.gender.filter(
          (value) => value !== e.target.value
        );
      }
      if (e.target.name == "category") {
        filterObject.category = filterObject.category.filter(
          (value) => value !== e.target.value
        );
      }
    }

    filterShoesList();
  }

  return (
    <section className="w-full">
      <div className="mx-auto px-2 py-5 lg:px-10">
        <div className="md:flex md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-xl font-bold">Products</h1>
          </div>
        </div>
        <hr className="my-8" />
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-6">
          <div className="hidden space-y-6 divide-y lg:col-span-2 lg:block">
            {filters.map((filter) => (
              <div key={filter.id} className="pt-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {filter.name}
                </h3>
                <ul className="mt-2">
                  {filter.options.map((option) => (
                    <li
                      key={option.value}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center">
                        <input
                          id={`${filter.id}-${option.value}`}
                          name={`${filter.id}`}
                          defaultValue={option.value}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                          onClick={addFilterObject}
                        />
                        <label
                          htmlFor={`${filter.id}-${option.value}`}
                          className="ml-3 text-md font-medium text-gray-900"
                        >
                          {option.label}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="h-[400px] w-full rounded-lg px-2 lg:col-span-10 lg:h-full  overflow-auto">
            <ProductsList shoes={shoes} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Products;
