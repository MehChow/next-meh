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

interface SignUpFormProps {
  returnUrl?: string;
}

export function SignUpForm({ returnUrl }: SignUpFormProps) {
  const router = useRouter();
  const { setUser } = useAuth();

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignUpSchema) => {
    try {
      const { username, password } = values;
      const response = await authApi.register({ username, password });

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
      console.log("REGISTER FAILED!!!", error);
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
