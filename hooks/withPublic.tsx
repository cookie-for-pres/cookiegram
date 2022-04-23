import { NextComponentType } from 'next';
import { useRouter } from 'next/router';

const withPublic = (Component: NextComponentType) => {
  const Auth = (props: any) => {
    const router = useRouter();
    let token: any;

    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');

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