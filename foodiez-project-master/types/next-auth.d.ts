import NextAuth from "next-auth"

declare module "next-auth" {
    export interface User {
        id: string,
        username: string
    }
    export interface Session {
        user: User & {
            username: string,
            id: string,
        }
        token: {
            username: string
        };
        accessToken: string

    }
    export interface JWT {
        id: string;
        username: string;
        email: string;
        accessToken: string; // Include accessToken in the JWT
    }
}