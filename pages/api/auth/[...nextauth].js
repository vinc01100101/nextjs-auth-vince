import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import User from "@/models/User";

//returns "production" if deployed in prod
const development = process.env.NODE_ENV;

//used localhost as callback in development mode
const {
  GITHUB_ID,
  GITHUB_SECRET,
  DEV_GITHUB_ID,
  DEV_GITHUB_SECRET,
} = process.env;

const options = {
  pages: {
    signIn: "/login",
    signOut: "/login",
    // error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: "/", // If set, new users will be directed here on first sign in
  },
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@provider.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const findUser = (credentials) => {
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either an object representing a user or value
          // that is false/null if the credentials are invalid.
          // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }

          return new Promise((resolve, reject) => {
            User.findOne({ email: credentials.email }, (err, data) => {
              if (err) return reject({ type: "error", message: err });
              if (!data)
                return reject({ type: "failed", message: "No user found" });
              if (!(data.password === credentials.password))
                return reject({ type: "failed", message: "Wrong password" });
              return resolve(data);
            });
          });
        };
        // Any user object returned here will be saved in the JSON Web Token

        try {
          const user = await findUser(credentials);
          return user;
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
    Providers.GitHub({
      clientId: !development ? GITHUB_ID : DEV_GITHUB_ID,
      clientSecret: !development ? GITHUB_SECRET : DEV_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    /**
     * Use the signIn() callback to control if a user is allowed to sign in.
     *
     * @param  {object} user     User object
     * @param  {object} account  Provider account
     * @param  {object} profile  Provider profile
     * @return {boolean|string}  Return `true` to allow sign in
     *                           Return `false` to deny access
     *                           Return `string` to redirect to (eg.: "/unauthorized")
     */
    async signIn(user, account, profile) {
      console.log("SIGNING IN: " + JSON.stringify(user));
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },

    /**
     * The redirect callback is called anytime the user is redirected to a callback URL (e.g. on signin or signout).
     * By default only URLs on the same URL as the site are allowed, you can use the redirect callback to customise that behaviour.
     *
     * @param  {string} url      URL provided as callback URL by the client
     * @param  {string} baseUrl  Default base URL of site (can be used as fallback)
     * @return {string}          URL the client will be redirect to
     */
    async redirect(url, baseUrl) {
      //this also prevents stacking the url with previous queries
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
