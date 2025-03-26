import apiClient from "@/lib/axios";
import { toast } from "sonner";

const authModel = {
  authCheck: async () => {
    const response = await apiClient.get("/api/auth");
    if (response.status === 200) {
      toast.success("You are authenticated!!");
    }
  },
};

export default authModel;
