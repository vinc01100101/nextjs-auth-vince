import UseStateUseEffect from "../components/UseStateUseEffect";
import homStyles from "../styles/Home.module.css";
import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";

const home = () => {
  const [session, loading] = useSession();
  session && console.log(session.user);
  return (
    <div>
      Home Page
      <div className={homStyles.card}>
        <UseStateUseEffect />
      </div>
      <main>
        {!session && (
          <>
            Not signed in <br />
            <button onClick={signIn}>Sign in</button>
          </>
        )}
        {session && (
          <>
            Signed in as {session.user.name}
            <br />
            {session.user.email}
            <br />
            <img src={session.user.image} />
            <br />
            <div>Private pages are now available</div>
            <button onClick={signOut}>Sign out</button>
          </>
        )}
        <br />
        <button>
          <Link href="/secret">To the secret page!</Link>
        </button>
      </main>
    </div>
  );
};

export default home;
