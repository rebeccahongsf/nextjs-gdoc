import React, { useEffect, useState } from 'react';
import { Chat } from '../components/Chat';
import { useSession, signIn, signOut } from 'next-auth/react';

const Home = () => {
  const { data: session, status } = useSession();
  const userEmail = session?.user.email;

  if (status === 'loading') {
    return <p>Hang on there...</p>;
  }
  if (status === 'authenticated') {
    return (
      <>
        <p>Signed in as {userEmail}</p>
        <button onClick={() => signOut()}>Sign out</button>

        <div>
          <h1>Chat app</h1>
          <Chat username={session?.user.name} />
        </div>
      </>
    );
  }

  return (
    <>
      <p>Not signed in.</p>
      <button onClick={() => signIn('google')}>Sign in</button>
    </>
  );
};

export default Home;
