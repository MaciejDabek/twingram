import { Link } from "react-router-dom";

import Loader from "./Loader";

import { useAccountUser } from "../../lib/router/hooksAuth";
import { cn } from "../../lib/utils";

type AvatarLinkProps = {
  type: "image" | "image&details";
};

export default function AvatarLink({ type }: AvatarLinkProps) {
  const { isAuthenticated, currentUser } = useAccountUser();

  if (!isAuthenticated) return null;

  if (!currentUser) return <Loader />;

  return (
    <Link
      to={`/user/${currentUser?.$id}`}
      className="flex justify-start items-center gap-3"
    >
      <img
        src={currentUser?.imageUrl}
        className={cn(
          "rounded-full",
          type === "image" && "size-8",
          type === "image&details" && "size-10"
        )}
      />
      {type.includes("details") && (
        <div className="">
          <p className="text-sm font-bold">{currentUser?.name}</p>
          <p className="text-xs text-light-3">@{currentUser?.username}</p>
        </div>
      )}
    </Link>
  );
}
