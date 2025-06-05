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
import { Input } from "@edgepress/ui/components/input";
import { Label } from "@edgepress/ui/components/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { signUp } from "@/lib/auth-client";

export function SignUp() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault();
		
		if (!name || !email || !password || !confirmPassword) {
			toast.error("Please fill in all fields");
			return;
		}

		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		if (password.length < 8) {
			toast.error("Password must be at least 8 characters long");
			return;
		}

		setLoading(true);
		try {
			const result = await signUp.email({
				email,
				name,
				password,
			});

			if (result.error) {
				toast.error(result.error.message || "Sign up failed");
			} else {
				toast.success("Account created successfully! Welcome to EdgePress!");
				router.push("/");
				router.refresh();
			}
		} catch (error) {
			toast.error("An unexpected error occurred");
			console.error('Sign up error:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card className="max-w-md rounded-none">
			<CardHeader>
				<CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
				<CardDescription className="text-xs md:text-sm">
					Create your account to get started with EdgePress
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSignUp}>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="name">Full Name</Label>
							<Input
								id="name"
								disabled={loading}
								required
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="Enter your full name"
								type="text"
							/>
						</div>

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
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								disabled={loading}
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Create a strong password"
								minLength={8}
								type="password"
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="confirmPassword">Confirm Password</Label>
							<Input
								id="confirmPassword"
								disabled={loading}
								required
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								placeholder="Confirm your password"
								minLength={8}
								type="password"
							/>
						</div>

						<Button
							className="w-full"
							disabled={loading}
							type="submit"
						>
							{loading ? (
								<>
									<Loader2 size={16} className="animate-spin mr-2" />
									Creating Account...
								</>
							) : (
								"Create Account"
							)}
						</Button>

						<div className="text-center text-sm text-muted-foreground">
							Already have an account?{" "}
							<Link className="underline underline-offset-4 hover:text-primary" href="/login">
								Sign in
							</Link>
						</div>
					</div>
				</form>
			</CardContent>
			<CardFooter>
				<div className="flex justify-center w-full border-t py-4">
					<p className="text-center text-xs text-neutral-500">
						By creating an account, you agree to our{" "}
						<Link className="underline" href="/terms" target="_blank">
							Terms of Service
						</Link>{" "}
						and{" "}
						<Link className="underline" href="/privacy" target="_blank">
							Privacy Policy
						</Link>
					</p>
				</div>
			</CardFooter>
		</Card>
	);
}
