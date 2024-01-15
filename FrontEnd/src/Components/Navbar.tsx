const Navbar = (props: { disabled: string }) => {
  const disabled = props.disabled;
  return (
    <div className="bg-stone-900 col-span-2 lg:h-screen lg:grid grid-rows-11">
      <div className="lg:grid row-span-1 text-center items-center ">
        <h1>Logo</h1>
      </div>
      {disabled !== "Home" && (
        <div className="lg:grid shadow shadow-stone-950 row-span-1 text-center items-center transition-colors duration-500 hover:bg-stone-950">
          <h2>Home</h2>
        </div>
      )}
      {disabled === "Home" && (
        <div className="lg:grid row-span-1 bg-stone-950 text-center items-center">
          <h2>Home</h2>
        </div>
      )}
      {disabled !== "Projects" && (
        <div className="lg:grid shadow shadow-stone-950 row-span-1 text-center items-center transition-colors duration-500 hover:bg-stone-950">
          <h2>Projects</h2>
        </div>
      )}
      {disabled === "Projects" && (
        <div className="lg:grid row-span-1 bg-stone-950 text-center items-center">
          <h2>Projects</h2>
        </div>
      )}
      {disabled !== "Tickets" && (
        <div className="lg:grid shadow shadow-stone-950 row-span-1 text-center items-center transition-colors duration-500 hover:bg-stone-950">
          <h2>Tickets</h2>
        </div>
      )}
      {disabled === "Tickets" && (
        <div className="lg:grid row-span-1 bg-stone-950 text-center items-center">
          <h2>Tickets</h2>
        </div>
      )}
      {disabled !== "Account" && (
        <div className="lg:grid shadow shadow-stone-950 row-span-1 text-center items-center transition-colors duration-500 hover:bg-stone-950">
          <h2>Account</h2>
        </div>
      )}
      {disabled === "Account" && (
        <div className="lg:grid row-span-1 bg-stone-950 text-center items-center">
          <h2>Account</h2>
        </div>
      )}
      {disabled !== "Info" && (
        <div className="lg:grid shadow shadow-stone-950 row-span-1 text-center items-center transition-colors duration-500 hover:bg-stone-950">
          <h2>Info</h2>
        </div>
      )}
      {disabled === "Info" && (
        <div className="lg:grid row-span-1 bg-stone-950 text-center items-center">
          <h2>Info</h2>
        </div>
      )}
      <div className="row-span-5"></div>
    </div>
  );
};

export default Navbar;
