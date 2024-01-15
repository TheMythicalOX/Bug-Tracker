const Navbar = () => {
  return (
    <div className="bg-stone-900 col-span-2 lg:h-screen lg:grid grid-rows-11">
      <div className="lg:grid shadow row-span-1 text-center items-center ">
        <h1>Logo</h1>
      </div>
      <div className="lg:grid shadow shadow-stone-950 row-span-1 text-center items-center transition-colors duration-500 hover:bg-stone-950">
        <h2>Home</h2>
      </div>
      <div className="lg:grid shadow shadow-stone-950 row-span-1 text-center items-center transition-colors duration-500 hover:bg-stone-950">
        <h2>Projects</h2>
      </div>
      <div className="lg:grid shadow shadow-stone-950 row-span-1 text-center items-center transition-colors duration-500 hover:bg-stone-950">
        <h2>Tickets</h2>
      </div>
      <div className="lg:grid shadow shadow-stone-950 row-span-1 text-center items-center transition-colors duration-500 hover:bg-stone-950">
        <h2>Account</h2>
      </div>
      <div className="lg:grid shadow shadow-stone-950 row-span-1 text-center items-center transition-colors duration-500 hover:bg-stone-950">
        <h2>Account</h2>
      </div>
      <div className="row-span-5"></div>
    </div>
  );
};

export default Navbar;
