"use client";

import { useState } from "react";

import { Button } from "@edgepress/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@edgepress/ui/components/card";
import { Checkbox } from "@edgepress/ui/components/checkbox";
import { Input } from "@edgepress/ui/components/input";
import { Label } from "@edgepress/ui/components/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { signIn } from "@/lib/auth-client";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const router = useRouter();

	const handleEmailSignIn = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email || !password) {
			toast.error("Please fill in all fields");
			return;
		}

		setLoading(true);
		try {
			const result = await signIn.email({ 
				email, 
				password,
				rememberMe,
			});

			if (result.error) {
				toast.error(result.error.message || "Sign in failed");
			} else {
				toast.success("Welcome back!");
				router.push("/");
				router.refresh();
			}
		} catch (error) {
			toast.error("An unexpected error occurred");
			console.error('Sign in error:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleSocialSignIn = async (provider: "github" | "google" | "microsoft") => {
		try {
			await signIn.social({
				callbackURL: "/",
				provider,
			});
		} catch (error) {
			toast.error(`Failed to sign in with ${provider}`);
			console.error(`${provider} sign in error:`, error);
		}
	};

	return (
		<Card className="max-w-md rounded-none">
			<CardHeader>
				<CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
				<CardDescription className="text-xs md:text-sm">
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleEmailSignIn}>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								disabled={loading}
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="m@example.com"
								type="email"
							/>
						</div>

						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
								<Link className="ml-auto inline-block text-sm underline" href="#">
									Forgot your password?
								</Link>
							</div>

							<Input
								id="password"
								disabled={loading}
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Password"
								autoComplete="current-password"
								type="password"
							/>
						</div>

						<div className="flex items-center gap-2">
							<Checkbox
								id="remember"
								checked={rememberMe}
								disabled={loading}
								onCheckedChange={(checked) => setRememberMe(checked as boolean)}
							/>
							<Label htmlFor="remember">Remember me</Label>
						</div>

						<Button
							className="w-full"
							disabled={loading}
							type="submit"
						>
							{loading ? <Loader2 size={16} className="animate-spin" /> : "Sign In"}
						</Button>

						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-t" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-background px-2 text-muted-foreground">
									Or continue with
								</span>
							</div>
						</div>

						<div className="grid gap-2">
							<Button
								variant="outline"
								className="w-full gap-2"
								disabled={loading}
								onClick={() => handleSocialSignIn("google")}
								type="button"
							>
								<svg
									height="1em"
									viewBox="0 0 256 262"
									width="0.98em"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
										fill="#4285F4"
									></path>
									<path
										d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
										fill="#34A853"
									></path>
									<path
										d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
										fill="#FBBC05"
									></path>
									<path
										d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
										fill="#EB4335"
									></path>
								</svg>
								Sign in with Google
							</Button>

							<Button
								variant="outline"
								className="w-full gap-2"
								disabled={loading}
								onClick={() => handleSocialSignIn("github")}
								type="button"
							>
								<svg
									height="1em"
									viewBox="0 0 24 24"
									width="1em"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
										fill="currentColor"
									></path>
								</svg>
								Sign in with GitHub
							</Button>

							<Button
								variant="outline"
								className="w-full gap-2"
								disabled={loading}
								onClick={() => handleSocialSignIn("microsoft")}
								type="button"
							>
								<svg
									height="1em"
									viewBox="0 0 24 24"
									width="1em"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M2 3h9v9H2zm9 19H2v-9h9zM21 3v9h-9V3zm0 19h-9v-9h9z"
										fill="currentColor"
									></path>
								</svg>
								Sign in with Microsoft
							</Button>
						</div>
					</div>
				</form>
			</CardContent>
			<CardFooter>
				<div className="flex justify-center w-full border-t py-4">
					<p className="text-center text-xs text-neutral-500">
						Powered by{" "}
						<Link
							className="underline"
							href="https://better-auth.com"
							target="_blank"
						>
							<span className="dark:text-orange-200/90">better-auth.</span>
						</Link>
					</p>
				</div>
			</CardFooter>
		</Card>
	);
}
