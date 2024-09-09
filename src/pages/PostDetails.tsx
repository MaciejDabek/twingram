import Container from "../components/shared/Container";
import PostDetailsContent from "../components/posts/PostDetailsContent";

export default function PostDetails() {
  return (
    <Container>
      <div className="rounded-lg overflow-hidden border border-zinc-400">
        <PostDetailsContent />
      </div>
    </Container>
  );
}
