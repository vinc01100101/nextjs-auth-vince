import { useState } from "react";
import { useSession } from "next-auth/client";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Button,
  Typography,
  Container,
  Paper,
} from "@material-ui/core";

import { csrfToken, signIn } from "next-auth/client";
import { makeStyles } from "@material-ui/core/styles";

/*
 * import formStyles::
 * custom styles for forms; used in /login and /register page
 * form format:
 * <Container>
 *  <Paper>
 *    <form>
 *    </form>
 *  </Paper>
 * </Container
 */
import formStyles from "@/theme/formStyles";

const useStyles = makeStyles({
  errMsg: {
    color: "red",
  },
  separator: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    width: 300,

    "&::after , &::before": {
      content: "''",
      flex: 1,
      borderTop: "3px solid #000",
    },
  },
  ...formStyles,
});

export default function SignIn({ csrfToken, error }) {
  const classes = useStyles();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [session, loading] = useSession();
  if (!loading && !session) {
    //if no active session, do these..
    const handleChange = (e) => {
      const id = e.target.id;
      const value = e.target.value;
      setInputs(() => {
        return { ...inputs, [id]: value };
      });
    };

    return (
      <Container className={classes.container}>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h1">Login</Typography>
          {error == "Database_error" && (
            <Typography variant="subtitle2" className={classes.errMsg}>
              Database error, please try again.
            </Typography>
          )}
          <form
            method="post"
            action="/api/auth/callback/credentials"
            className={classes.form}
          >
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <br />
            <FormControl>
              <InputLabel htmlFor="email">E-mail</InputLabel>
              <Input
                required
                name="email"
                type="email"
                id="email"
                value={inputs.username}
                onChange={handleChange}
                aria-describedby="username-helper"
                error={error == "Incorrect_email"}
              />
              {error == "Incorrect_email" && (
                <FormHelperText error id="username-helper">
                  Incorrect email
                </FormHelperText>
              )}
            </FormControl>
            <br />
            <FormControl>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                required
                name="password"
                type="password"
                id="password"
                value={inputs.password}
                onChange={handleChange}
                aria-describedby="password-helper"
                error={error == "Incorrect_password"}
              />
              {error == "Incorrect_password" && (
                <FormHelperText error id="password-helper">
                  Incorrect password
                </FormHelperText>
              )}
            </FormControl>
            <br />
            <Button type="submit" color="primary" variant="contained">
              Submit
            </Button>
          </form>
          <div className={classes.separator}>OR</div>
          <Button variant="outlined" onClick={() => signIn("github")}>
            Sign in with GitHub
          </Button>
        </Paper>
      </Container>
    );
  } else if (!loading && session) {
    //if the browser has active session (user is authorized),
    //redirect to homepage
    return (window.location.href = "/");
  }
  return <h3>Loading..</h3>;
}

SignIn.getInitialProps = async (context) => {
  // console.log(context);
  return {
    csrfToken: await csrfToken(context),
    error: context.query.error,
  };
};
