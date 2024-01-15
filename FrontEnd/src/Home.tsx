import Navbar from "./Components/Navbar";

const Home = () => {
  return (
    <div className="lg:grid grid-cols-12">
      <Navbar />
      <div className="col-span-10">
        <div className="lg:grid gap-4 grid-cols-2 h-screen">
          <div className="bg-red-800">1</div>
          <div className="bg-red-700">2</div>
          <div className="bg-red-600">3</div>
          <div className="bg-red-500">4</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
