"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/providers/AuthProvider";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <section className="flex flex-1 items-center justify-center px-6">
      <div className="mx-auto max-w-3xl text-center space-y-6">
        <div className="flex justify-center">
          <Image
            src="/logo.png"
            alt="Address Book Logo"
            width={110}
            height={110}
            priority
          />
        </div>

        <h1 className="text-4xl font-semibold text-neutral-900 leading-tight">
          Welcome to{" "}
          <span className="text-blue-600">
            Address Book
          </span>
        </h1>

        <p className="text-neutral-600 max-w-xl mx-auto">
          A structured demo application showcasing clean frontend architecture,
          predictable state management, and scalable UI layering.
        </p>

        <div className="pt-4">
          {user ? (
            <Link href="/contacts">
              <Button>
                Go to Contacts
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button>
                Login to Continue
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
