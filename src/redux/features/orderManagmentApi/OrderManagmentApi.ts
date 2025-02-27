import { TQueryParam, TResponseRedux } from "../../../components/Types";
import { TOrders } from "../../../components/Types/orderTypes";
import { baseApi } from "../../api/baseApi";




const orderManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Get All Bicycle
        getAllOrders: builder.query({
            query: (args) => {
                // console.log(args);
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: '/orders',
                    method: 'GET',
                    params: params,
                };
            },
            providesTags: ['Order'],
            transformResponse: (response: TResponseRedux<TOrders[]>) => {
                return {
                    data: response.data,
                };
            },
        }),


        // create order API
        addOrder: builder.mutation({
            query: (data) => ({
                url: '/orders/create-order',
                method: 'POST',
                body: data,
            }),
        }),

        // Verify Order
        verifyOrder: builder.query({
            query: (order_id) => ({
                url: "/orders/verify-payment",
                params: { order_id },
                method: "GET",
            }),
        }),


        // delete product Api
        deleteOrder: builder.mutation({
            query: ({ id, body }) => ({
                url: `/orders/${id}`,
                method: 'DELETE',
                body,
            }),
            invalidatesTags: ['Order']
        }),

        // Update Order
        updateOrder: builder.mutation({
            query: ({ orderId, body }) => ({
                url: `/orders/${orderId}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['Order']
        }),

        // Get Me Order
        getMeOrders: builder.query({
            query: (args) => {
                // console.log(args);
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: '/orders/me',
                    method: 'GET',
                    params: params,
                };
            },
            providesTags: ['Order'],
            transformResponse: (response: TResponseRedux<TOrders[]>) => {
                return {
                    data: response.data,
                };
            },
        }),

    }),
});

export const {
    useAddOrderMutation,
    useGetAllOrdersQuery,
    useGetMeOrdersQuery,
    useVerifyOrderQuery,
    useDeleteOrderMutation,
    useUpdateOrderMutation,

} = orderManagementApi;