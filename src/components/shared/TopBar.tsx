import AvatarLink from "./AvatarLink";
import LogoLink from "./LogoLink";
import SignInOutButton from "./SignInOutButton";

export default function TopBar() {
  return (
    <header className="z-50 md:hidden bg-zinc-950 h-[72px]">
      <div className="flex justify-between items-center px-5 py-4">
        <LogoLink />

        <div className="flex justify-center items-center gap-4">
          <SignInOutButton type="icon" />
          <AvatarLink type="image" />
        </div>
      </div>
    </header>
  );
}
