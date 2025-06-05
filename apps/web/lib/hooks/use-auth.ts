import { useSession } from "@/lib/auth-client";

export function useAuth() {
  const { data: session, error, isPending } = useSession();

  return {
    error,
    isAuthenticated: !!session?.user,
    isLoading: isPending,
    session,
    user: session?.user || null,
  };
} 
