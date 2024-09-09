import { LucideUsers } from "lucide-react";

import Container from "../components/shared/Container";
import InfiniteScroll from "../components/shared/InfiniteScroll";
import UserCard from "../components/users/UserCard";

import { useInfiniteUsers } from "../lib/router/hooksUsers";

export default function Creators() {
  const { users, isLoadingUsers, hasMoreUsers, fetchMoreUsers } =
    useInfiniteUsers();

  return (
    <Container
      title="Creators"
      icon={<LucideUsers />}
      isLoading={isLoadingUsers}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-[880px]">
        {users.map((user) => (
          <UserCard key={user.$id} user={user} />
        ))}
        <InfiniteScroll
          key={users.length}
          hasMore={hasMoreUsers}
          fetchMore={fetchMoreUsers}
          topMargin={200}
        />
      </div>
    </Container>
  );
}
