/* eslint-disable react-refresh/only-export-components */
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddProductMutation } from "../../../redux/features/productManagement/productManagementApi";
import { useState } from "react";

// Define the Category enum
export enum Category {
  Writing = "Writing",
  OfficeSupplies = "Office Supplies",
  ArtSupplies = "Art Supplies",
  Educational = "Educational",
  Technology = "Technology",
}

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
  inStock: z.boolean().default(true), // Add inStock field
});

const CreateProduct = () => {
  const methods = useForm({
    resolver: zodResolver(productSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      description: "",
      brand: "",
      price: 1,
      category: Category.Writing, // Default category
      quantity: 1,
      image: "",
      inStock: true, // Default inStock value
    },
  });
  const { handleSubmit, reset, formState: { errors, isSubmitting } } = methods;

  const [createProduct] = useAddProductMutation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating...");
    try {
      const productData = { 
        ...data, 
        price: Number(data.price), 
        quantity: Number(data.quantity),
        inStock: data.quantity > 0, // Automatically set inStock based on quantity
      };
      await createProduct(productData).unwrap();
      toast.success("Product created successfully", { id: toastId });
      reset();
      setImagePreview(null); // Clear image preview after submission
    } catch (err) {
      toast.error(err.data?.message || "Something went wrong", { id: toastId });
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImagePreview(url); // Set the image preview
    methods.setValue("image", url); // Update the form value
  };

  return (
    <div className="lg:ml-48 md:ml-24 p-4">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Product Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              {...methods.register("name")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              {...methods.register("description")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* Brand */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Brand</label>
            <input
              type="text"
              {...methods.register("brand")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.brand && (
              <p className="text-sm text-red-500">{errors.brand.message}</p>
            )}
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Product Price</label>
            <input
              type="number"
              {...methods.register("price", { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>

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
              <p className="text-sm text-red-500">{errors.image.message}</p>
            )}
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Product Quantity</label>
            <input
              type="number"
              {...methods.register("quantity", { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.quantity && (
              <p className="text-sm text-red-500">{errors.quantity.message}</p>
            )}
          </div>

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
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSubmitting ? "Creating..." : "Create Product"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateProduct;