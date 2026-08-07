import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("User updates successfully.");
      queryClient.setQueryData(["user"], user);
    },
    onError: () => {
      toast.error("User could not be updated.");
    },
  });

  return { isUpdating, updateUser };
}
