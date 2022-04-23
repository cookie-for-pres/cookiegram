import type { NextPage } from 'next';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import axios from 'axios';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';

import MetaData from '../components/MetaData';
import StartNavbar from '../components/StartNavbar';

import withPublic from '../hooks/withPublic';

const PrimaryLink = styled.a`
  color: #805AD5;
`;

const Signin: NextPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const toast = useToast();
  const router = useRouter();

  const signin = async () => {
    try {
      const { data } = await axios.post('/api/signin', {
        username,
        password
      });
  
      const { message, success } = data;
  
      if (success) {
        toast({
          title: 'Successfully signed in',
          description: "You have successfully signed in to your account.",
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: 'top-right',
        });
  
        localStorage.setItem('token', data.token);
  
        setTimeout(() => {
          router.push('/dashboard');
        }, 5000);
      }
    } catch (error: any) {
      const data = error.response.data;

      if (data.message) {
        toast({
          title: 'Error',
          description: data.message.charAt(0).toUpperCase() + data.message.slice(1) + '.',
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'top-right',
        });
      } else {
        toast({
          title: 'Error',
          description: 'An unknown error has occurred.',
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'top-right',
        });
      }
    }
  };

  return (
    <>
      <MetaData title='Sign in' />
      <style>{`overflow-y: hidden;`}</style>

      <StartNavbar />

      <Flex minH={'75vh'} align={'center'} justify={'center'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box rounded={'lg'} bg={'#1a1a1a'} boxShadow={'lg'} p={8}>
            <Stack spacing={4}>
              <FormControl id='email'>
                <FormLabel>Email address or username</FormLabel>
                <Input 
                  type='text' 
                  style={{ border: '1px solid #805AD5' }} 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl id='password'>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    style={{ border: '1px solid #805AD5' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      bg='transparent'
                      color={showPassword ? '#805AD5' : 'gray.600'}
                      _hover={{ bg: 'transparent' }}
                      _active={{ bg: 'transparent' }}
                      _focus={{ bg: 'transparent' }}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Link href='forgot-password' passHref>
                    <PrimaryLink>Forgot password?</PrimaryLink>
                  </Link>
                </Stack>
                <Button onClick={signin} variant={'primary'}>Sign in</Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  {'Don\'t '}have an account?{' '}
                  <Link href='signup' passHref>
                    <PrimaryLink>Sign up</PrimaryLink>
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default withPublic(Signin);