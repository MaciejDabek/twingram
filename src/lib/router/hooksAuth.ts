import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  apiCreateAccountUser,
  apiGetAccount,
  apiGetAccountUser,
  apiSignInAccount,
  apiSignOutAccount,
} from "../appwrite/apiAuth";
import { INewUser } from "../../types";
import { useToast } from "../../components/ui/use-toast";
import { QUERY_KEYS } from "./config";
import { useNavigate } from "react-router-dom";

export function useAccount() {
  const { data: account, isPending: isLoadingAccount } = useQuery({
    queryFn: () => apiGetAccount(),
    queryKey: ["session"],
  });

  const isAuthenticated = account !== null;

  return { account, isAuthenticated, isLoadingAccount };
}

export function useAccountUser() {
  const { data: account } = useQuery({
    queryFn: () => apiGetAccount(),
    queryKey: [QUERY_KEYS.GET_ACCOUNT],
  });

  const isAuthenticated = !!account;
  const accountId = account?.$id;

  const { data: currentUser, isLoading: isLoadingCurrentUser } = useQuery({
    queryFn: () => apiGetAccountUser(accountId || ""),
    queryKey: [QUERY_KEYS.GET_ACCOUNT_USER],
    enabled: !!accountId,
  });

  return { account, isAuthenticated, currentUser, isLoadingCurrentUser };
}

export function useCreateAccountUser() {
  const { toast } = useToast();

  const { mutateAsync: createUserAccount, isPaused: isCreatingUserAccount } =
    useMutation({
      mutationFn: (user: INewUser) => apiCreateAccountUser(user),
      onError: (err) => {
        console.error(err);
        toast({
          title: "Sign up failed. Please try again.",
          variant: "destructive",
        });
      },
    });

  return { createUserAccount, isCreatingUserAccount };
}

export function useSignInAccount() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutateAsync: signInAccount, isPending: isSigningInAccount } =
    useMutation({
      mutationFn: (user: { email: string; password: string }) =>
        apiSignInAccount(user),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_ACCOUNT],
        });
      },
      onError: (err) => {
        console.error(err);
        toast({ title: "Something went wrong. Please login your new account" });
      },
    });

  return { signInAccount, isSigningInAccount };
}

export function useSignOutAccount() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: signOutAccount, isPending: isSigningOutAccount } =
    useMutation({
      mutationFn: () => apiSignOutAccount(),
      onSuccess: () => {
        queryClient.removeQueries({
          queryKey: [QUERY_KEYS.GET_ACCOUNT_USER],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_ACCOUNT_USER],
        });
        queryClient.removeQueries({ queryKey: [QUERY_KEYS.GET_ACCOUNT] });
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_ACCOUNT] });
        navigate("/");
      },
    });

  return { signOutAccount, isSigningOutAccount };
}
