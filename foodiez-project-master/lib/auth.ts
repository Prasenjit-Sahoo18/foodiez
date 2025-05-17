import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "abc@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
      
        const existingUser = await prisma.user.findUnique({
          where: {
            email: credentials.email || undefined, // Ensure email is either a string or undefined
          },
        });
      
        if (!existingUser) {
          return null;
        }
      
        if (existingUser.password) {
          const passwordMatch = await bcrypt.compare(credentials.password, existingUser.password);
      
          if (!passwordMatch) {
            return null;
          }
        } else {
          return null;
        }
      
        return {
          id: `${existingUser.id}`,
          email: existingUser.email,
          username: existingUser.username || "Anonymous", // Provide a default value if username is null
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
      }
    
      // Link accounts if necessary
      if (account?.provider && user) {
        const existingUser = await prisma.user.findUnique({
          where: {
            email: user.email || undefined, // Ensure email is either a string or undefined
          },
        });
    
        if (existingUser && existingUser.id !== user.id) {
          await prisma.account.create({
            data: {
              userId: existingUser.id,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              type: account.type || "oauth", // Add the required 'type' field
            },
          });
    
          token.id = existingUser.id;
        }
      }
    
      if (account) {
        token.accessToken = account.access_token;
      }
    
      return token;
    },
    async session({ session, token }) {

      if (token) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.email = token.email as string;
        session.accessToken = token.accessToken as string
      }

      return session;
    },
  },
};