"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpSchema, SignUpSchema } from "@/schema/auth-schema";
import { useRouter } from "next/navigation";

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
import authApi from "@/services/auth-api";
import { useAuth } from "@/contexts/auth-context";
import { AuthErrorType } from "@/types/auth";
import { toast } from "sonner";

interface SignUpFormProps {
  returnUrl?: string;
}

export function SignUpForm({ returnUrl }: SignUpFormProps) {
  const router = useRouter();
  const { setUser } = useAuth();

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignUpSchema) => {
    try {
      const { email, password } = values;
      const response = await authApi.register({ email, password });

      // If registration is successful, set userInfo in Zustand store
      setUser(response.data);

      // Redirect to returnUrl if it exists, otherwise go to home
      if (returnUrl) {
        router.replace(decodeURIComponent(returnUrl));
      } else {
        router.replace("/");
      }
    } catch (error) {
      const authError = error as AuthErrorType;
      switch (authError.code) {
        case "EMAIL_IN_USE":
          toast.error("Email already in use");
          break;
        case "NETWORK_ERROR":
          toast.error("Please check your internet connection");
          break;
        default:
          toast.error(authError.message);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="jane0604@gmail.com"
                  className="caret-white text-white border-slate-800"
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
            <FormItem>
              <FormLabel className="text-white">Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="caret-white text-white border-slate-800"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Confirm Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="caret-white text-white border-slate-800"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full cursor-pointer bg-slate-800">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default SignUpForm;
