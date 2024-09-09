import { cloneElement, ReactElement, ReactNode } from "react";

type DialogProps = {
  children?: ReactNode;
  icon?: ReactElement;
  title: string;
  text: string;
};

export default function Dialog({ children, icon, title, text }: DialogProps) {
  return (
    <div className="space-y-2">
      <p className="flex gap-3 text-xl mb-2">
        {icon && cloneElement(icon, { className: "size-auto" })}
        <span>{title}</span>
      </p>
      <p className="text-base text-light-2 text-center mt-1">{text}</p>
      {children && children}
    </div>
  );
}
