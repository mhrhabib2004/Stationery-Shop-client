import { toast } from "sonner";
import { z } from "zod";
import { FieldValues, SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Category } from "./CreatProduct";
import { TProduct } from "../../Types/productsManagment";
import { useUpdateProductMutation } from "../../../redux/features/productManagement/productManagementApi";
import LoadingProgress from "../../pages/loadingProgress";
import Sinput from "../../From/Sinput";

// Define the schema for validation
const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  brand: z.string().min(1, "Brand is required"),
  price: z.preprocess((val) => Number(val), z.number().min(1, "Price must be at least 1")),
  category: z.nativeEnum(Category, {
    message: "Invalid category selected",
  }),
  quantity: z.preprocess((val) => Number(val), z.number().min(1, "Quantity must be at least 1")),
  image: z.string().url("Invalid URL"),
  inStock: z.boolean().default(true),
});

interface TTitle {
  title: string;
  product: TProduct;
}

const ProductModalUpdate = ({ title, product }: TTitle) => {
  const [updateProduct] = useUpdateProductMutation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const methods = useForm({
    resolver: zodResolver(productSchema),
    mode: "onBlur",
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = methods;

  // Watch selected category
  const selectedCategory = watch("category");

  // Pre-fill the form with product data when the modal opens
  useEffect(() => {
    if (isDialogOpen && product) {
      setValue("name", product.name);
      setValue("description", product.description);
      setValue("brand", product.brand);
      setValue("price", Number(product.price)); // Ensure price is a number
      setValue("quantity", Number(product.quantity)); // Ensure quantity is a number
      setValue("image", product.image);
      setValue("category", product.category);
    }
  }, [isDialogOpen, product, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading(<LoadingProgress />);

    try {
      if (!product?._id) {
        toast.error("Invalid product ID", { id: toastId });
        return;
      }

      const productData = {
        ...data,
        price: Number(data.price), // Convert price to number
        quantity: Number(data.quantity), // Convert quantity to number
      };

      const res = await updateProduct({
        productId: product._id,
        body: productData,
      }).unwrap();

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Product updated successfully", { id: toastId });
        reset();
        setIsDialogOpen(false);
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div>
      {/* Modal Trigger Button */}
      <button
        onClick={() => setIsDialogOpen(true)}
        className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300"
      >
        {title}
      </button>

      {/* Modal */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 overflow-y-auto max-h-[90vh]">
            {/* Modal Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800">
                Update Product
              </h2>
            </div>

            {/* Form */}
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
                {/* Product Name */}
                <Sinput
                  type="text"
                  name="name"
                  label="Product Name"
                  placeholder="Enter product name"
                />

                {/* Description */}
                <Sinput
                  type="text"
                  name="description"
                  label="Description"
                  placeholder="Enter product description"
                />

                {/* Category Selection */}
                <div className="flex flex-col space-y-2">
                  <label className="text-lg text-gray-700">Category</label>
                  <select
                    {...register("category")}
                    className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Category</option>
                    {Object.values(Category).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  {errors.category && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.category.message?.toString()}
                    </p>
                  )}
                </div>

                {/* Price */}
                <Sinput 
                  type="number"
                  name="price"
                  label="Price"
                  placeholder="Enter product price"
                  step="0.01"
                />

                {/* Quantity */}
                <Sinput
                  type="number"
                  name="quantity"
                  label="Quantity"
                  placeholder="Enter quantity"
                  step="1"
                />

                {/* Product Image Link */}
                <Sinput
                  type="text"
                  name="image"
                  label="Product Image Link"
                  placeholder="Enter product image URL"
                />

                {/* Submit Button */}
                <div className="mt-4">
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  >
                    Update Product
                  </button>
                </div>
              </form>
            </FormProvider>

            {/* Close Button */}
            <button
              onClick={() => setIsDialogOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductModalUpdate;
