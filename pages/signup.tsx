import type { NextPage } from 'next';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/router'
import styled from 'styled-components';
import axios from 'axios';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useToast
} from '@chakra-ui/react';

import MetaData from '../components/MetaData';
import StartNavbar from '../components/StartNavbar';

import withPublic from '../hooks/withPublic';

const PrimaryLink = styled.a`
  color: #805AD5;
`;

const Signup: NextPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const toast = useToast();
  const router = useRouter();

  const signup = async () => {
    try {
      const { data } = await axios.post('/api/signup', {
        firstName,
        lastName,
        username,
        email,
        password
      });
  
      const { message, success } = data;
  
      if (success) {
        toast({
          title: 'Account created',
          description: "We've successfully created an account for you.",
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: 'top-right',
        });
  
        setTimeout(() => {
          router.push('/signin');
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
      <MetaData title='Sign up' />
      <style>
        {
          `body {
            overflow-y: hidden;
          }
          
          @media only screen and (max-width: 600px) {
            body {
              overflow-y: auto;
            }
          }`
        }
      </style>

      <StartNavbar />

      <Flex minH={'75vh'} align={'center'} justify={'center'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box rounded={'lg'} bg={'#1a1a1a'} boxShadow={'lg'} p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id='firstName'>
                    <FormLabel>First name</FormLabel>
                    <Input
                      type='text'
                      style={{ border: '1px solid #805AD5' }}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id='lastName'>
                    <FormLabel>Last name</FormLabel>
                    <Input
                      type='text'
                      style={{ border: '1px solid #805AD5' }}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id='username' isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type='username'
                  style={{ border: '1px solid #805AD5' }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl id='email' isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type='email'
                  style={{ border: '1px solid #805AD5' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id='password' isRequired>
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
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText='Submitting'
                  size='lg'
                  variant={'primary'}
                  onClick={signup}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user?{' '}
                  <Link href='signin' passHref>
                    <PrimaryLink>Sign in</PrimaryLink>
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

export default withPublic(Signup);
