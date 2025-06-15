import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createUser, getUser } from "./data-service";

const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        // console.log(user);
        const isEmailExist = await getUser(user.email);

        if (!isEmailExist)
          await createUser({
            email: user.email,
            name: user.name,
            googleId: user.id,
          });

        return true;
      } catch (error) {
        console.log("Sign-in error:", error);
        return false;
      }
    },
    async session({ session }) {
      const user = await getUser(session.user.email);
      if (user) {
        session.user.id = user.googleId;
      }
      return session;
    },
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
