import { apiSlice } from "../Api/apiSlice";
import { LoginRequest, TokenResponse, AuthApiState, User } from "../Api/auth";
import authSlice, { logOut, tokenReceived } from "./authSlice";
import { RootState } from "../store";
import { selectCurrentUser } from "./authSlice";
import jwtDecode, { JwtPayload } from "jwt-decode";
interface decodedToken {
  roles:string,
  _id:string
}
import { useSelector } from "react-redux";






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
          setTimeout(()=>{
          dispatch(apiSlice.util.resetApiState());
         
          },1000)
          localStorage.removeItem('username');
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
          console.log('its data',data);
      
          const username = JSON.parse(localStorage.getItem("username") || "")
          console.log(username)
          dispatch(tokenReceived({token:data,user:{email:username}})); 
          //usera ne znaet
          //navigate
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogOutMutation, useRefreshMutation } =
  authApiSlice;
