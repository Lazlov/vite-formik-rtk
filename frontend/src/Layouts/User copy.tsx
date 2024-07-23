import React, { useState } from "react";
import {
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../Services/Users/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Box, ButtonGroup, Input, ListItem } from "@mui/material";
import { Delete } from "@mui/icons-material";

import Grid from "@mui/material/Unstable_Grid2";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAppDispatch } from "../Services/hooks";

import { useDispatch } from "react-redux";
import { authApiSlice, useLoginMutation } from "../Services/Auth/authApiSlice";
import { tokenReceived } from "../Services/Auth/authSlice";
import LoadingButton from "@mui/lab/LoadingButton";
import { EditUserForm } from "./EditUserForm";

export const User: React.FC<{ id: string; email: string }> = ({
  id,
  email,
}) => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useGetUsersQuery(id);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  // const [input, setInput] = useState(email);
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div>
        User {id} is missing! Try reloading or selecting another user...
      </div>
    );
  }


  return (
    
      <ListItem>
       
       
          {isEditing ? (
            <EditUserForm
              email={email}
              onUpdate={async (value) => {
                try{await updateUser({ id, email:value }).unwrap();}
                catch {
                  console.log('An error occurred')
                 
                } 
                finally{setIsEditing(false);}
              }}
              onCancel={() => setIsEditing(false)}
              isLoading={isUpdating}
            />
          ) : (
            <ButtonGroup>
              <div>{email}</div>
              <Button
                onClick={() => setIsEditing(true)}
                disabled={isDeleting || isUpdating}
              >
                {isUpdating ? "Updating..." : "Edit1"}
              </Button>
              <Button
                onClick={() => deleteUser(id).then(() => navigate('d/users'))}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete2"}
              </Button>
            </ButtonGroup>
          )}
       
      </ListItem>
   
  );
};
