import Link from "next/link";
import { Button, Typography } from "@material-ui/core";

const home = () => {
  return (
    <div>
      <Typography variant="h1">Home Page</Typography>

      <main>
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
