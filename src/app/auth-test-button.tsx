"use client";

import { Button } from "@/components/ui/button";
import authService from "@/services/authService";

export default function AuthTestButton() {
  return <Button onClick={() => authService.authCheck()}>TEST AUTH API</Button>;
}
