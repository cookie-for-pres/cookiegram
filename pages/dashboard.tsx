import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { Flex, Heading, Stack, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'universal-cookie';

import MetaData from '../components/MetaData';
import Navbar from '../components/Navbar';

import withAuth from '../hooks/withAuth';

const Dashboard: NextPage = () => {
  const [username, setUsername] = useState('');

  const router = useRouter();
  const cookie = new Cookies();

  useEffect(() => {
    const token = cookie.get('token');
    axios.get('/api/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      const { success } = res.data;

      if (success) {
        const { username } = res.data.data;
        setUsername(username);
      }
    }).catch((err: any) => {
      const data = err.response.data;

      cookie.remove('token');
      router.push('/signin');

      if (data.message) {
        console.log(data.message);
      }
    });
  }, []);

  return (
    <>
      <MetaData title='Dashboard' />

      <Navbar />
      
      <Flex
        minH={'75vh'}
        align={'center'} 
        justify={'center'}
      >
        <Stack spacing={3} align={'center'}>
          <Heading as='h1' size='xl'>Welcome <span style={{ color: 'var(--primary)'}}>{username}</span>!</Heading>
          <p style={{ fontSize: '20px' }}>
            Cookie<span style={{ color: 'var(--primary)'}}>Gram</span> is currently in development and should be released soon!
          </p>
        </Stack>
      </Flex>
    </>
  );
};

export default withAuth(Dashboard);