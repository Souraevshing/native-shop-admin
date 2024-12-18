"use client";

import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { authenticateUser } from "@/actions/authenticate-user";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ADMIN_ROUTE } from "@/constants/routes";
import { FormData, useLoginForm } from "@/utils/schema/login-schema";

export default function Auth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useLoginForm();
  const {
    formState: { isValid, errors },
    reset,
    control,
    handleSubmit,
  } = useLoginForm();

  const handleLogin = async ({ email, password }: FormData) => {
    if (isValid) {
      setLoading(true);

      try {
        await toast.promise(authenticateUser(email, password), {
          loading: "Logging in...",
          success: "Login successful!",
          error: (err) =>
            err instanceof Error ? err.message : "An unknown error occurred",
        });

        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
        console.error(err);
      } finally {
        setLoading(false);
      }

      if (isAuthenticated) {
        router.push(ADMIN_ROUTE);
      }
    }

    reset();
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mx-auto grid w-[350px] gap-6">
        <Form {...form}>
          <form onSubmit={handleSubmit(handleLogin)} className="grid gap-4">
            {/* Email Field */}
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel htmlFor="email">
                    Email
                    <sup className="text-red-500 text-lg">*</sup>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      autoFocus
                      aria-label="email"
                      {...field}
                    />
                  </FormControl>
                  {errors.email?.message && (
                    <FormMessage className="font-medium text-sm">
                      {errors.email!.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel htmlFor="password">
                    Password
                    <sup className="text-red-500 text-lg">*</sup>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      aria-label="password"
                      {...field}
                    />
                  </FormControl>
                  {errors.password?.message && (
                    <FormMessage className="font-medium text-sm">
                      {errors.password.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              variant={"outline"}
              size={"icon"}
              type="submit"
              className="w-full hover:bg-zinc-900 hover:text-white"
            >
              {loading ? <LoaderIcon className="animate-spin" /> : "Log In"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
