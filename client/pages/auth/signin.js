import { useState } from 'react';
import { useRouter } from 'next/router';
import useRequest from '../../hooks/useRequest';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, getErrorList, getFieldError, isValidField } = useRequest({
    url: '/api/users/signin',
    method: 'POST',
    data: { email, password },
    onSuccess: () => router.push('/'),
  });
  const router = useRouter();

  const handleSubmit = async event => {
    event.preventDefault();

    doRequest();
  };

  return (
    <>
      <h1>Sign In</h1>
      <form
        className='needs-validation'
        onSubmit={handleSubmit}
        noValidate
      >
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            id='email'
            type='email'
            className={`form-control${isValidField('email')}`}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {getFieldError('email')}
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            className={`form-control${isValidField('password')}`}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {getFieldError('password')}
        </div>

        {getErrorList()}

        <button className='btn btn-primary mt-2'>Sign In</button>
      </form>
    </>
  );
};

export default SignInPage;
