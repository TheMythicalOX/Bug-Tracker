import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import { useUserContext } from "./Context";

function App() {
  const user = useUserContext();

  return (
    <>
      <BrowserRouter>
        {!user.isLoggedIn &&
          window.location.pathname !== "/register" &&
          window.location.pathname !== "/login" && <Navigate to="/login" />}
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
