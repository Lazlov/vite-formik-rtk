import { apiSlice } from "../Api/apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import type { EntityState } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

interface User {
  id: string;
  email: string;
}

interface UserResponse {
 
  _id: string;
  email: string;
  password: string;
  roles: string[];
}

// const usersAdapter = createEntityAdapter<User>({
//   sortComparer: (a, b) => a.email.localeCompare(b.email),
// });
// const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getUsers: builder.query<EntityState<User[]>, void>({
    getUsers: builder.query<UserResponse[], string>({
      query: () => ({
        url: `/users`,
        
        validateStatus: (response, result) =>
          response.status === 200 && !result.isError,

        keepUnusedDataFor: 60,

        // transformResponse: (responseData: UserResponse[]) => {
        // //   console.log('transformresponse worked')
        //   const transformedUsers: User[] = responseData.map(
        //     ({ _id, email }) => {return {
        //       id: _id,
        //       email,
        //     }}
        //   );
        //   // return usersAdapter.setAll(initialState, transformedUsers)
        // console.log(transformedUsers)
        //   return  transformedUsers
         
        // //   return usersAdapter.addMany(initialState, transformedUsers)
          // }
      }),
      providesTags: (result) =>
      result ? result.map(({ _id }) => ({ type: 'User', _id })) : ['User'],
 
    }),
    updateUser: builder.mutation<User, Partial<User> & Pick<User, "id">>({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    deleteUser: builder.mutation<User, Partial<User> & Pick<User, "id">>({
      query: ({ id, ...deleteUser }) => ({
        url: `users/${id}`,
        method: "DELETE",
        body: deleteUser,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});
export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = usersApiSlice;

// export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// const selectUsersData = createSelector(
//   selectUsersResult,
//   (usersResult) => usersResult.data
// );

// type Root = ReturnType<typeof RootState>;

// console.log(store.getState().books);

// export const { selectAll: selectAllUsers, selectById: selectUserById } =
//   usersAdapter.getSelectors<RootState>(
//     (state: RootState) => selectUsersData(state) ?? initialState
//   );

// export const { selectAll: selectAllUsers, selectById: selectUserById } =
//   usersAdapter.getSelectors(
//     (state: RootState) => selectUsersData(state) ?? initialState
//   );
