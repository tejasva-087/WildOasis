import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOut as logOutApi } from "./apiAuth";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logOut, isLoading } = useMutation({
    mutationFn: logOutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });

  return { logOut, isLoading };
}
