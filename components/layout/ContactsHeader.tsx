"use client";

import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "../ui/Button";

export default function ContactsHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div>
          <h1 className="text-xl font-semibold text-neutral-900">
            Address Book
          </h1>
          <p className="text-xs text-neutral-500">Powered by Next.js</p>
        </div>

        <nav className="space-x-6 text-sm text-gray-600">
          {user ? (
            <Button variant="ghost" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Link href="/login" className="hover:text-blue-600">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
