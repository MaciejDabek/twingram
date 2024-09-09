import { LucideCirclePlus } from "lucide-react";
import PostForm from "../components/posts/PostForm";
import Container from "../components/shared/Container";

export default function PostCreate() {
  return (
    <Container title="Create Post" icon={<LucideCirclePlus />}>
      <PostForm type="create" />
    </Container>
  );
}
