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
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles({
  nav: {
    position: "fixed",
  },
  db: {
    justifySelf: "flex-end",
    color: "black",
  },
  hr: {
    height: 30,
  },
  list: {
    width: 250,
  },
  scode: {
    background: "black",
  },
  scodetext: {
    color: "red",
  },
});
const Nav = () => {
  //check if there's an active session
  const [session] = useSession();
  const classes = useStyles();

  //database status
  const [isConnected, setIsConnected] = useState("connecting..");

  //drawer
  const [isOpen, setIsOpen] = useState(false);

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

  //get the list
  const list = () => {
    return (
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam", "Go To Source Code =>"].map(
            (text, index) => (
              <ListItem
                button
                key={text}
                className={text == "Go To Source Code =>" && classes.scode}
              >
                {text == "Go To Source Code =>" ? (
                  <a
                    href="https://github.com/vinc01100101/nextjs-auth-vince"
                    target="_blank"
                    className={classes.scodetext}
                  >
                    {text}
                  </a>
                ) : (
                  <ListItemText primary={text} />
                )}
              </ListItem>
            )
          )}
        </List>
      </div>
    );
  };
  //toggle drawer show/hide
  const toggleDrawer = (bool) => (event) => {
    // if (
    //   event.type === "keydown" &&
    //   (event.key === "Tab" || event.key === "Shift")
    // ) {
    //   return;
    // }
    setIsOpen(bool);
  };
  return (
    <AppBar className={classes.nav}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
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
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        transitionDuration={{ enter: 500, exit: 500 }}
      >
        {list()}
      </Drawer>
    </AppBar>
  );
};

export default Nav;
