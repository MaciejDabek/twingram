import { LucideLogIn } from "lucide-react";
import Dialog from "./Dialog";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";

type DialogSigninProps = {
  activity: string;
};

export default function DialogSignin({ activity }: DialogSigninProps) {
  const navigate = useNavigate();

  return (
    <Dialog
      icon={<LucideLogIn />}
      title="Account required"
      text={`You need to be signed in to ${activity}`}
    >
      <div className="flex flex-col items-center space-y-2">
        <Button variant="primary" onClick={() => navigate("/sign-in")}>
          Sign in
        </Button>
        <p className="text-sm text-zinc-400 mt-5">
          Don't have an account?
          <Link to="/sign-up" className="text-lime-400/90 ml-1">
            Sign&nbsp;up
          </Link>
        </p>
      </div>
    </Dialog>
  );
}
