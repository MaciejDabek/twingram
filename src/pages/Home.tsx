import { LucideHome, LucideUsers } from "lucide-react";

import PostCard from "../components/posts/PostCard";
import UserBriefCard from "../components/users/UserBriefCard";
import Loader from "../components/shared/Loader";
import InfiniteScroll from "../components/shared/InfiniteScroll";

import { useAccountUser } from "../lib/router/hooksAuth";
import { useInfiniteRecentPosts } from "../lib/router/hooksPosts";
import { useRandomUsers } from "../lib/router/hooksUsers";

export default function Home() {
  const { currentUser } = useAccountUser();
  const { recentPosts, isLoadingRecentPosts, fetchMorePosts, hasMorePosts } =
    useInfiniteRecentPosts();
  const { randomUsers, isLoadingRandomUsers } = useRandomUsers();

  const filteredRandomUsers = randomUsers.filter(
    (user) => user.$id !== currentUser?.$id
  );

  return (
    <div className="w-full h-full xl:grid grid-cols-[5fr_3fr]">
      <div className="flex flex-col items-center gap-8 p-5 md:p-10 lg:p-14 md:overflow-scroll">
        <div className="w-full flex gap-3 justify-start items-center">
          <LucideHome className="text-[24px] md:text-[30px]" />
          <h2 className="h3 md:h2">Feed</h2>
        </div>
        {isLoadingRecentPosts && <Loader />}
        {recentPosts.map((post) => (
          <PostCard key={post.$id} post={post} currentUser={currentUser} />
        ))}
        <InfiniteScroll
          key={recentPosts.length}
          hasMore={hasMorePosts}
          fetchMore={() => {
            fetchMorePosts({ cancelRefetch: false });
          }}
          topMargin={500}
        />
      </div>
      <div className="hidden xl:flex flex-col gap-8 p-5 md:p-10 lg:p-14 md:overflow-scroll">
        <div className="w-full flex gap-3 justify-start items-center">
          <LucideUsers className="text-[24px] md:text-[30px]" />
          <h2 className="h3 md:h2">Creators</h2>
        </div>
        {isLoadingRandomUsers && <Loader />}
        {filteredRandomUsers.map((user) => (
          <UserBriefCard key={user.$id} user={user} />
        ))}
      </div>
    </div>
  );
}
