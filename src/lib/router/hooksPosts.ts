import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { INewPost, IUpdatePost } from "../../types";
import {
  apiCreatePost,
  apiDeletePost,
  apiGetInfiniteExplorePosts,
  apiGetInfiniteRecentPosts,
  apiGetInfiniteSearchPosts,
  apiGetPostById,
  apiGetPostsByUserId,
  apiGetRecentPosts,
  apiUpdatePost,
} from "../appwrite/apiPosts";
import { useToast } from "../../components/ui/use-toast";
import { QUERY_KEYS } from "./config";
import { useParams, useSearchParams } from "react-router-dom";

export function useCreatePost() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: createPost, isPending: isCreatingPost } = useMutation({
    mutationFn: (post: INewPost) => apiCreatePost(post),
    onSuccess: () => {
      toast({ title: "Post created." });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ACCOUNT_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
    onError: () => {
      toast({
        title: "Something went wrong. Please try to create post again.",
        variant: "destructive",
      });
    },
  });

  return { createPost, isCreatingPost };
}

export function useUpdatePost() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: updatePost, isPending: isUpdatingPost } = useMutation({
    mutationFn: ({ postId, post }: { postId: string; post: IUpdatePost }) =>
      apiUpdatePost(postId, post),
    onSuccess: () => {
      toast({ title: "Post updated." });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
    onError: () => {
      toast({
        title: "Something went wrong. Please try to update post again.",
        variant: "destructive",
      });
    },
  });

  return { updatePost, isUpdatingPost };
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  const { mutate: deletePost } = useMutation({
    mutationFn: ({ postId, imageId }: { postId: string; imageId: string }) =>
      apiDeletePost(postId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_ACCOUNT_USER],
      });
    },
  });

  return { deletePost };
}

export function usePost() {
  const { postId = "" } = useParams();

  const { data: post, isPending: isLoadingPost } = useQuery({
    queryFn: () => apiGetPostById(postId),
    queryKey: [QUERY_KEYS.GET_POST, postId],
  });

  return { post, isLoadingPost };
}

export function useRecentPosts() {
  const {
    data: recentPosts,
    isPending: isLoadingRecentPosts,
    isError: isRecentPostsError,
  } = useQuery({
    queryFn: apiGetRecentPosts,
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
  });

  return { recentPosts, isLoadingRecentPosts, isRecentPostsError };
}

export function useInfiniteRecentPosts() {
  const {
    data,
    isLoading: isLoadingRecentPosts,
    hasNextPage: hasMorePosts,
    fetchNextPage: fetchMorePosts,
  } = useInfiniteQuery({
    queryFn: apiGetInfiniteRecentPosts,
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      if (!lastPage) return null;

      if (lastPage.length === 0) return null;

      return lastPage[lastPage.length - 1].$id;
    },
  });

  const recentPosts = data?.pages.flat(1) || [];

  return { recentPosts, isLoadingRecentPosts, hasMorePosts, fetchMorePosts };
}

export function useInfiniteExplorePosts() {
  const {
    data,
    isLoading: isLoadingExplorePosts,
    hasNextPage: hasMorePosts,
    fetchNextPage: fetchMorePosts,
  } = useInfiniteQuery({
    queryFn: apiGetInfiniteExplorePosts,
    queryKey: [QUERY_KEYS.GET_EXPLORE_POSTS],
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      if (!lastPage) return null;

      if (lastPage.length === 0) return null;

      return lastPage[lastPage.length - 1].$id;
    },
  });

  const explorePosts = data?.pages.flat(1) || [];

  return { explorePosts, isLoadingExplorePosts, hasMorePosts, fetchMorePosts };
}

export function useInfiniteSearchPosts() {
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("q") || "";

  const {
    data,
    isLoading: isLoadingSearchPosts,
    hasNextPage: hasMorePosts,
    fetchNextPage: fetchMorePosts,
  } = useInfiniteQuery({
    queryFn: ({ pageParam }: { pageParam: string }) =>
      apiGetInfiniteSearchPosts({ searchQuery: searchQuery, pageParam }),
    queryKey: [QUERY_KEYS.GET_SEARCH_POSTS, searchQuery],
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      if (!lastPage) return null;

      if (lastPage.length === 0) return null;

      return lastPage[lastPage.length - 1].$id;
    },
  });

  const searchPosts = data?.pages.flat(1) || [];

  return { searchPosts, isLoadingSearchPosts, hasMorePosts, fetchMorePosts };
}

export function useUserPosts() {
  const { userId = "" } = useParams();

  const { data: userPosts, isPending: isLoadingUserPosts } = useQuery({
    queryFn: () => apiGetPostsByUserId(userId),
    queryKey: [QUERY_KEYS.GET_POSTS_BY_USER_ID, userId],
  });

  return { userPosts, isLoadingUserPosts };
}
