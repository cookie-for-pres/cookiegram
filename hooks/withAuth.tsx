import { NextComponentType } from 'next';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';

const withAuth = (Component: NextComponentType) => {
  const Auth = (props: any) => {
    const router = useRouter();
    const cookie = new Cookies();
    let token: any;

    if (typeof window !== 'undefined') {
      token = cookie.get('token');

      if (!token) {
        router.push('/signin');
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

export default withAuth;