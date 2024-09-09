import { Route, Routes, useLocation } from "react-router-dom";

import { Toaster } from "./components/ui/toaster";

import AuthLayout from "./layouts/AuthLayout";
import SingInForm from "./components/auth/SigninForm";
import SignupForm from "./components/auth/SignupForm";

import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Explore from "./pages/Explore";
import Creators from "./pages/Creators";
import CreatePost from "./pages/PostCreate";
import PostDetails from "./pages/PostDetails";
import PostEdit from "./pages/PostEdit";
import UserDetails from "./pages/UserDetails";
import UserEdit from "./pages/UserEdit";
import NotFound from "./pages/NotFound";
import PostDetailsModal from "./components/posts/PostDetailsModal";

export default function App() {
  const location = useLocation();

  const state = location.state as { backgroundLocation?: Location };

  return (
    <div>
      <Routes location={state?.backgroundLocation || location}>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SingInForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/post/:postId" element={<PostDetails />} />
          <Route path="/edit-post/:postId" element={<PostEdit />} />
          <Route path="/user/:userId/*" element={<UserDetails />} />
          <Route path="/edit-user/:userId" element={<UserEdit />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/p/:postId" element={<PostDetailsModal />} />
        </Routes>
      )}

      <Toaster />
    </div>
  );
}
