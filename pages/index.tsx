import type { NextPage } from 'next';
import Head from 'next/head';
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
  useColorModeValue,
} from '@chakra-ui/react';

import MetaData from '../components/MetaData';
import StartNavbar from '../components/StartNavbar';

const Home: NextPage = () => {
  return (
    <div>
      <MetaData title='Home' />

      <StartNavbar />
    </div>
  )
}

export default Home
