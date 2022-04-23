import { NextComponentType } from 'next';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';

const withPublic = (Component: NextComponentType) => {
  const Auth = (props: any) => {
    const router = useRouter();
    const cookie = new Cookies();
    let token: any;

    if (typeof window !== 'undefined') {
      token = cookie.get('token');

      if (token) {
        router.push('/dashboard');
        return null;
      }
  
      return (
        <Component {...props}  />
      );
    }
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withPublic;