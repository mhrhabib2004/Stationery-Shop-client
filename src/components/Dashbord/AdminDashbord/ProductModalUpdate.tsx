import { useState, useEffect } from "react";
import { useForm, FormProvider, SubmitHandler, FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, TProduct } from "../../Types/productsManagment";
import { useUpdateProductMutation } from "../../../redux/features/productManagement/productManagementApi";
import Sinput from "../../From/Sinput";
import LoadingProgress from "../../pages/loadingProgress";

// Define the schema for validation
const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  brand: z.string().min(1, "Brand is required"),
  price: z.number().min(1, "Price must be at least 1"),
  category: z.nativeEnum(Category, {
    message: "Invalid category selected",
  }),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  image: z.string().url("Invalid URL"),
  inStock: z.boolean().default(true),
});

interface TTitle {
  title: string;
  product: TProduct;
}

const ProductModalUpdate = ({ title, product }: TTitle) => {
  const [updateProduct] = useUpdateProductMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const methods = useForm({
    resolver: zodResolver(productSchema),
    mode: "onBlur",
  });

  const { handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = methods;

  // Set form values when the modal opens
  useEffect(() => {
    if (isModalOpen && product) {
      setValue("name", product.name);
      setValue("description", product.description);
      setValue("brand", product.brand);
      setValue("price", Number(product.price)); // Convert to number
      setValue("category", product.category);
      setValue("quantity", Number(product.quantity)); // Convert to number
      setValue("image", product.image);
      setValue("inStock", product.inStock);
      setImagePreview(product.image);
    }
  }, [isModalOpen, product, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading(<LoadingProgress />);

    try {
      if (!product?._id) {
        toast.error("Invalid product ID", { id: toastId });
        return;
      }

      const productData = {
        ...data,
        price: Number(data.price),
        quantity: Number(data.quantity),
      };

      console.log(data);

      await updateProduct({ productId: product._id, body: productData }).unwrap();
      toast.success("Product updated successfully", { id: toastId });
      reset();
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImagePreview(url);
    setValue("image", url);
  };

  return (
    <div>
      {/* Modal Trigger */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        {title}
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl mx-4 shadow-2xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Update Product</h2>
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Form */}
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
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

                {/* Brand */}
                <Sinput
                  type="text"
                  name="brand"
                  label="Brand"
                  placeholder="Enter product brand"
                />

                {/* Price */}
                <Sinput
                  type="number"
                  name="price"
                  label="Price"
                  placeholder="Enter product price"
                />

                {/* Image URL */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Product Image URL</label>
                  <input
                    type="text"
                    {...methods.register("image")}
                    onChange={handleImageUrlChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img src={imagePreview} alt="Product Preview" className="w-32 h-32 object-cover rounded" />
                    </div>
                  )}
                  {errors.image && (
                    <p className="text-sm text-red-500">{errors.image.message as string}</p>
                  )}
                </div>

                {/* Quantity */}
                <Sinput
                  type="number"
                  name="quantity"
                  label="Quantity"
                  placeholder="Enter product quantity"
                />

                {/* Category Selector */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    {...methods.register("category")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.values(Category).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-sm text-red-500">{errors.category.message as string}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {isSubmitting ? "Updating..." : "Update Product"}
                  </button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductModalUpdate;