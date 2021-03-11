// import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    width: 250,
  },
  gridItem: {
    marginBottom: 30,
  },
  span: {
    color: "green",
  },
});
const Secret = ({ items }) => {
  // const [content, setContent] = useState();
  const [session, loading] = useSession();
  const classes = useStyles();
  // //this can also be done but we don't need this
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await fetch("/api/secret");
  //     const json = await data.json();

  //     if (json.content) setContent(json.content);
  //   };
  //   fetchData();
  // }, [session]);

  if (!session) {
    return (
      <div>
        <main>
          <h1>You need to login first :D</h1>
          <p>For authorized users only</p>
          <Link href="/">
            <Button variant="contained">Back</Button>
          </Link>
        </main>
      </div>
    );
  }
  console.log(items);
  return (
    <div>
      <main>
        <h1>The Private Page</h1>
        <p>Only available to authorized users</p>
        <h3>
          Data fetched from:{" "}
          <span className={classes.span}>
            http://jsonplaceholder.typicode.com/photos?_limit=20
          </span>
          <br />
          and generated at build time using getStaticProps()
        </h3>
        <Grid container>
          {items.map((item, i) => {
            return (
              <Grid item xs={3} key={i} className={classes.gridItem}>
                <Card className={classes.card}>
                  <CardMedia
                    component="img"
                    src={item.thumbnailUrl}
                    title="Paella dish"
                  />
                  <CardContent>
                    <Typography variant="subtitle2">{item.title}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Link href="/">
          <Button variant="contained">Back</Button>
        </Link>
      </main>
    </div>
  );
};
export default Secret;

export const getStaticProps = async () => {
  const res = await fetch(
    "http://jsonplaceholder.typicode.com/photos?_limit=20"
  );
  const items = await res.json();

  return {
    props: {
      items,
    },
  };
};
