import { useInView } from "react-intersection-observer";
import Loader from "./Loader";

type InfiniteScrollProps = {
  hasMore: boolean;
  fetchMore: () => void;
  topMargin?: number;
};

export default function InfiniteScroll({
  hasMore,
  fetchMore,
  topMargin = 0,
}: InfiniteScrollProps) {
  const { ref } = useInView({
    rootMargin: `${topMargin}px`,
    triggerOnce: true,
    onChange: (inView) => {
      if (inView) {
        fetchMore();
      }
    },
  });

  if (!hasMore) return null;

  return (
    <div ref={ref} className="col-span-full">
      <Loader />
    </div>
  );
}
