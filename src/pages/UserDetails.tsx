import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import PostImageGrid from "../components/posts/PostImageGrid";
import Container from "../components/shared/Container";
import Loader from "../components/shared/Loader";
import { Button } from "../components/ui/button";
import { useUser } from "../lib/router/hooksUsers";
import FollowButton from "../components/shared/FollowButton";
import { cn } from "../lib/utils";
import { useAccountUser } from "../lib/router/hooksAuth";

export default function UserDetails() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { currentUser, isLoadingCurrentUser } = useAccountUser();
  const { user, isLoadingUser } = useUser();

  const isCurrentUserProfile = currentUser?.$id === user?.$id;

  return (
    <Container>
      <div className="w-full max-w-[880px]">
        {(isLoadingCurrentUser || isLoadingUser) && <Loader />}
        {user && (
          <>
            <div className="grid grid-cols-[auto_1fr_auto] gap-x-9 gap-y-5">
              <div className="row-span-2 md:row-span-3">
                <img
                  src={user.imageUrl}
                  className="size-24 md:size-32 rounded-full"
                />
              </div>
              <div>
                <p className="text-lg md:text-2xl font-semibold">{user.name}</p>
                <p className="text-xs md:text-base text-slate-400">
                  @{user.username}
                </p>
              </div>
              <div>
                {isCurrentUserProfile && (
                  <Button
                    onClick={() => navigate(`/edit-user/${currentUser?.$id}`)}
                  >
                    Edit profile
                  </Button>
                )}
                {currentUser && currentUser.$id !== user.$id && (
                  <FollowButton followedId={user.$id} />
                )}
              </div>
              <div className="col-span-2 flex gap-5">
                <p>
                  <span className="text-lime-400/90 font-semibold">
                    {user.posts?.length || 0}
                  </span>{" "}
                  posts
                </p>
                <p>
                  <span className="text-lime-400/90 font-semibold">
                    {user.followed?.length || 0}
                  </span>{" "}
                  followers
                </p>
                <p>
                  <span className="text-lime-400/90 font-semibold">
                    {user.follower?.length || 0}
                  </span>{" "}
                  following
                </p>
              </div>
              {user.bio && <div className="col-span-2">{user.bio}</div>}
            </div>

            <div className="w-full border-t border-zinc-600 flex justify-center gap-10 mt-8">
              {!isCurrentUserProfile && (
                <div className="text-sm font-semibold uppercase border-t border-zinc-400 px-1 py-3">
                  posts
                </div>
              )}
              {isCurrentUserProfile && (
                <>
                  <Link
                    to={`/user/${user?.$id}/`}
                    className={cn(
                      "text-sm font-semibold uppercase border-t-2 border-transparent px-1 py-3 text-zinc-400",
                      !pathname.endsWith("/liked") &&
                        !pathname.endsWith("/saved") &&
                        "border-white text-white"
                    )}
                  >
                    posts
                  </Link>
                  <Link
                    to={`/user/${user?.$id}/liked`}
                    className={cn(
                      "text-sm font-semibold uppercase border-t-2 border-transparent px-1 py-3 text-zinc-400",
                      pathname.endsWith("/liked") && "border-white text-white"
                    )}
                  >
                    liked
                  </Link>
                  <Link
                    to={`/user/${user?.$id}/saved`}
                    className={cn(
                      "text-sm font-semibold uppercase border-t-2 border-transparent px-1 py-3 text-zinc-400",
                      pathname.endsWith("/saved") && "border-white text-white"
                    )}
                  >
                    saved
                  </Link>
                </>
              )}
            </div>
          </>
        )}

        <Routes>
          <Route
            index
            element={<PostImageGrid posts={user?.posts || []} columns={3} />}
          />

          <Route
            path="/liked"
            element={
              <PostImageGrid
                posts={
                  currentUser?.likes
                    ?.filter((item) => item.post !== null)
                    .map((item) => item.post) || []
                }
                columns={3}
              />
            }
          />

          <Route
            path="/saved"
            element={
              <PostImageGrid
                posts={
                  currentUser?.saves
                    ?.filter((item) => item.post !== null)
                    .map((item) => item.post) || []
                }
                columns={3}
              />
            }
          />
        </Routes>
      </div>
    </Container>
  );
}
