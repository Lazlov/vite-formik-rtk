import { useAppSelector } from "../Services/hooks";
import { useGetUsersQuery } from "../Services/Users/usersApiSlice";
import { User } from "./User";

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


  return (
    <div>
      {isLoading && <h2>...Loading</h2>}
      {isFetching && <h2>...Fetching</h2>}
      {error && <h2>Something went wrong</h2>}
      {isSuccess && <div>
        {users.map(user=>{return <User key={user._id}  id={user._id} email={user.email}/>})}
      </div>
      }
      
    </div>
  );
};
