import { useEffect, useState } from "react";
import { useLikesActions } from "../../lib/router/hooksLikes";
import { useSavesActions } from "../../lib/router/hooksSaves";
import { IPost, IUser } from "../../types";
import { LucideBookmark, LucideHeart } from "lucide-react";
import { cn } from "../../lib/utils";
import Modal from "../shared/Modal";
import DialogSignin from "../shared/DialogSignin";
import { Button } from "../ui/button";

type PostCardActionsProps = {
  post: IPost;
  currentUser?: IUser | undefined;
  className?: string;
};

export default function PostCardActions({
  post,
  currentUser,
  className,
}: PostCardActionsProps) {
  const { addLikeAsync, removeLikeAsync } = useLikesActions();
  const { addSaveAsync, removeSaveAsync } = useSavesActions();

  const [likesNum, setLikesNum] = useState<number>(post.likes?.length || 0);

  const postLikedByUser = post?.likes?.find(
    (like) => like.user.$id === currentUser?.$id
  );
  const [isLiked, setIsLiked] = useState<boolean>(
    postLikedByUser !== undefined
  );
  const [isModifyingLike, setIsModifyingLike] = useState(false);

  const postSavedByUser = post?.saves?.find(
    (save) => save.user.$id === currentUser?.$id
  );
  const [isSaved, setIsSaved] = useState<boolean>(
    postSavedByUser !== undefined
  );
  const [isModifyingSave, setIsModifyingSave] = useState(false);

  useEffect(
    function () {
      setIsLiked(postLikedByUser !== undefined);
      setIsSaved(postSavedByUser !== undefined);
    },
    [postLikedByUser, postSavedByUser]
  );

  useEffect(
    function () {
      setLikesNum(post.likes?.length || 0);
    },
    [post.likes, setLikesNum]
  );

  async function handleLike() {
    if (!currentUser) return;

    if (isModifyingLike) return;

    try {
      setIsModifyingLike(true);
      if (isLiked) {
        setIsLiked(false);
        setLikesNum((n) => n - 1);
        await removeLikeAsync({
          likeId: postLikedByUser?.$id || null,
          userId: currentUser.$id,
          postId: post.$id,
        });
      } else {
        setIsLiked(true);
        setLikesNum((n) => n + 1);
        await addLikeAsync({ userId: currentUser.$id, postId: post.$id });
      }
    } finally {
      setIsModifyingLike(false);
    }
  }

  async function handleSave() {
    if (!currentUser) return;

    if (isModifyingSave) return;

    try {
      setIsModifyingSave(true);
      if (isSaved) {
        setIsSaved(false);
        if (postSavedByUser) await removeSaveAsync(postSavedByUser.$id);
      } else {
        setIsSaved(true);
        await addSaveAsync({ userId: currentUser.$id, postId: post.$id });
      }
    } finally {
      setIsModifyingSave(false);
    }
  }

  return (
    <Modal>
      <div className={cn("flex justify-between items-center px-3", className)}>
        <div className="flex items-center gap-1 ">
          <Modal.Trigger
            triggerModalId="like-sign-in"
            disabled={currentUser !== undefined}
            disabledOnClick={() => {
              handleLike();
            }}
          >
            <Button variant="shell" size="none" disabled={isModifyingLike}>
              <LucideHeart
                className={cn(
                  "size-9 cursor-pointer text-lime-400",
                  "p-2 rounded-full hover:bg-zinc-900",
                  isLiked && "text-red-500 fill-red-500"
                )}
              />
            </Button>
          </Modal.Trigger>
          <span className="text-sm">{likesNum}</span>
        </div>
        <Modal.Trigger
          triggerModalId="save-sign-in"
          disabled={currentUser !== undefined}
          disabledOnClick={() => {
            handleSave();
          }}
        >
          <Button variant="shell" size="none" disabled={isModifyingSave}>
            <LucideBookmark
              className={cn(
                "size-9 cursor-pointer text-lime-400",
                "p-2 rounded-full hover:bg-zinc-900",
                isSaved && "fill-lime-400/90"
              )}
            />
          </Button>
        </Modal.Trigger>
      </div>

      <Modal.Content contentModalId="like-sign-in">
        <DialogSignin activity="like posts" />
      </Modal.Content>

      <Modal.Content contentModalId="save-sign-in">
        <DialogSignin activity="save-posts" />
      </Modal.Content>
    </Modal>
  );
}
