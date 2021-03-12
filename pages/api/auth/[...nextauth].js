import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import User from "../../../models/User";

const development = process.env.NODE_ENV;

const {
  GITHUB_ID,
  GITHUB_SECRET,
  DEV_GITHUB_ID,
  DEV_GITHUB_SECRET,
} = process.env;

const options = {
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
          // submitted and returns either a object representing a user or value
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
          return null;
        }
      },
    }),
    Providers.GitHub({
      clientId: !development ? GITHUB_ID : DEV_GITHUB_ID,
      clientSecret: !development ? GITHUB_SECRET : DEV_GITHUB_SECRET,
    }),

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
