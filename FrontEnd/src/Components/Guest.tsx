import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

type GuestPages = "login" | "register";

const Guest = () => {
  const [changePage, setChangePage] = useState<GuestPages>("login");
  return (
    <>
      {changePage === "login" && <Login setChangePage={setChangePage} />}
      {changePage === "register" && <Register setChangePage={setChangePage} />}
    </>
  );
};

export default Guest;
