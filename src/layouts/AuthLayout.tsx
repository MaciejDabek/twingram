import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <section className="flex flex-col flex-1 justify-center items-center py-10">
        <Outlet />
      </section>
    </>
  );
}
