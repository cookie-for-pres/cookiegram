import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider, DarkMode, GlobalStyle, extendTheme } from '@chakra-ui/react';
import ButtonStyles from '../styles/components/buttonStyles';

const theme = extendTheme({
  colors: {
    primary: '#805AD5',
    black: '#121212',
  },
  styles: {
    global: {
      body: {
        backgroundColor: 'black',
        color: 'whiteAlpha.900'
      }
    }
  },
  components: {
    Button: ButtonStyles
  }
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // @ts-ignore
    <DarkMode>
      <GlobalStyle />
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </DarkMode>
  );
};

export default MyApp;