import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateSettings } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting successfully updated.");
      queryClient.invalidateQueries(["settings"]);
    },
    onError: () => {
      toast.Error("Setting could not be updated.");
    },
  });

  return { isUpdating, updateSettings };
}
