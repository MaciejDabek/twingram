import { NavLink, useLocation } from "react-router-dom";
import {
  LucideCirclePlus,
  LucideCompass,
  LucideSearch,
  LucideUsers,
} from "lucide-react";

import { cn } from "../../lib/utils";
import { useAccountUser } from "../../lib/router/hooksAuth";

const bottomBarLinks = [
  {
    icon: <LucideSearch />,
    route: "/search",
    label: "Search",
    auth: false,
  },
  {
    icon: <LucideCompass />,
    route: "/explore",
    label: "Explore",
    auth: false,
  },
  {
    icon: <LucideUsers />,
    route: "/creators",
    label: "Creators",
    auth: false,
  },
  {
    icon: <LucideCirclePlus />,
    route: "/create-post",
    label: "Create",
    auth: true,
  },
];

export default function BottomBar() {
  const { pathname } = useLocation();
  const { isAuthenticated } = useAccountUser();

  return (
    <footer className="sticky md:hidden bottom-0 z-50 bg-zinc-950 w-full">
      <ul className="flex justify-evenly items-center px-5 py-3">
        {bottomBarLinks
          .filter((item) => !item.auth || isAuthenticated)
          .map((item) => (
            <NavLink
              key={item.route}
              to={item.route}
              className={cn(
                "group px-4 py-2 rounded-lg hover:bg-lime-400/80",
                "flex flex-col gap-1 items-center",
                item.route === pathname && "bg-lime-400/90"
              )}
            >
              <div
                className={cn(
                  "text-[24px] text-lime-400 group-hover:text-lime-950",
                  item.route === pathname && "text-lime-950"
                )}
              >
                {item.icon}
              </div>
              <p
                className={cn(
                  "text-xs text-lime-50 group-hover:text-zinc-900",
                  item.route === pathname && "text-lime-950"
                )}
              >
                {item.label}
              </p>
            </NavLink>
          ))}
      </ul>
    </footer>
  );
}
