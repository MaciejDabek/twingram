import { cn } from "../../lib/utils";
import { IPost } from "../../types";
import PostImage, { PostImageType } from "./PostImage";

type PostImageGridProps = {
  posts: IPost[];
  columns: 2 | 3;
  type?: "even" | "highlighted";
  postImageType?: PostImageType;
};

// type === "explore" &&  && "col-span-2 row-span-2",
// type === "explore" && (index + 6) % 12 === 4 && "col-span-2 row-span-2"

export default function PostImageGrid({
  posts,
  columns,
  type = "even",
  postImageType = "default",
}: PostImageGridProps) {
  const shouldHighlight = (index: number) => {
    if (type !== "highlighted") return false;

    if (columns === 3) {
      return index % 12 === 3 || (index + 6) % 12 === 4;
    }

    if (columns === 2) {
      return (index - 2) % 5 === 0;
    }
  };

  return (
    <div
      className={cn(
        "grid gap-2",
        columns === 2 && "grid-cols-2",
        columns === 3 && "grid-cols-3"
      )}
    >
      {posts.map((post, index) => (
        <PostImage
          key={post.$id}
          post={post}
          type={postImageType}
          highlight={shouldHighlight(index)}
        />
      ))}
    </div>
  );
}
