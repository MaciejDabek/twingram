import { NavLink, useLocation } from "react-router-dom";
import {
  LucideCompass,
  LucideHome,
  LucidePlusCircle,
  LucideSearch,
  LucideUsers,
} from "lucide-react";

import AvatarLink from "./AvatarLink";
import LogoLink from "./LogoLink";
import SignInOutButton from "./SignInOutButton";

import { useAccountUser } from "../../lib/router/hooksAuth";
import { cn } from "../../lib/utils";

const leftBarLinks = [
  {
    icon: <LucideHome />,
    route: "/",
    label: "Home",
    auth: false,
  },
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
    icon: <LucidePlusCircle />,
    route: "/create-post",
    label: "Create Post",
    auth: true,
  },
];

export default function LeftBar() {
  const { pathname } = useLocation();
  const { isAuthenticated } = useAccountUser();

  return (
    <aside className="hidden md:block sticky top-0 left-0 h-full w-min-[280px] w-auto bg-dark-2">
      <div className="h-full w-auto flex flex-col gap-5 px-4 py-5">
        <LogoLink />
        <AvatarLink type="image&details" />

        <ul className="flex flex-col gap-3">
          {leftBarLinks
            .filter((item) => !item.auth || isAuthenticated)
            .map((item) => (
              <NavLink
                key={item.route}
                to={item.route}
                className={cn(
                  "group px-4 py-2 rounded-lg hover:bg-lime-400/80",
                  "flex gap-3 justify-start items-center",
                  item.route === pathname && "bg-lime-400/90"
                )}
              >
                <div
                  className={cn(
                    "text-[30px] text-lime-400 group-hover:text-lime-950",
                    item.route === pathname && "text-lime-950"
                  )}
                >
                  {item.icon}
                </div>
                <p
                  className={cn(
                    "text-base text-lime-50 group-hover:text-zinc-900",
                    item.route === pathname && "text-lime-950"
                  )}
                >
                  {item.label}
                </p>
              </NavLink>
            ))}
        </ul>

        <SignInOutButton type="icon&text" className="mt-auto" />
      </div>
    </aside>
  );
}
