import { useState } from "react";
import { useSession } from "next-auth/client";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Button,
  Typography,
} from "@material-ui/core";

import { csrfToken, signIn } from "next-auth/client";
import { makeStyles } from "@material-ui/core/styles";

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
      <div>
        {error == "CredentialsSignin" && (
          <Typography variant="subtitle2" className={classes.errMsg}>
            Invalid Email or Password
          </Typography>
        )}
        <form method="post" action="/api/auth/callback/credentials">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <br />
          <FormControl>
            <InputLabel htmlFor="email">E-mail</InputLabel>
            <Input
              name="email"
              type="email"
              id="email"
              value={inputs.username}
              onChange={handleChange}
              aria-describedby="username-helper"
            />
            <FormHelperText id="username-helper"></FormHelperText>
          </FormControl>
          <br />
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              value={inputs.password}
              onChange={handleChange}
            />
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
      </div>
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
