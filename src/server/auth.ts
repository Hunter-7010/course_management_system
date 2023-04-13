import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  // Include user.id on session
  secret: "supersecrethz",
  callbacks: {},
  session: { strategy: "jwt", maxAge: 86400 * 360 },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        userName: { label: "Username", type: "text", placeholder: "UserName" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const user = await prisma.user.findUnique({
          where: { name: credentials?.userName },
        });
       
        const users = {
          id: "1",
          name: user?.name,
          image: user?.id,
          email: user?.role as string,
        };
        const { userName, password } = credentials as {
          userName: string;
          password: string;
        };
      
        
        const isPasswordCorrectUser = user && await bcrypt.compare( //eslint-disable-line
          password,
          user.password
        );
       
        if (userName === user?.name && isPasswordCorrectUser) {
          // Any object returned will be saved in `user` property of the JWT
          return users;
        }  else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  pages: {
    signIn: "/dashboard/signin",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
