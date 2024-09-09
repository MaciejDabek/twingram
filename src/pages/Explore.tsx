import { LucideCompass } from "lucide-react";

import PostImageGrid from "../components/posts/PostImageGrid";
import Container from "../components/shared/Container";
import InfiniteScroll from "../components/shared/InfiniteScroll";

import { useInfiniteExplorePosts } from "../lib/router/hooksPosts";

export default function Explore() {
  const { explorePosts, isLoadingExplorePosts, hasMorePosts, fetchMorePosts } =
    useInfiniteExplorePosts();

  return (
    <Container
      title="Explore"
      icon={<LucideCompass />}
      isLoading={isLoadingExplorePosts}
    >
      <div className="w-full max-w-[880px]">
        <PostImageGrid
          posts={explorePosts}
          columns={3}
          type="highlighted"
          postImageType="likes"
        />
      </div>
      <InfiniteScroll
        key={explorePosts.length}
        hasMore={hasMorePosts}
        fetchMore={fetchMorePosts}
        topMargin={300}
      />
    </Container>
  );
}
