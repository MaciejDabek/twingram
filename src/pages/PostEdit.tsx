import { LucidePenSquare } from "lucide-react";
import PostForm from "../components/posts/PostForm";
import Container from "../components/shared/Container";

import { usePost } from "../lib/router/hooksPosts";

export default function PostEdit() {
  const { post, isLoadingPost } = usePost();

  return (
    <Container
      title="Edit Post"
      icon={<LucidePenSquare />}
      isLoading={isLoadingPost}
    >
      {post && <PostForm type="update" post={post} />}
    </Container>
  );
}
