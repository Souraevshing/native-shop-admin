"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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
import { FormData, useLoginForm } from "@/utils/schema/login-schema";
import { LoaderIcon } from "lucide-react";

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
      try {
        await authenticateUser(email, password);
        setLoading(true);
        setIsAuthenticated(true);
        router.push("/admin");
      } catch (err) {
        setIsAuthenticated(false);
        console.error(err);
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
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      disabled={isAuthenticated}
                      autoFocus
                      aria-label="email"
                      {...field}
                    />
                  </FormControl>
                  {errors.email?.message && (
                    <FormMessage>{errors.email!.message}</FormMessage>
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
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      disabled={isAuthenticated}
                      aria-label="password"
                      {...field}
                    />
                  </FormControl>
                  {errors.password?.message && (
                    <FormMessage>{errors.password.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              disabled={isAuthenticated}
              variant={"outline"}
              size={"icon"}
              type="submit"
              className="w-full"
            >
              {loading ? <LoaderIcon className="animate-spin" /> : "Log In"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
