"use client";

import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const { login } = useAuth();
  const emailRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormData>({
    email: "admin@test.com",
    password: "123456",
  });

  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData> & { general?: string }>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = schema.safeParse(form);

    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormData;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    if (
      form.email !== "admin@test.com" ||
      form.password !== "123456"
    ) {
      setErrors({ general: "Invalid email or password" });
      return;
    }

    setLoading(true);
    login(form.email, remember);
  }

  return (
    <section className="flex flex-1 items-center justify-center px-6">
      <div className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.05)] space-y-8">
        <h2 className="text-2xl font-semibold text-neutral-900 text-center">
          Login
        </h2>

        {errors.general && (
          <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-medium">
              Email
            </label>
            <input
              ref={emailRef}
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
            {errors.email && (
              <p className="text-xs text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="w-full rounded-md border border-neutral-300 px-3 py-2 pr-12 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="absolute right-3 top-2 text-xs text-neutral-500 hover:text-neutral-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-600">
                {errors.password}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <input
              id="remember"
              type="checkbox"
              checked={remember}
              onChange={(e) =>
                setRemember(e.target.checked)
              }
              className="h-4 w-4"
            />
            <label htmlFor="remember">
              Remember me
            </label>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </section>
  );
}
