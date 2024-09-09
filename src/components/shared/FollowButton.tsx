import { useFollowsActions } from "../../lib/router/hooksFollows";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import Modal from "./Modal";
import { LucideTrash } from "lucide-react";
import DialogConfirm from "./DialogConfirm";
import { useEffect, useState } from "react";
import DialogSignin from "./DialogSignin";
import { useAccountUser } from "../../lib/router/hooksAuth";

type FollowButtonProps = {
  followedId: string;
  className?: string;
};

export default function FollowButton({
  followedId,
  className,
}: FollowButtonProps) {
  const [isFollowed, setIsFollowed] = useState(false);
  const { currentUser } = useAccountUser();
  const { addFollow, isAddingFollow, removeFollow, isRemovingFollow } =
    useFollowsActions();

  const isDisabled = isAddingFollow || isRemovingFollow;

  const follow = currentUser?.follower?.find(
    (follow) => follow.followed.$id === followedId
  );

  useEffect(
    function () {
      setIsFollowed(follow !== undefined);
    },
    [follow]
  );

  if (currentUser?.$id === followedId) return null;

  return (
    <Modal>
      {!currentUser && (
        <Modal.Trigger triggerModalId="sign-in">
          <Button
            variant="primary"
            size="sm"
            disabled={isDisabled}
            className={cn("group w-[100px]", className)}
          >
            Follow
          </Button>
        </Modal.Trigger>
      )}
      {currentUser && !isFollowed && (
        <Button
          variant="primary"
          size="sm"
          className={cn("group w-[100px]", className)}
          disabled={isDisabled}
          onClick={() => {
            if (follow) return;

            setIsFollowed(true);
            addFollow({ followerId: currentUser?.$id, followedId });
          }}
        >
          Follow
        </Button>
      )}
      {currentUser && isFollowed && (
        <Modal.Trigger triggerModalId="unfollow-confirm">
          <Button
            variant="secondary"
            size="sm"
            disabled={isDisabled}
            className={cn(
              "group w-[100px]",
              isFollowed && "hover:bg-red-400/90",
              className
            )}
          >
            <>
              <span className="block group-hover:hidden">Followed</span>
              <span className="hidden group-hover:block">Unfollow</span>
            </>
          </Button>
        </Modal.Trigger>
      )}

      <Modal.Content contentModalId="sign-in">
        <DialogSignin activity="follow users" />
      </Modal.Content>

      <Modal.Content contentModalId="unfollow-confirm">
        <DialogConfirm
          icon={<LucideTrash />}
          title="Unfollow"
          text="Are you sure you want to unfollow this creator?"
          confirmText="Unfollow"
          onConfirm={() => {
            if (!follow) return;

            setIsFollowed(false);
            removeFollow(follow.$id);
          }}
        />
      </Modal.Content>
    </Modal>
  );
}
