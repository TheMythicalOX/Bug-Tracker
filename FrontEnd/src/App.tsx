import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import { useUserContext } from "./Context";

function App() {
  const user = useUserContext();
  const location = useLocation();

  return (
    <>
      {!user.isLoggedIn &&
        location.pathname !== "/register" &&
        location.pathname !== "/login" && <Navigate to="/login" />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
