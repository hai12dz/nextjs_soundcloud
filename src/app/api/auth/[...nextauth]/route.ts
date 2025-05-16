import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import { sendRequest } from "@/utils/api";
import { use } from "react";
import { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],
    secret: process.env.NO_SECRET,
    callbacks: {
        async jwt({ token, user, account, profile, trigger }) {
            if (trigger === 'signIn' && account?.provider === 'github') {
                const res = await sendRequest<IBackendRes<JWT>>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/social-media`,
                    method: 'POST',
                    body: {
                        type: "GITHUB",
                        username: user?.email,
                    }
                })
                if (res.data) {
                    token.access_token = res.data.access_token
                    token.refresh_token = res.data.refresh_token
                    token.user = res.data.user
                }

            }
            return token;
        }
        ,
        async session({ session, token, user }) {
            session.access_token = token.access_token
            session.refresh_token = token.refresh_token
            session.user = token.user
            return session
        }
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
