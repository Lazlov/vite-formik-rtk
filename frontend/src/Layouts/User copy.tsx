import React, { useState } from "react";
import {
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../Services/Users/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Box, ButtonGroup } from "@mui/material";
import { Delete } from '@mui/icons-material';


import Grid from "@mui/material/Unstable_Grid2";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAppDispatch } from "../Services/hooks";

import { useDispatch } from "react-redux";
import { authApiSlice, useLoginMutation } from "../Services/Auth/authApiSlice";
import { tokenReceived } from "../Services/Auth/authSlice";
import LoadingButton from "@mui/lab/LoadingButton";
import { EditUserForm } from "./EditUserForm";




export const User: React.FC<{id:string, email: string }> = ( {id,email} ) => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useGetUsersQuery(id)
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [input, setInput] = useState(email);
  const [isEditing, setIsEditing] = useState(false)

  if (isLoading) {
    return <div>Loading...</div>
  }

  // if (isLoading) {
  //   return <div>Loading...</div>
  // }

  


  // const EditableUsername = ({
  //   name: email,
  //   onUpdate,
  //   onCancel,
  //   isLoading = false,
  // }: {
  //   name: string
  //   onUpdate: (name: string) => void
  //   onCancel: () => void
  //   isLoading?: boolean
  // }) => {
  //   const [name, setName] = useState(email)
  
  //   const handleChange = ({
  //     target: { value },
  //   }: React.ChangeEvent<HTMLInputElement>) => setName(value)
  
  //   const handleUpdate = () => onUpdate(name)
  //   const handleCancel = () => onCancel()
  
  //   return (
  //     <div>
  //       <Box flex={10}>
  //         <Input
  //           type="text"
  //           onChange={handleChange}
  //           value={name}
  //           disabled={isLoading}
  //         />
  //       </Box>
  //       <Spacer />
  //       <Box>
  //         <Stack spacing={4} direction="row" align="center">
  //           <Button onClick={handleUpdate} isLoading={isLoading}>
  //             Update
  //           </Button>
  //           <CloseButton bg="red" onClick={handleCancel} disabled={isLoading} />
  //         </Stack>
  //       </Box>
  //       </div>
  //   )
  // }


 

  if (!user) {
    return (
    <div>
          User {id} is missing! Try reloading or selecting another post...
          </div>
    )
  }

  const PostJsonDetail = ({ id }: { id: string }) => {
    const { data: user } = useGetUsersQuery(id)
  
    return (
      <Box >
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </Box>
    )
  }

  const handleInput = () => {};
  const handleConfirmDelete = async ({id:id}) => {
    await  updateUser({id});
    console.log(id,email)
   };
   const handleConfirmUpdate = async () => {
    await deleteUser({id,email:input});
    console.log(id,email)
   };


return(
  <div>
    <Box>
    <PostJsonDetail id={id} />
       <div>{isEditing?<EditUserForm id={id} email={email}/>: 
    <div> 
      <div>{email}</div>
      <Button
                onClick={() => setIsEditing(true)}
                disabled={isDeleting || isUpdating}
              >
                {isUpdating ? 'Updating...' : 'Edit1'}
              </Button>
              <Button onClick={() => handleConfirmDelete(id)}
                disabled={isDeleting}
                
              >
                {isDeleting ? 'Deleting...' : 'Delete2'}
              </Button></div>
              }</div>
    {/* <ButtonGroup>
      <Button onClick={EditSection}>Edit</Button>
      <Button onClick={DeleteSection}>Delete</Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button onClick={handleUpdate}>Update</Button>
      <Button onClick={handleCancel}>Cancel_Update</Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button onClick={handleCancel}>Delete</Button>
      <Button>Cancel_delete</Button>
    </ButtonGroup> */}
    </Box>
    
  </div>
)
  
};
