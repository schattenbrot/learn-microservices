import { useEffect } from 'react';
import useRequest from '../../hooks/useRequest';
import { useRouter } from 'next/router';

const SignOutPage = () => {
  const router = useRouter();

  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'POST',
    data: {},
    onSuccess: () => router.push('/'),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return <h1>Signing you out ...</h1>;
};

export default SignOutPage;
