import { useState } from "react";
import { useSession } from "next-auth/client";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Button,
} from "@material-ui/core";

const RegistrationForm = () => {
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
      <form action="/api/register" method="POST">
        <FormControl>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
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
            name="email"
            type="email"
            id="email"
            value={inputs.username}
            onChange={handleChange}
            aria-describedby="username-helper"
          />
          <FormHelperText id="username-helper">
            This will be used for logging in.
          </FormHelperText>
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
    );
  } else if (!loading && session) {
    //if the browser has active session (user is authorized),
    //redirect to homepage
    return (window.location.href = "/");
  }
  return <h3>Loading..</h3>;
};

export default RegistrationForm;
