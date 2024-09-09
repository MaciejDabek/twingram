import { LucideSquarePen } from "lucide-react";
import Container from "../components/shared/Container";
import UserForm from "../components/users/UserForm";

import { useUser } from "../lib/router/hooksUsers";

export default function UserEdit() {
  const { user, isLoadingUser } = useUser();

  return (
    <Container
      title="Edit User"
      icon={<LucideSquarePen />}
      isLoading={isLoadingUser}
    >
      {user && <UserForm user={user} />}
    </Container>
  );
}
