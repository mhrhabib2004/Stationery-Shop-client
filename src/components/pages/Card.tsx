const Card = ({product}) => {
 
  return (
    <div className="h-auto w-full max-auto border-2 border-[rgba(75,30,133,0.5)] rounded-[1.5em] bg-white text-gray-800 font-nunito p-[1em] flex flex-col gap-[0.75em] backdrop-blur-[12px] sm:max-w-md md:max-w-lg lg:max-w-xl">
      {/* Image */}
      <div className="w-full  h-48 sm:h-56 md:h-48 lg:h-60 overflow-hidden rounded-t-[1.5em]">
        <img
          src={product.image}
          alt="Card Image"
          className="w-full h-full object-cover" // Crop and cover the image
        />
      </div>

      {/* Heading and Paragraph */}
      <div className="p-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium">Heading</h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero dolorum
          blanditiis pariatur sequi magni.
        </p>
      </div>

      {/* Button */}
      <div className="p-4">
        <button className="w-full sm:w-auto h-fit px-[1em] py-[0.25em] border-[1px] border-[rgba(75,30,133,0.5)] rounded-full flex justify-center items-center gap-[0.5em] overflow-hidden group hover:translate-y-[0.125em] duration-200 backdrop-blur-[12px]">
          <p>View Details</p>
          <svg
            className="w-6 h-6 group-hover:translate-x-[10%] duration-300"
            stroke="currentColor"
            strokeWidth={1}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Card;