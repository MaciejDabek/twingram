import { Link } from "react-router-dom";
import { IUser } from "../../types";
import FollowButton from "../shared/FollowButton";

type UserCardProps = {
  user: IUser;
};

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="flex flex-col justify-center items-center w-full w-max-[150px] p-4 rounded-xl bg-zinc-950 border border-zinc-800 ">
      <Link to={`/user/${user.$id}`}>
        <div className="size-32 md:size-40 mb-2">
          <img src={user.imageUrl} className="w-full h-auto rounded-full" />
        </div>
      </Link>
      <Link to={`/user/${user.$id}`}>
        <p className="text-lg md:text-2xl font-semibold">{user.name}</p>
      </Link>
      <Link to={`/user/${user.$id}`}>
        <p className="text-xs md:text-base text-slate-400 mb-2">
          @{user.username}
        </p>
      </Link>
      <FollowButton followedId={user.$id} />
    </div>
  );
}
