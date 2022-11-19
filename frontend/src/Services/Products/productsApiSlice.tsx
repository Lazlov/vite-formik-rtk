import { apiSlice } from "../Api/apiSlice";

interface Product {
  id: number;
  title: string;
  price: string;
}

type ProductsResponse = Product[];

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, void>({
      query: () => ({
        url: `/products`,
        validateStatus: (response, result) => 
          response.status === 200 && !result.isError,
          keepUnusedDataFor:60,
          invalidateTags: [{ type: "Product", id: "LIST" }],
          addProduct: builder.mutation<Product, Partial<Product> & Pick<Product, "id">>({
            // note: an optional `queryFn` may be used in place of `query`
            query: ({ id, ...deleteProduct }) => ({
              url: `products/${id}`,
              method: "CREATE",
              body: deleteProduct,
             
            }),
            
          }),  
          
         
            updateProduct: builder.mutation<Product, Partial<Product> & Pick<Product, "id">>({
            // note: an optional `queryFn` may be used in place of `query`
            query: ({ id, ...updateUser }) => ({
              url: `products/${id}`,
              method: "PATCH",
              body: updateUser,
            }),
          }),  
            deleteProduct: builder.mutation<Product, Partial<Product> & Pick<Product, "id">>({
            // note: an optional `queryFn` may be used in place of `query`
            query: ({ id, ...deleteUser }) => ({
              url: `products/${id}`,
              method: "DELETE",
              body: deleteUser,
            }),
          }),      }),
    }),
  }),
});

export const { useGetProductsQuery } = productsApiSlice;
