"use client";

import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";
import authApi from "@/services/auth-api";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

export function AuthBlock() {
  const router = useRouter();

  const handleLogout = async () => {
    await authApi.logout();
    router.replace("/");
  };

  return (
    <div className="absolute right-0 pr-6 flex gap-8 text-white">
      <Link
        href="/auth?tab=Login"
        className="hover:opacity-80 transition flex items-center gap-2"
      >
        <LogIn />
        Login
      </Link>

      <Link href="/auth?tab=Register" className="hover:opacity-80 transition">
        Register
      </Link>
    </div>
  );

  // if (user) {
  //   return (
  //     <div className="absolute right-0 pr-6 flex gap-8 text-white">
  //       <Link
  //         href="/dashboard"
  //         className="hover:opacity-80 transition flex items-center gap-2"
  //       >
  //         {user.username}
  //       </Link>

  //       <AlertDialog>
  //         <AlertDialogTrigger className="hover:opacity-80 transition flex items-center gap-2 cursor-pointer">
  //           <LogOut />
  //           Logout
  //         </AlertDialogTrigger>

  //         <AlertDialogContent>
  //           <AlertDialogHeader>
  //             <AlertDialogTitle>
  //               Are you sure you want to logout?
  //             </AlertDialogTitle>
  //           </AlertDialogHeader>
  //           <AlertDialogFooter>
  //             <AlertDialogCancel>Cancel</AlertDialogCancel>
  //             <AlertDialogAction onClick={handleLogout}>
  //               Logout
  //             </AlertDialogAction>
  //           </AlertDialogFooter>
  //         </AlertDialogContent>
  //       </AlertDialog>
  //     </div>
  //   );
  // }
  // // If user is not logged in, show login and register buttons
  // else {
  //   return (
  //     <div className="absolute right-0 pr-6 flex gap-8 text-white">
  //       <Link
  //         href="/auth?tab=Login"
  //         className="hover:opacity-80 transition flex items-center gap-2"
  //       >
  //         <LogIn />
  //         Login
  //       </Link>

  //       <Link href="/auth?tab=Register" className="hover:opacity-80 transition">
  //         Register
  //       </Link>
  //     </div>
  //   );
  // }
}

export default AuthBlock;
