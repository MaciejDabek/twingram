import { Link, useNavigate } from "react-router-dom";
import { LucideMapPin, LucideSquarePen, LucideTrash } from "lucide-react";

import Loader from "../shared/Loader";
import PostCardActions from "./PostCardActions";
import FollowButton from "../shared/FollowButton";
import Modal from "../shared/Modal";
import DialogConfirm from "../shared/DialogConfirm";
import { Button } from "../ui/button";

import { useDeletePost, usePost } from "../../lib/router/hooksPosts";
import { useAccountUser } from "../../lib/router/hooksAuth";

export default function PostDetailsContent() {
  const navigate = useNavigate();
  const { currentUser } = useAccountUser();
  const { post, isLoadingPost } = usePost();
  const { deletePost } = useDeletePost();

  if (isLoadingPost) return <Loader />;

  if (!post) return <div>Error</div>;

  return (
    <Modal>
      <div className="grid grid-cols-1 grid-rows-[auto_1fr_auto_auto] md:grid-cols-[3fr_2fr] md:grid-rows-[auto_1fr_auto] flex-1">
        <div className="flex flex-wrap items-center gap-3 md:order-1 m-5">
          <Link to={`/user/${post.creator.$id}`} className="flex-shrink-0">
            <img src={post.creator.imageUrl} className="size-14 rounded-full" />
          </Link>
          <div>
            <Link to={`/user/${post.creator.$id}`}>
              <p>{post.creator.name}</p>
            </Link>
            <Link to={`/user/${post.creator.$id}`}>
              <p>{post.creator.username}</p>
            </Link>
          </div>
          <div className="flex gap-3 ml-auto">
            {post.creator.$id === currentUser?.$id && (
              <>
                <Link to={`/edit-post/${post.$id}`}>
                  <LucideSquarePen className="size-5 md:size-6 text-yellow-400/90" />
                </Link>
                {/* <Modal.Trigger triggerModalId="post-delete-confirm"> */}
                <Button
                  variant="shell"
                  size="none"
                  onClick={() => {
                    deletePost({ postId: post.$id, imageId: post.imageId });
                    navigate(-1);
                  }}
                >
                  <LucideTrash className="size-5 md:size-6 text-red-400/90" />
                </Button>
                {/* </Modal.Trigger> */}
              </>
            )}
            <FollowButton followedId={post.creator.$id} />
          </div>
        </div>

        <img
          src={post.imageUrl}
          className="w-full h-full object-cover md:row-span-3"
        />

        <div className="md:order-2 mx-5 mt-2">
          <p>{post.caption}</p>
          <p className="text-slate-400">
            {post.tags.map((t) => `#${t}`).join(" ")}
          </p>
          <p className="flex items-center gap-1">
            <LucideMapPin className="size-4" />
            {post.location}
          </p>
        </div>
        <PostCardActions
          post={post}
          currentUser={currentUser}
          className="order-3 mb-2"
        />
      </div>

      <Modal.Content contentModalId="post-delete-confirm">
        <DialogConfirm
          icon={<LucideTrash />}
          title="Delete post"
          text="Are you sure you want to delete this post?"
          confirmText="Delete"
          onConfirm={() => {
            deletePost({ postId: post.$id, imageId: post.imageId });
          }}
        />
      </Modal.Content>
    </Modal>
  );
}
