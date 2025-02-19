import { baseApi } from "../../api/baseApi";



const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({


        // create student API
        addUser: builder.mutation({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: data,
            }),
        }),

    }),
});


export const {
    useAddUserMutation,
    // useGetAllStudentsQuery,
} = userManagementApi;