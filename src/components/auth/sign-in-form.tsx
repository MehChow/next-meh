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

export function SignInForm() {
  const router = useRouter();

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInSchema) => {
    try {
      const response = await authService.login(values);
      if (response.accessToken) {
        router.push("/dashboard");
      }
    } catch (error) {
      // TODO: show message to user
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
                <Input {...field} className="caret-white text-white border-slate-800" />
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
