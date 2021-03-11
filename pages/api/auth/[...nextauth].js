import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    // Providers.Credentials({
    //   // The name to display on the sign in form (e.g. 'Sign in with...')
    //   name: "Credentials",
    //   // The credentials is used to generate a suitable form on the sign in page.
    //   // You can specify whatever fields you are expecting to be submitted.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   credentials: {
    //     username: { label: "Username", type: "text", placeholder: "jsmith" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     const user = (credentials) => {
    //       // You need to provide your own logic here that takes the credentials
    //       // submitted and returns either a object representing a user or value
    //       // that is false/null if the credentials are invalid.
    //       // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
    //       return null;
    //     };
    //     if (user) {
    //       // Any user object returned here will be saved in the JSON Web Token
    //       return user;
    //     } else {
    //       return null;
    //     }
    //   },
    // }),

    // Provider.Twitter({
    //   clientId: "",
    //   clientSecret: "",
    // }),

    // Provider.Email({
    //   server: "",
    //   host: "",
    //   port: "",
    //   auth: {
    //     user: "",
    //     pass: "",
    //   },
    //   from: "",
    // }),
  ],
};

export default (req, res) => NextAuth(req, res, options);
