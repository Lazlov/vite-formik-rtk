import { User } from "../Services/Api/auth";
import { selectAllUsers, useGetUsersQuery } from "../Services/Users/usersApiSlice";


export const UserList = () => {
  const {
    data: users,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isSuccess) {
    console.log('sux',users);
   
    const { ids } = users;//?
   console.log(users.ids) 

    
ids?.length
      ? ids.map((userId) => console.log(userId))
      : null;
  }

  return (
    <div>
      {users?.ids} {isFetching ? "...refetching" : ""}
      
    </div>
  );
};
