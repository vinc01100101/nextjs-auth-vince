import "../styles/globals.css";
import Layout from "../components/Layout";

//used to pass the session props all over the pages by wrapping this app
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
