import { Box, Button, ButtonGroup, Input } from '@mui/material'
import React, { useState } from 'react'



export const EditUserForm: React.FC<{email: string, onUpdate: (email: string) => void, onCancel: () => void, isLoading?: boolean  }> = ( {email, onUpdate, onCancel, isLoading } ) => {

  const [username, setUsername] = useState(email)

  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => setUsername(value)

  const handleUpdate = () => onUpdate(username)
  const handleCancel = () => onCancel()

 
  return (
    <Box><Input value={username} onChange={handleChange} disabled={isLoading}/>
    <ButtonGroup>
    <Button onClick={handleUpdate} >confirm</Button>
    <Button onClick={handleCancel} disabled={isLoading}>cancel</Button>
    </ButtonGroup>
    </Box>
    
  )
}




