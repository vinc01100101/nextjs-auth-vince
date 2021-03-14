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
  successMessage: { color: "green" },
  ...formStyles,
});
const RegistrationForm = ({ message }) => {
  const classes = useStyles();

  const [inputs, setInputs] = useState({
    name: "",
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
          <Typography variant="h1">Register</Typography>
          <form action="/api/register" method="POST" className={classes.form}>
            {message == "success" && (
              <Typography variant="h5" className={classes.successMessage}>
                Registration successful
              </Typography>
            )}
            <FormControl>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                required
                name="name"
                type="text"
                id="name"
                value={inputs.name}
                onChange={handleChange}
              />
            </FormControl>
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
              />
              <FormHelperText
                id="username-helper"
                error={message == "email_already_exists"}
              >
                {message == "email_already_exists"
                  ? "Email already exists"
                  : "This will be used for logging in."}
              </FormHelperText>
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
              />
            </FormControl>
            <br />
            <Button type="submit" color="primary" variant="contained">
              Submit
            </Button>
          </form>
        </Paper>
      </Container>
    );
  } else if (!loading && session) {
    //if the browser has active session (user is authorized),
    //redirect to homepage
    return (window.location.href = "/");
  }
  return <h3>Loading..</h3>;
};

export const getServerSideProps = async (context) => {
  return {
    props: {
      message: context.query.message || null,
    },
  };
};
export default RegistrationForm;
