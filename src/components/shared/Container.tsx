import { ReactNode } from "react";
import { cn } from "../../lib/utils";
import Loader from "./Loader";

type ContainerProps = {
  children: ReactNode;
  title?: string;
  icon?: ReactNode;
  isLoading?: boolean;
  className?: string;
};

export default function Container({
  children,
  title,
  icon,
  isLoading = false,
  className,
}: ContainerProps) {
  return (
    <div className="p-5 md:p-10 lg:p-12">
      <div
        className={cn(
          "h-full flex flex-col flex-1 items-center gap-5",
          className
        )}
      >
        {title && (
          <div className="w-full flex gap-3 justify-start items-center">
            {icon && <div className="text-3xl md:text-[30px]">{icon}</div>}
            <h2 className="h3 md:h2">{title}</h2>
          </div>
        )}
        {isLoading && <Loader />}
        {children}
      </div>
    </div>
  );
}
