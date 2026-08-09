import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { prisma } from "./prisma";
import { cookies } from "next/headers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      id: "admin-login",
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const admin = await prisma.adminUser.findUnique({
          where: { email: credentials.email },
        });

        if (!admin) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          admin.password,
        );

        if (!isValid) return null;

        return { id: String(admin.id), email: admin.email, role: "admin" };
      },
    }),
    Credentials({
      id: "customer-login",
      name: "Customer",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const customer = await prisma.customer.findUnique({
          where: { email: credentials.email },
        });

        if (!customer || !customer.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          customer.password,
        );

        if (!isValid) return null;

        return {
          id: String(customer.id),
          email: customer.email,
          name: customer.fullName,
          role: "customer",
        };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const cookieStore = await cookies();
        const intent = cookieStore.get("google_intent")?.value;
        cookieStore.delete("google_intent");

        const existing = await prisma.customer.findUnique({
          where: { email: user.email },
        });

        if (intent === "login" && !existing) {
          return "/login?error=NoAccount";
        }

        if (intent === "register" && existing) {
          return "/register?error=AccountExists";
        }

        if (!existing) {
          await prisma.customer.create({
            data: {
              email: user.email,
              fullName: user.name || "AURELLE Customer",
              password: null,
            },
          });
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        if (account?.provider === "google") {
          token.role = "customer";
          token.name = user.name;
          token.email = user.email;
        } else {
          token.role = user.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
