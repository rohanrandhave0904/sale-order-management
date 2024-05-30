import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (data.username === 'admin' && data.password === 'admin') {
      localStorage.setItem('auth', 'true');
      navigate('/orders');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt="10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input type="text" {...register('username')} />
        </FormControl>
        <FormControl mt="4">
          <FormLabel>Password</FormLabel>
          <Input type="password" {...register('password')} />
        </FormControl>
        <Button mt="4" colorScheme="teal" type="submit">Login</Button>
      </form>
    </Box>
  );
};

export default Login;