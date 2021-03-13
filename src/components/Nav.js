import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import {
  AppBar,
  Avatar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";

const useStyles = makeStyles({
  nav: {
    position: "fixed",
  },
  db: {
    justifySelf: "flex-end",
    color: "#70e35c",
  },
  hr: {
    height: 30,
  },
});
const Nav = () => {
  //check if there's an active session
  const [session] = useSession();
  const classes = useStyles();

  //database status
  const [isConnected, setIsConnected] = useState("connecting..");

  //connect database
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("/api/initiate-connection");
      const status = await res.json();
      setIsConnected(status.status);
      //refetch if still connecting to get the updated status
      if (status.status == "connecting") {
        setTimeout(fetcher, 5000);
      }
    };
    fetcher();
  }, []);

  return (
    <AppBar className={classes.nav}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
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
        {session ? (
          <Button color="inherit" onClick={signOut}>
            Logout
          </Button>
        ) : (
          <Link href="/login">
            <a>
              <Button color="inherit">Login</Button>
            </a>
          </Link>
        )}
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
