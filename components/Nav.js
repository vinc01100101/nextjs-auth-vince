import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Avatar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  MenuIcon,
} from "@material-ui/core";

const useStyles = makeStyles({
  nav: {
    position: "fixed",
  },
  db: {
    justifySelf: "flex-end",
    color: "#70e35c",
  },
});
const Nav = () => {
  //check if there's an active session
  const [session, loading] = useSession();
  const classes = useStyles();

  //database status
  const [isConnected, setIsConnected] = useState(
    "Database status: disconnected"
  );

  //connect database
  useEffect(async () => {
    const res = await fetch("/api/initiate-connection");
    const status = await res.json();
    setIsConnected(status.status);
  }, []);

  return (
    <AppBar className={classes.nav}>
      <Toolbar>
        <Link href="/">
          <a>
            <Button color="inherit">Home</Button>
          </a>
        </Link>
        <Link href="/about">
          <a>
            <Button color="inherit">About</Button>
          </a>
        </Link>
        <Button color="inherit" onClick={session ? signOut : signIn}>
          {session ? "Log out" : "Log in"}
        </Button>
        {session ? (
          <>
            <Avatar src={session.user.image} />
            <Typography variant="subtitle1">
              {session.user.name}
              <br />
              {session.user.email}
            </Typography>
          </>
        ) : (
          <Link href="/register">
            <Button color="inherit">Register</Button>
          </Link>
        )}
        <Typography variant="subtitle1" className={classes.db}>
          {"Database status: " + isConnected}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
