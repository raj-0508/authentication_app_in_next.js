"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../ui/mode-toggle";
import { account } from "@/lib/appwrite";
import { useAuth } from "@/lib/AuthContext"; // ✅ Use global auth state

const Navbar = () => {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null); // Clear user from context
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 mx-auto items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="App Logo"
            width={40}
            height={40}
            priority
          />
          <span className="font-semibold text-lg hidden sm:inline">MyApp</span>
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Button
                onClick={handleLogout}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button className="rounded-md px-4 py-2 text-sm">Login</Button>
              </Link>
              <Link href="/signup">
                <Button className="rounded-md px-4 py-2 text-sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
