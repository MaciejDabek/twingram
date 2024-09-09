import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

type LogoLinkProps = {
  size?: "base" | "lg";
  className?: string;
};

export default function LogoLink({ size = "base", className }: LogoLinkProps) {
  return (
    <Link to="/" className={cn("flex justify-start items-center", className)}>
      <img
        src="/twingram-icon.svg"
        className={cn("size-8", size === "lg" && "size-12")}
      />
      <p className={cn("text-xl font-bold ml-1", size === "lg" && "text-3xl")}>
        Twingram
      </p>
    </Link>
  );
}
