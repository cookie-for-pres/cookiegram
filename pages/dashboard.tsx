import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Flex, Heading, Stack } from '@chakra-ui/react';
import Cookies from 'universal-cookie';

import MetaData from '../components/MetaData';

import withAuth from '../hooks/withAuth';

const Dashboard: NextPage = () => {
  const [username, setUsername] = useState('');

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

      if (data.message) {
        console.log(data.message);
      }
    });
  }, [])

  return (
    <>
      <MetaData title='Dashboard' />
      
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