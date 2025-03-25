import SignInCard from "@/components/auth/sign-in-card";
import SignUpCard from "@/components/auth/sigin-up-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Auth() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Tabs defaultValue="Login" className="fixed w-[500px]">
        <TabsList className="w-full mb-2 bg-slate-300">
          <TabsTrigger value="Login">Login</TabsTrigger>
          <TabsTrigger value="Register">Register</TabsTrigger>
        </TabsList>

        <TabsContent value="Login">
          <SignInCard />
        </TabsContent>

        <TabsContent value="Register">
          <SignUpCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
