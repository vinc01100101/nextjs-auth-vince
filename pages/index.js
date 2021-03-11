import UseStateUseEffect from "../components/UseStateUseEffect";
import homStyles from "../styles/Home.module.css";
import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";

const home = () => {
  const [session, loading] = useSession();

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
            Signed in as {session.user.email}
            <br />
            <div>Private pages are now available</div>
            <button onClick={signOut}>Sign out</button>
          </>
        )}
      </main>
    </div>
  );
};

export default home;
