import Link from "next/link";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles({
  nav: {
    position: "fixed",
  },
});
const Nav = () => {
  const classes = useStyles();

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
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
