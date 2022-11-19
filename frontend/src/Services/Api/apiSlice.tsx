import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tokenReceived, logOut, selectCurrentUser } from "../Auth/authSlice";
import { RootState } from "../store";
import { TokenResponse, AuthApiState } from "./auth";

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";


const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
   

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    console.log(refreshResult);
    if (refreshResult.data) {
      const token = refreshResult.data as TokenResponse;

      const email = (api.getState() as AuthApiState).user.email;

      api.dispatch(tokenReceived({ token, user: { email } }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      // api.dispatch(logOut());
      if (refreshResult?.error?.status === 401) {
       console.log("Your login has expired.") 
    }
    return refreshResult
    }
  }
  return result;
};

// Export the auto-generated hook for the `getPosts` query endpoint

export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Product', 'User'],
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({}),
});

// export const {
//   useGetPostsQuery,
//   useGetPostQuery,
//   useCreatePostQuery,
//   useDeletePostQuery,
//   useUpdatePostQuery,
// } = apiSlice;
