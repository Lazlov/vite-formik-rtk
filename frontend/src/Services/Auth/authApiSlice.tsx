import { apiSlice } from "../Api/apiSlice";
import { LoginRequest, TokenResponse } from "../Api/auth";
import authSlice, { logOut } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder=>({
         login: builder.mutation<TokenResponse,LoginRequest>({
            query: credentials=>({
                url: '/login',
                method:'post',
                body:{...credentials},
//                 headers: {
//                         "Content-Type": "application/json",
//   "Access-Control-Allow-Origin": "http://localhost:4000/api/login"

//                       }


            })
         })
    })
})

export const { useLoginMutation } = authApiSlice