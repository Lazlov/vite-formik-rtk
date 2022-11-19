import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../Api/apiSlice";
import type { EntityState } from "@reduxjs/toolkit";
import { RootState } from "../store";



interface User {
  id: string;
  email: string;
  // password: string;
  // roles:string[]
}

interface UserResponse {
  _id: string;
  email: string;
  password: string;
  roles:string[]
}

const usersAdapter = createEntityAdapter<User>({
  sortComparer: (a, b) => a.email.localeCompare(b.email),
});
const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<EntityState<User[]>, void>({ //user[]
      query: () => ({
        // name:'users', //?
        url: `/users`,
        validateStatus: (response, result) =>
          response.status === 200 && !result.isError,
        keepUnusedDataFor: 60,
        transformResponse: (responseData: UserResponse[]) => {
          console.log("response", responseData);
          // const loadedUsers = responseData.map((user) => {
          //   console.log('transformresponse'user);
          //     const updatedUserResponse =  {
          //       id: user._id,
          //       email: user.email,
          //       password: user.password,
          //       // roles:user.roles
          //     };
          //   return updatedUserResponse
          // });
          const simpleUsers: User[] = responseData.map(({ _id, email }) => ({
            id:_id,
            email
          }));
          
          // return usersAdapter.setAll(initialState, loadedUsers);
          return usersAdapter.setAll(initialState, simpleUsers)

          // return usersAdapter.setAll(initialState, responseData);

          
        },
        // invalidateTags: (result: { ids: string[]; }, error: any, args: any) => {
        providesTags: (
          result: { ids: []; entities: {} },
          // result: { ids: []; entities: {} },
          error: any,
          args: any
        ) => {
          if (result?.ids) {
            return [
              { type: "User", id: "List" },
              ...result.ids.map((id) => ({ type: "User", id })),
            ];
          } else return [{ type: "User", id: "List" }];
        },
      }),
    }),

    updateUser: builder.mutation<User, Partial<User> & Pick<User, "id">>({
      query: ({ id, ...patch }) => ({
        url: `products/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),

    deleteUser: builder.mutation<User, Partial<User> & Pick<User, "id">>({
      query: ({ id, ...deleteUser }) => ({
        url: `products/${id}`,
        method: "DELETE",
        body: deleteUser,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});
export const {
  useGetUsersQuery,
  // useDeleteUserMutation,
  // useUpdateUserMutation,
} = usersApiSlice;

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data
);

// type Root = ReturnType<typeof RootState>;

// console.log(store.getState().books);

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors<RootState>(
    state => selectUsersData(state) ?? initialState
  );
