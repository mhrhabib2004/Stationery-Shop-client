
// src/api/productManagementApi.ts

import { TQueryParam, TResponseRedux } from "../../../components/Types";
import { TProduct } from "../../../components/Types/productsManagment";
import { baseApi } from "../../api/baseApi";


const productManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Bicycles
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

    // Get Single Bicycle
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
      query: (data) => ({
        url: '/bicycle/create-bicycle',
        method: 'POST',
        body: data,
      }),
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
      query: ({ productId, body }) => ({
        url: `/products/${productId}`,
        method: 'PATCH',
        body,
      }),
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