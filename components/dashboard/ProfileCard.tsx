import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import {
  Heading,
  Avatar,
  Box,
  Center,
  Flex,
  Text,
  Stack,
  Button,
  Tooltip
} from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const getBadges = (badges: string[]): JSX.Element[] => {
  let badgeList: JSX.Element[] = [];
  
  badges.forEach((badge, i) => {
    if (badge === 'owner') {
      const item = (
        <>
          <Tooltip label="Owner">
            <i
              className='fa-solid fa-crown'
              style={{ color: 'var(--gold)', fontSize: '1.35rem' }}
              key={i}
            />
          </Tooltip>
        </>
      );

      badgeList.push(item);
    } else if (badge === 'beta tester') {
      const item = (
        <Tooltip label="Beta Tester">
          <i 
            className='fa-solid fa-vial' 
            style={{ color: 'var(--primary)', fontSize: '1.35rem' }}
            key={i}
          />
        </Tooltip>
      );

      badgeList.push(item);
    } else if (badge === 'admin') {
      const item = (
        <Tooltip label="Admin">
          <i 
            className='fa-solid fa-user-shield' 
            style={{ color: 'var(--red)', fontSize: '1.35rem' }}
            key={i}
          />
        </Tooltip>
      );

      badgeList.push(item);
    }
  });

  return badgeList;
}

const ProfileCard: NextPage = ({
  username,
  bio,
  avatar,
  followers,
  following
}: any) => {
  const [badges, setBadges] = useState([]);
  
  const cookie = new Cookies();

  useEffect(() => {
    const token = cookie.get('token');
    axios.get('/api/badges', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      const { success, badges: bd } = res.data;
      
      if (success) {
        // @ts-ignore
        setBadges(getBadges(bd));
      }
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <>
      <Center>
        <Box
          maxW={'270px'}
          w={'full'}
          bg={'blackish'}
          boxShadow={'lg'}
          rounded={'md'}
          overflow={'hidden'}
        >
          <Flex justify={'center'} mt={12}>
            <Avatar
              size={'xl'}
              src={avatar}
              p={1}
              css={{
                border: '2px solid var(--primary)',
                backgroundColor: 'transparent',
              }}
            />
          </Flex>

          <Box p={6}>
            <Stack spacing={0} align={'center'} mb={5}>
              <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                <p>
                  @{username}{' '}
                  
                  {
                    badges.length > 0 && (
                      badges.map((badge: any) => badge)
                    )
                  }
                </p>
              </Heading>
              <Text color={'gray.500'}>{bio}</Text>
            </Stack>

            <Stack direction={'row'} justify={'center'} spacing={6}>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>{followers}</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  Followers
                </Text>
              </Stack>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>{following}</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  Followers
                </Text>
              </Stack>
            </Stack>

            <Button disabled w={'full'} mt={8} variant={'primary'} rounded={'md'}>
              View Profile
            </Button>
          </Box>
        </Box>
      </Center>
    </>
  );
};

export default ProfileCard;
