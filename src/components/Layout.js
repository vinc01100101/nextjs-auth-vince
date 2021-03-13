import Nav from "./Nav";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  pTop: {
    paddingTop: "70px",
  },
});
const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <div>
      <Nav />
      <div className={classes.pTop}>{children}</div>
    </div>
  );
};

export default Layout;
