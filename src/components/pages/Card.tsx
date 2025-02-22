import { FaArrowRight } from "react-icons/fa";
import { TProduct } from "../Types/productsManagment";

interface CardProps {
    product: TProduct;
    setIsDialogOpen: (isOpen: boolean) => void;
    setSelectedProductId: (id: string) => void;
}

const Card = ({ product, setIsDialogOpen, setSelectedProductId }: CardProps) => {
    const { _id, image, name, brand, price, category, description, quantity, inStock } = product;
    const stockStatus = inStock ? "In Stock" : "Out of Stock";

    const handleViewDetailsClick = () => {
        setSelectedProductId(_id); // Set selected product ID
        setIsDialogOpen(true); // Open modal
    };

    return (
        <div className="h-auto w-full max-auto border-2 border-[rgba(75,30,133,0.5)] rounded-[1.5em] bg-white text-gray-800 font-nunito p-[1em] flex flex-col gap-[0.75em] backdrop-blur-[12px] sm:max-w-md md:max-w-lg lg:max-w-xl">
            {/* Image */}
            <div className="w-full h-48 sm:h-56 md:h-48 lg:h-60 overflow-hidden rounded-t-[1.5em]">
                <img
                    src={image}
                    alt="Card Image"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Heading and Paragraph */}
            <div className="p-4">
                <h1 className="text-xl text-center md:font-semibold sm:text-xl md:text-1xl lg:text-2xl font-medium">{name}</h1>
                <div className="flex justify-between">
                    <p className="text-sm font-medium sm:text-base md:text-lg lg:text-xl mt-2">
                        {`${name}: ${stockStatus}`}
                    </p>
                    <p className="text-sm font-medium sm:text-base md:text-lg lg:text-xl mt-2">Price: {price} Tk</p>
                </div>
                <div>
                    <p className="text-sm font-medium sm:text-base md:text-lg mt-2">Brand: {brand}</p>
                    <p className="text-sm font-medium sm:text-base md:text-lg mt-2">Category: {category}</p>
                </div>
            </div>

            {/* Button */}
            <div className="p-4">
                <button
                    onClick={handleViewDetailsClick}
                    className="w-full sm:w-auto h-fit px-[1em] py-[0.25em] border-[1px] border-[rgba(75,30,133,0.5)] rounded-full flex justify-center items-center gap-[0.5em] overflow-hidden group hover:translate-y-[0.125em] duration-200 backdrop-blur-[12px] hover:cursor-pointer"
                >
                    View Details
                    <FaArrowRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default Card;