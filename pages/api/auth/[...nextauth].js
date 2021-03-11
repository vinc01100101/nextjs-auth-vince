import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    Provider.GitHub({
      clientId: "",
      clientSecret: "",
    }),
    Provider.Twitter({
      clientId: "",
      clientSecret: "",
    }),
    Provider.Email({
      server: "",
      host: "",
      port: "",
      auth: {
        user: "",
        pass: "",
      },
      from: "",
    }),
  ],
};
