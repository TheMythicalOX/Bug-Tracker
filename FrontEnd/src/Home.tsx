import Navbar from "./Components/Navbar";
import { useUserContext } from "./Context";

const Home = () => {
  const user = useUserContext();
  const handleLogOut = () => {
    // logout
    user.setIsLoggedIn(false);
  };
  const name = "Name";

  return (
    <>
      <div className="lg:grid grid-cols-12 max-h-screen">
        <Navbar disabled={"Home"} />
        <div className="lg:grid grid-rows-11 col-span-10">
          <div className="lg:grid grid-cols-3 row-span-1 text-center items-center bg-stone-900 ">
            <h3 className="">Logged in as {name}</h3>
            <h1>Home</h1>
            <button onClick={handleLogOut}>Log out</button>
          </div>
          <div className="lg:grid gap-5 p-5 grid-rows-2 grid-cols-2 row-span-10">
            <div className="shadow-lg hover:shadow-stone-900 transition-shadow duration-500 bg-stone-900 text-center items-center">
              Lorem ipsum dolor sit amet.
            </div>
            <div className="shadow-lg hover:shadow-stone-900 transition-shadow duration-500 bg-stone-900 text-center items-center">
              Lorem ipsum dolor sit amet.
            </div>
            <div className="shadow-lg hover:shadow-stone-900 transition-shadow duration-500 bg-stone-900 text-center items-center">
              Lorem ipsum dolor sit amet.
            </div>
            <div className="shadow-lg hover:shadow-stone-900 transition-shadow duration-500 bg-stone-900 text-center items-center">
              Lorem ipsum dolor sit amet.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
