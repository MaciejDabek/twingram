import { useParams } from "react-router-dom";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  apiGetInfiniteUsers,
  apiGetRandomUsers,
  apiGetUserById,
  apiUpdateUser,
} from "../appwrite/apiUsers";

import { QUERY_KEYS } from "./config";
import { useToast } from "../../components/ui/use-toast";
import { IUpdateUser } from "../../types";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: updateUser, isPending: isUpdatingUser } = useMutation({
    mutationFn: ({ userId, user }: { userId: string; user: IUpdateUser }) =>
      apiUpdateUser(userId, user),
    onSuccess: () => {
      toast({ title: "User updated." });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ACCOUNT_USER],
      });
    },
    onError: () => {
      toast({
        title: "Something went wrong. Please try to update user again.",
        variant: "destructive",
      });
    },
  });

  return { updateUser, isUpdatingUser };
}

export function useUser() {
  const { userId = "" } = useParams();

  const { data: user, isPending: isLoadingUser } = useQuery({
    queryFn: () => apiGetUserById(userId),
    queryKey: [QUERY_KEYS.GET_USER, userId],
  });

  return { user, isLoadingUser };
}

export function useInfiniteUsers() {
  const {
    data,
    isLoading: isLoadingUsers,
    hasNextPage: hasMoreUsers,
    fetchNextPage: fetchMoreUsers,
  } = useInfiniteQuery({
    queryFn: apiGetInfiniteUsers,
    queryKey: [QUERY_KEYS.GET_USERS],
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      if (!lastPage) return null;

      if (lastPage.length === 0) return null;

      return lastPage[lastPage.length - 1].$id;
    },
  });

  const users = data?.pages.flat(1) || [];

  return { users, isLoadingUsers, hasMoreUsers, fetchMoreUsers };
}

export function useRandomUsers() {
  const { data, isPending: isLoadingRandomUsers } = useQuery({
    queryFn: () => apiGetRandomUsers(),
    queryKey: [QUERY_KEYS.GET_RANDOM_USERS],
    refetchOnMount: false,
  });

  const randomUsers = data || [];

  return { randomUsers, isLoadingRandomUsers };
}
