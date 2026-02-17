"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: string | null;
  login: (email: string, remember: boolean) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<string | null>(() => {
    if (typeof document === "undefined") return null;

    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_user="));

    return match ? match.split("=")[1] : null;
  });

  function login(email: string, remember: boolean) {
    setUser(email);

    const expires = remember ? "max-age=604800" : "";

    document.cookie = `auth_user=${email}; path=/; ${expires}; SameSite=Lax`;

    router.push("/contacts");
  }

  function logout() {
    setUser(null);
    document.cookie =
      "auth_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
