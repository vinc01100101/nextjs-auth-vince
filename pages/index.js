import UseStateUseEffect from "../components/UseStateUseEffect";
import homStyles from "../styles/Home.module.css";
import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const home = () => {
  const [session, loading] = useSession();
  session && console.log(session.user);
  return (
    <div>
      <Typography variant="h1">Home Page</Typography>

      {/* <div className={homStyles.card}>
        <UseStateUseEffect />
      </div> */}
      <main>
        {!session && (
          <>
            Not signed in <br />
            <Button variant="contained" color="primary" onClick={signIn}>
              Sign in
            </Button>
          </>
        )}
        {session && (
          <>
            <Typography variant="h2">
              Signed in as {session.user.name}
            </Typography>
            <Typography variant="h4">{session.user.email}</Typography>

            <img src={session.user.image} />
            <br />
            <div>Private pages are now available</div>
            <Button onClick={signOut} variant="contained" color="primary">
              Sign out
            </Button>
          </>
        )}
        <br />
        <Button variant="contained" color="secondary">
          <Link href="/secret">
            GO TO PRIVATE ROUTE (something like /profile)
          </Link>
        </Button>
      </main>
    </div>
  );
};

export default home;
