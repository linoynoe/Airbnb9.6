import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import BusinessProfile from "./pages/BusinessProfile";
import Search from "./pages/Search";
import EditBusinessProfile from "./pages/EditBusinessProfile";

import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import AllProperties from "./pages/AllProperties";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditUserProfile";
export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/all-properties" element={<AllProperties />} />
        <Route element={<PrivateRoute />}>
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/user-profile" element={<UserProfile />} />

          <Route
            path="/edit-business-profile"
            element={<EditBusinessProfile />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
