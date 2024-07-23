import { Box, List } from "@mui/material";
import { useAppSelector } from "../Services/hooks";
import { useGetUsersQuery } from "../Services/Users/usersApiSlice";
import { User } from "./User copy";


export const UserList = () => {
  const {
    data: users,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery('userList', {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });


  interface UserResponse {
    map: any;
    _id: string;
    email: string;
    password: string;
    roles: string[];
  }


  const PostJsonDetail = (data: any) => {
    // const { data: user } = useGetUsersQuery('userList');

    return (
      <Box>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Box>
    );
  };
  return (
    <Box component="main" sx={{ p: 3 }} >
      {isSuccess && <div>{users.map(user=>{return <PostJsonDetail key={user._id}  data={user} />})}</div>}
       
      {isLoading && <h2>...Loading</h2>}
      {isFetching && <h2>...Fetching</h2>}
      {error && <h2>Something went wrong</h2>}
      {isSuccess && <List>
        {users.map(user=>{return <User key={user._id}  id={user._id} email={user.email}/>})}
      </List>
      }
      
    </Box>
  );
};
