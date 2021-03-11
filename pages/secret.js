// import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";

const Secret = () => {
  // const [content, setContent] = useState();
  const [session, loading] = useSession();

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
        </main>
      </div>
    );
  }
  return (
    <div>
      <main>
        <h1>The Secret Page</h1>
        <p>Welcome to the secret page! :D</p>
      </main>
    </div>
  );
};
export default Secret;
