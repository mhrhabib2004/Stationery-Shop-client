

export default function Banear() {
  return (
<section className="px-3 py-5 bg-neutral-100 lg:py-10">
      <div className="grid lg:grid-cols-2 items-center justify-items-center gap-5">
        {/* Text Content */}
        <div className="order-2 lg:order-1 flex flex-col justify-center items-center text-center">
          <p className="text-4xl font-bold md:text-6xl text-orange-600">25% OFF</p>
          <p className="text-4xl font-bold md:text-6xl">SUMMER SALE</p>
          <p className="mt-2 text-sm md:text-lg">For limited time only!</p>
          <button className="text-lg md:text-xl bg-black text-white py-2 px-5 mt-8 hover:bg-zinc-800 transition-colors duration-300">
            Shop Now
          </button>
        </div>

        {/* Image */}
        <div className="order-1 lg:order-2">
          <img
            className="h-60 w-60 object-cover lg:w-[400px] lg:h-[400px] rounded-xl"
            src="https://images.unsplash.com/photo-1615397349754-cfa2066a298e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
            alt="Summer Sale"
          />
        </div>
      </div>
    </section>
  )
}
