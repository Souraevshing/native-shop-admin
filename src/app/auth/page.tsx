"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export default function AuthPage() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const router = useRouter();

  const onSubmit = async ({ email, password }: z.infer<typeof loginSchema>) => {
    setIsAuthenticating(true);

    try {
      console.log(email, password);
      router.push("/admin");
    } catch {
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="flex h-svh items-center justify-center">
      <div className="mx-auto grid w-[350px] gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      disabled={isAuthenticating}
                      autoFocus
                      required
                      {...field}
                      {...form.register("email")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <div className="flex items-center">
                    <FormLabel htmlFor="password">Password</FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      disabled={isAuthenticating}
                      id="password"
                      placeholder="Enter password"
                      type="password"
                      required
                      {...field}
                      {...form.register("password")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isAuthenticating}
              type="submit"
              className="w-full"
            >
              {isAuthenticating ? (
                <Loader2Icon className="animate-spin mr-2" size={20} />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
