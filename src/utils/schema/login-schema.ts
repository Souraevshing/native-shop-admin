import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type FormData = z.infer<typeof LoginSchema>;

export const LoginResolver = zodResolver(LoginSchema);

export const useLoginForm = () => {
  return useForm<FormData>({
    resolver: LoginResolver,
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });
};
