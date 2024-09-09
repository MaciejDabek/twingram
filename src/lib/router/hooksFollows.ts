import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiAddFollow, apiRemoveFollow } from "../appwrite/apiFollows";
import { QUERY_KEYS } from "./config";

export function useFollowsActions() {
  const queryClient = useQueryClient();

  const { mutate: addFollow, isPending: isAddingFollow } = useMutation({
    mutationFn: ({
      followerId,
      followedId,
    }: {
      followerId: string;
      followedId: string;
    }) => apiAddFollow(followerId, followedId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ACCOUNT_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER, variables.followedId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USERS],
      });
    },
  });

  const { mutate: removeFollow, isPending: isRemovingFollow } = useMutation({
    mutationFn: (followId: string) => apiRemoveFollow(followId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ACCOUNT_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USERS],
      });
    },
  });

  return { addFollow, isAddingFollow, removeFollow, isRemovingFollow };
}
