import NextAuth from "next-auth";
import Auth0 from "next-auth/providers/auth0";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Auth0({ authorization: process.env.AUTH_AUTH0_AUTH_URL })],
  callbacks: {
    jwt: ({ token, account, profile }) => {
      if (account && profile) {
        return {
          ...token,
          id: account?.providerAccountId,
          access_token: account?.access_token,
          id_token: account?.id_token,
          nickname: profile?.nickname,
        };
      }

      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        access_token: token.access_token,
        id_token: token.id_token,
        user: {
          ...session.user,
          id: token.id,
          nickname: token.nickname,
        },
      };
    },
  },
});
