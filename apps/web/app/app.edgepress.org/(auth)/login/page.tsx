"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@edgepress/ui/components/tabs"
import { useRouter } from "next/navigation";

import SignIn from "@/components/auth/sign-in";
import { SignUp } from "@/components/auth/sign-up";

export default function Page() {
	const router = useRouter();

	return (
		<div className="w-full">
			<div className="flex items-center flex-col justify-center w-full md:py-10">
				<div className="md:w-[400px]">
					<Tabs defaultValue="sign-in">
						<TabsList>
							<TabsTrigger value="sign-in">Sign In</TabsTrigger>
							<TabsTrigger value="sign-up">Sign Up</TabsTrigger>
						</TabsList>
						<TabsContent value="sign-in">
							<SignIn />
						</TabsContent>
						<TabsContent value="sign-up">
							<SignUp />
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
}
