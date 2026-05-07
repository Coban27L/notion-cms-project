import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      email: string;
    };
  }
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || "development-secret-key";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = String(credentials.email).toLowerCase().trim();
        const password = String(credentials.password);
        const expectedEmail = ADMIN_EMAIL.toLowerCase().trim();
        const expectedPassword = ADMIN_PASSWORD;

        if (email === expectedEmail && password === expectedPassword) {
          return {
            id: "1",
            email: email,
            name: "Admin",
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname.startsWith("/dashboard")) {
        return !!auth;
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
});
