import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logIn as logInApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logIn, isLoading: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => logInApi({ email, password }),

    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      toast.success("User successfully logged in.");
      navigate("/dashboard", { replace: true });
    },

    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect.");
    },
  });

  return { logIn, isLoggingIn };
}
