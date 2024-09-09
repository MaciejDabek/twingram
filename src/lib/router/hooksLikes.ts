import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiAddLike, apiRemoveLike } from "../appwrite/apiLikes";
import { QUERY_KEYS } from "./config";

export function useLikesActions() {
  const queryClient = useQueryClient();

  const { mutate: addLike, mutateAsync: addLikeAsync } = useMutation({
    mutationFn: ({ userId, postId }: { userId: string; postId: string }) =>
      apiAddLike(userId, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });

  const { mutate: removeLike, mutateAsync: removeLikeAsync } = useMutation({
    mutationFn: ({
      likeId,
      userId,
      postId,
    }: {
      likeId: string | null;
      userId: string;
      postId: string;
    }) => apiRemoveLike(likeId, userId, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });

  return {
    addLike,
    addLikeAsync,
    removeLike,
    removeLikeAsync,
  };
}
