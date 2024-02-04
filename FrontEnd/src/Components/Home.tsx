import { useUserContext } from "./Context";

const Home = () => {
  const user = useUserContext();
  return (
    <div className="grid grid-cols-2 gap-2 p-2 grid-rows-2 h-full">
      <div className={`bg-stone-300`}>{user.user.name}</div>
      <div className={`bg-stone-300`}>{user.user.name}</div>
      <div className={`bg-stone-300`}>{user.user.name}</div>
      <div className={`bg-stone-300`}>{user.user.name}</div>
    </div>
  );
};

export default Home;
