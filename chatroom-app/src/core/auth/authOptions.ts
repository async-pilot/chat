import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import PocketBase from "pocketbase";

import { pocketbaseUrl } from "@/core/config/apiRoutes";
import { IUser } from "@/core/types/user.types";

import { getFileUrl } from "../utils/pbUtils";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identity: { label: "identity", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(creds: Record<"identity" | "password", string> | undefined): Promise<any> {
        if (!creds) {
          return null;
        }

        try {
          const pb = new PocketBase(pocketbaseUrl);
          const authData = await pb.collection("users").authWithPassword(creds.identity, creds.password);

          const user = {
            id: authData.record.id,
            name: authData.record.name,
            username: authData.record.username,
            email: authData.record.email,
            friends: authData.record.friends,
            avatar: getFileUrl(authData.record, authData.record.avatar),
            pbToken: authData.token,
          };

          return user;
        } catch {
          return null;
        }
      },
    }),
  ],
  secret: "2rwmefmwekmflwkemflkmewf",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.friends = user.friends;
        token.username = user.username;
        token.pbToken = user.pbToken;
        token.avatar = user.avatar;
        token.email = user.email;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.friends = token.friends as User[];
      session.user.username = token.username as string;
      session.user.pbToken = token.pbToken as string;
      session.user.avatar = token.avatar as string;
      session.user.email = token.email as string;
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
};
