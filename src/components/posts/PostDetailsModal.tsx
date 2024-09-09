import { LucideX } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useOnClickOutside } from "usehooks-ts";
import PostDetailsContent from "./PostDetailsContent";

export default function PostDetailsModal() {
  const insideRef = useRef(null);
  const navigate = useNavigate();
  useOnClickOutside(insideRef, () => navigate(-1));

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-zinc-950/40 backdrop-blur z-50 transition-all">
      <LucideX className="fixed size-10 top-5 right-5 text-zinc-400 transition-all" />
      <div
        ref={insideRef}
        className="flex overflow-hidden fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-zinc-950 border border-zinc-800 transition-all max-w-[440px] md:max-w-[90%] max-h-[90%] md:aspect-video w-full"
      >
        <PostDetailsContent />
      </div>
    </div>
  );
}
