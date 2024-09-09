import { Link } from "react-router-dom";
import { parsePublishedDate } from "../../lib/utils";
import { IPost, IUser } from "../../types";
import PostCardActions from "./PostCardActions";

type PostCardProps = {
  post: IPost;
  currentUser: IUser | undefined;
};
export default function PostCard({ post, currentUser }: PostCardProps) {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 pb-2 max-w-[600px]">
      <div className="flex items-center gap-2 px-3 mb-3">
        <Link to={`/user/${post.creator.$id}`}>
          <img src={post.creator.imageUrl} className="size-12 rounded-full" />
        </Link>
        <div className="flex-1">
          <Link to={`/user/${post.creator.$id}`}>
            <p className="text-base font-semibold text-zinc-50">
              {post.creator.name}
            </p>
          </Link>
          <p className="text-sm text-slate-400">
            {parsePublishedDate(post.$createdAt)} • @{post.creator.username}
          </p>
        </div>
      </div>
      <p className="">{post.caption}</p>
      <p className="text-slate-400 mb-3">{post.tags.map((s) => `#${s}   `)}</p>
      <img src={post.imageUrl} className="rounded-xl mb-1 w-full" />
      <PostCardActions post={post} currentUser={currentUser} />
    </div>
  );
}
