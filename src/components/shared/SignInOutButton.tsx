import { useNavigate } from "react-router-dom";
import { LucideLogIn, LucideLogOut } from "lucide-react";
import { useAccountUser, useSignOutAccount } from "../../lib/router/hooksAuth";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

type SignInOutButtonProps = {
  type: "icon" | "icon&text";
  className?: string;
};

export default function SignInOutButton({
  type,
  className,
}: SignInOutButtonProps) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAccountUser();
  const { signOutAccount } = useSignOutAccount();

  function handleClick() {
    if (isAuthenticated) {
      signOutAccount();
    } else {
      navigate("/sign-in");
    }
  }

  return (
    <Button
      variant="ghost"
      className={cn(
        "group flex gap-3 items-center justify-start",
        type === "icon" && "p-2 rounded-full",
        className
      )}
      onClick={() => handleClick()}
    >
      {isAuthenticated ? (
        <LucideLogOut className="size-auto text-lime-400 group-hover:text-zinc-900" />
      ) : (
        <LucideLogIn className="size-auto text-lime-400 group-hover:text-zinc-900" />
      )}
      {type !== "icon" && (
        <p className="text-sm">{isAuthenticated ? "Logout" : "Login"}</p>
      )}
    </Button>
  );
}
