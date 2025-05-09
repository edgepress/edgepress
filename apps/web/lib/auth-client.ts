import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
	baseURL: "http://app.localhost:3000",
});

export const { signIn, signUp } = authClient;
