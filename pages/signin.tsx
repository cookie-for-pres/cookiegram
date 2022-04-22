import type { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

import MetaData from '../components/MetaData';
import StartNavbar from '../components/StartNavbar';

const Signin: NextPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <MetaData title='Sign in' />

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
                <FormLabel>Email address</FormLabel>
                <Input type='email' style={{ border: '1px solid #805AD5' }} />
              </FormControl>
              <FormControl id='password'>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    style={{ border: '1px solid #805AD5' }}
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
                  <Link href='forgot-password' color={'primary'}>
                    Forgot password?
                  </Link>
                </Stack>
                <Button variant={'primary'}>Sign in</Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Signin;
