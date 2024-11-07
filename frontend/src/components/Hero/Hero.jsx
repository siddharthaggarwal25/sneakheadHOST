import React from 'react'

 function Hero() {
  return (
    <div className="relative w-full bg-white my-10 mx-4 mb-20 ">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
          <h1 className="mt-8 text-xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl">
          Fashion fades, but Sneakers are Eternal.
          </h1>
          <p className="mt-8 text-lg text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur modi blanditiis
            dolores quasi eaque explicabo!
          </p>
         
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:col-span-6">
          <img
           className="aspect-[3/2] bg-gray-50 object-cover lg:aspect-[4/3] lg:h-[600px] xl:aspect-[16/9]"
           src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c25lYWtlcnN8ZW58MHx8MHx8fDA%3D"
            alt="sneakers"
          />
        </div>
      </div>
    </div>
  )
}

export default Hero;