import { Link, useLocation } from "react-router-dom";
import { IPost } from "../../types";
import { cn } from "../../lib/utils";

export type PostImageType = "default" | "likes" | "verbose";

type PostImageProps = {
  post: IPost;
  type?: PostImageType;
  highlight?: boolean;
};

export default function PostImage({
  post,
  type = "default",
  highlight = false,
}: PostImageProps) {
  const location = useLocation();

  return (
    <Link
      key={post.$id}
      to={`/p/${post.$id}`}
      state={{ backgroundLocation: location }}
      className={cn(
        "relative group w-full aspect-square overflow-hidden flex justify-center items-center",
        highlight && "col-span-2 row-span-2"
      )}
    >
      <img src={post.imageUrl} className="w-full h-full object-cover" />

      <div
        className={cn(
          "absolute hidden group-hover:flex w-full h-full bg-zinc-950/40",
          type === "likes" && "justify-center items-center",
          type === "verbose" && "p-2 md:p-4 flex-col justify-between"
        )}
      >
        {type === "likes" && (
          <p className="text-lg md:text-2xl">♥ {post?.likes?.length || 0}</p>
        )}
        {type === "verbose" && (
          <>
            <div className="flex items-center gap-2 md:gap-4">
              <img
                src={post.creator.imageUrl}
                className="size-9 md:size-14 rounded-full"
              />
              <p className="text-sm md:text-2xl font-semibold">
                {post.creator.name}
              </p>
            </div>
            <div>
              <p className="text-sm md:text-base line-clamp-2">
                {post.caption}
              </p>
              <p className="text-xs md:text-sm line-clamp-1 text-slate-200">
                {post.tags.map((s) => `#${s}`).join(" ")}
              </p>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
