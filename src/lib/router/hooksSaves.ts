import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiAddSave, apiRemoveSave } from "../appwrite/apiSaves";
import { QUERY_KEYS } from "./config";

export function useSavesActions() {
  const queryClient = useQueryClient();

  const { mutate: addSave, mutateAsync: addSaveAsync } = useMutation({
    mutationFn: ({ userId, postId }: { userId: string; postId: string }) =>
      apiAddSave(userId, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });

  const { mutate: removeSave, mutateAsync: removeSaveAsync } = useMutation({
    mutationFn: (saveId: string) => apiRemoveSave(saveId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });

  return { addSave, addSaveAsync, removeSave, removeSaveAsync };
}
