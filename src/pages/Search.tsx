import { LucideSearch } from "lucide-react";

import PostImageGrid from "../components/posts/PostImageGrid";
import Container from "../components/shared/Container";
import SearchBar from "../components/shared/SearchBar";
import Loader from "../components/shared/Loader";

import { useInfiniteSearchPosts } from "../lib/router/hooksPosts";

export default function Search() {
  const { searchPosts, isLoadingSearchPosts } = useInfiniteSearchPosts();

  return (
    <Container title="Search" icon={<LucideSearch />}>
      <SearchBar />
      {isLoadingSearchPosts && <Loader />}

      <div className="w-full max-w-[880px]">
        {searchPosts && (
          <PostImageGrid
            posts={searchPosts}
            columns={2}
            postImageType="verbose"
          />
        )}
      </div>
    </Container>
  );
}
