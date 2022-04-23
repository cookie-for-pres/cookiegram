import type { NextPage } from 'next';
import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';

const NewPost: NextPage = () => {
  const [message, setMessage] = useState('');

  return (
    <>
      <Box bg={'blackish'} w={'full'} boxShadow={'lg'} rounded={'md'} p={6}>
        <FormControl id='message'>
          <FormLabel>Message</FormLabel>
          <Textarea
            placeholder='Let us know something...'
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            style={{ border: '1px solid #805AD5' }}
          />
        </FormControl>
        <Button
          variant={'primary'}
          mt={4}
          onClick={() => {}}
          rightIcon={<i className="fa-solid fa-paper-plane" />}
          disabled
        >
          Post
        </Button>
      </Box>
    </>
  );
};

export default NewPost;