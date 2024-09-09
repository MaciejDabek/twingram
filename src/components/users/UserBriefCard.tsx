import { Link } from "react-router-dom";
import { IUser } from "../../types";
import FollowButton from "../shared/FollowButton";

type UserBriefCardProps = {
  user: IUser;
};

export default function UserBriefCard({ user }: UserBriefCardProps) {
  return (
    <div className="flex gap-3">
      <Link to={`/user/${user.$id}`} className="flex-shrink-0">
        <img
          src={user.imageUrl}
          className="size-12 rounded-full aspect-square"
        />
      </Link>
      <div>
        <Link to={`/user/${user.$id}`}>
          <p className="font-semibold">{user.name}</p>
        </Link>
        <Link to={`/user/${user.$id}`}>
          <p className="font-sm text-slate-400">@{user.username}</p>
        </Link>
      </div>
      <FollowButton followedId={user.$id} className="ml-auto" />
    </div>
  );
}
