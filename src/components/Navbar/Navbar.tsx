"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../ui/mode-toggle";
import Image from "next/image";

import { account } from "@/lib/appwrite";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    account
      .get()
      .then(() => setIsLoggedIn(true))
      .catch(() => setIsLoggedIn(false));
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 mx-auto items-center justify-between">
        <Link href="#" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Picture of the author"
            width={50}
            height={50}
          />
        </Link>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <Button
              onClick={handleLogout}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 cursor-pointer"
            >
              Logout
            </Button>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Sign up
              </Link>
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
