import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';
import axios from 'axios';

import MetaData from '../components/MetaData';
import Navbar from '../components/Navbar';
import NewPost from '../components/dashboard/NewPost';
import ProfileCard from '../components/dashboard/ProfileCard';

import withAuth from '../hooks/withAuth';

const Dashboard: NextPage = () => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [badges, setBadges] = useState([]);
  const [posts, setPosts] = useState([]);

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
        const { username, bio, avatar, followers, following, badges: bd } = res.data.data;

        setUsername(username);
        setBio(bio);
        setAvatar(avatar);
        setFollowers(followers);
        setFollowing(following);
        setBadges(bd);
      }
    }).catch((err: any) => {
      const { message } = err.response.data;

      if (message === 'invalid token' || message === 'cant find account' || message === 'unauthorized') {
        cookie.remove('token');
        router.push('/signin');
      } else {
        console.log(err);
      }
    });
  }, []);

  return (
    <>
      <MetaData title='Dashboard' />
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

      <Navbar />
      
      <Box p={12}>
        <div className='grid grid-cols-5 gap-6'>
          <div className='col-span-4'>
            <NewPost />
          </div>
          <div>
            <ProfileCard 
              // @ts-ignore 
              username={username}
              bio={bio}
              avatar={avatar}
              followers={followers}
              following={following}
              badges={badges}
              setBadges={setBadges}
            />
          </div>
        </div>
      </Box>
    </>
  );
};

export default withAuth(Dashboard);