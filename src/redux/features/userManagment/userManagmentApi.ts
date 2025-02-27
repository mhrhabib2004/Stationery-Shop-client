
import { TQueryParam, TResponseRedux } from "../../../components/Types";
import { baseApi } from "../../api/baseApi";
import { TUser } from "../auth/authSlice";


const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Get All Bicycle
        getAllUsers: builder.query({
            query: (args) => {
                // console.log(args);

                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: '/users',
                    method: 'GET',
                    params: params,
                };
            },
            providesTags: ['User'],
            transformResponse: (response: TResponseRedux<TUser[]>) => {
                return {
                    data: response.data,
                };
            },
        }),

        // Update User
        updateUser: builder.mutation({
            query: ({ userId, body }) => ({
                url: `/users/${userId}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['User']
        }),


        // Delete User
        deleteUser: builder.mutation({
            query: ({ id, body }) => ({
                url: `/users/${id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['User']
        }),

        // Get me user API
        getMeUser: builder.query({
            query: () => ({
                url: '/users/me',
                method: 'GET',
            }),
        }),

        // // Password Changed API
        // paswordChangedUser: builder.mutation({
        //     query: ({ userEmail, body }) => ({
        //         url: `/users/passwordchange/${userEmail}`,
        //         method: 'PATCH',
        //         body,
        //     }),
        //     invalidatesTags: ['User']
        // }),

    }),
});

export const {
    // useAddStudentMutation,
    useGetAllUsersQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useGetMeUserQuery,
    // usePaswordChangedUserMutation,
} = userManagementApi;