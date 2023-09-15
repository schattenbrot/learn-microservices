import buildClient from '../api/buildClient';

const HomePage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

HomePage.getInitialProps = async ctx => {
  const client = buildClient(ctx);
  const { data } = await client.get('/api/users/currentuser');
  return data;
};

export default HomePage;
