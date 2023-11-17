import React, { useState } from "react";
import {
  useUpdateUserMutation,
  useDeleteUserMutation,
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



export const User: React.FC<{id:string, email: string }> = ( {id,email} ) => {
  const [editUser, setEditUser] = useState(false);
  const [removeUser, setRemoveUser] = useState(false);
  const [input, setInput] = useState(email);

 

  // {id,deletedUser}
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const navigate = useNavigate();

  // const EditableUser = ({
  //   user: initialName,
  //   onUpdate,
  //   onCancel,
  //   isLoading = false,
  // }: {
  //   user: string
  //   onUpdate: (user: string) => void
  //   onCancel: () => void
  //   isLoading?: boolean
  // }) => {
  //   const [user, setUser] = useState(initialName)
  // // const handleUpdate = async () =>{
  // //     try {
  // //       updateUser({id, data })

  // //     } catch (error) {

  // //     }
  // // }
  // const handleUpdate = () => navigate("/dash/users/userdid");
  // const handleDelete = () => navigate("/dash/users/userdid");
  const handleEdit = () => {
    setEditUser(!editUser);
  };
  const handleRemove = () => {
    setRemoveUser(!removeUser);
  };
  const handleConfirmDelete = async ({id:id}) => {
   await  updateUser({id});
   console.log(id,email)
  };
  const handleConfirmUpdate = async () => {
   await deleteUser({id,email:input});
   console.log(id,email)
  };

  const handleInput = () => {};
  return (
    <div>
      
      
{!editUser && <h2>{email}</h2> }
        
          {" "}
          {!removeUser && editUser && (
            <TextField
              type="text"
              value={email}
              onChange={handleInput}
            ></TextField>


          )}

<ButtonGroup>
       
          {!removeUser && !editUser && (
            <Button onClick={handleEdit}>edit</Button>
          )}
        

        <ButtonGroup variant="text" >
          {editUser && <Button onClick={handleConfirmUpdate}>confirm</Button>}
          {editUser && <Button onClick={handleEdit}>cancel</Button>}
        </ButtonGroup>
      

      
        {!editUser && !removeUser && (
          <Button onClick={handleRemove} startIcon={<Delete/>}>delete</Button>
        )}
        <ButtonGroup variant="text" >{removeUser && <Button onClick={handleConfirmDelete}>confirm</Button>}
        {removeUser && <Button onClick={handleRemove}>cancel</Button>}</ButtonGroup>
        
        
        </ButtonGroup>
     
    </div>
  );
};
