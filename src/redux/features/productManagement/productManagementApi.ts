import { TQueryParam, TResponseRedux } from "../../../components/Types";
import { TProduct } from "../../../components/Types/productsManagment";
import { baseApi } from "../../api/baseApi";

const productManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Products
    getAllProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/products?limit=300',
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['products'],
      transformResponse: (response: TResponseRedux<TProduct[]>) => {
        return {
          data: response.data,
        };
      },
    }),

    // Get Single Product
    getSingleproduct: builder.query({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: 'GET',
      }),
      transformResponse: (response: TResponseRedux<TProduct[]>) => {
        return {
          data: response.data,
        };
      },
    }),

    // Create Product
    addProduct: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem("token"); // Get the token
        return {
          url: '/products/create-product',
          method: 'POST',
          body: data,
          headers: {
            "Authorization": `Bearer ${token}`, // Include the token
          },
        };
      },
      invalidatesTags: ['products'],
    }),

    // Delete Product
    deleteProduct: builder.mutation({
      query: ({ productId, body }) => ({
        url: `/products/${productId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['products'],
    }),

    // Update Product
    updateProduct: builder.mutation({
      query: ({ productId, body }: { productId: string; body: Partial<TProduct> }) => {
        if (!productId) {
          throw new Error("Product ID is required");
        }
        return {
          url: `/products/${productId}`,
          method: 'PATCH',
          body,
        };
      },
      invalidatesTags: ['products'],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetAllProductsQuery,
  useGetSingleproductQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productManagementApi;