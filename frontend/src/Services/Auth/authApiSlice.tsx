import { apiSlice } from "../Api/apiSlice";
import { LoginRequest, TokenResponse } from "../Api/auth";
import authSlice, { logOut, tokenReceived } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<TokenResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/login",
        method: "post",
        body: { ...credentials },
        //                 headers: {
        //                         "Content-Type": "application/json",
        //   "Access-Control-Allow-Origin": "http://localhost:4000/api/login"

        //                       }
      }),
    }),

    logOut: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "post",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);

          dispatch(logOut());
          //kosil
          // setTimeout(()=>{
          dispatch(apiSlice.util.resetApiState());
          // })
        } catch (err) {
          console.log(err);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          const { accessToken } = data;
          //   // tokenReceived({token, user:{email:values.email}})
          console.log('data')
          dispatch(tokenReceived(accessToken)); //usera ne znaet
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogOutMutation, useRefreshMutation } =
  authApiSlice;
