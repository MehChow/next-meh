"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInSchema, SignInSchema } from "@/schema/auth-schema";
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
import authService from "@/services/auth-api";
import { useAuth } from "@/contexts/auth-context";

interface SignInFormProps {
  returnUrl?: string;
}

export function SignInForm({ returnUrl }: SignInFormProps) {
  const router = useRouter();
  const { setUser } = useAuth();

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Proceed to login
  const onSubmit = async (values: SignInSchema) => {
    try {
      const response = await authService.login(values);

      // If login is successful, set userInfo in Zustand store
      if (response.status === 200) {
        // Update the auth context with user data
        setUser(response.data);

        // Redirect to returnUrl if it exists, otherwise go to home
        if (returnUrl) {
          router.replace(decodeURIComponent(returnUrl));
        } else {
          router.replace("/");
        }
      }
    } catch (error) {
      console.log("LOGIN FAILED!!!", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Username</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Jane0604"
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
                  type="password"
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

export default SignInForm;
