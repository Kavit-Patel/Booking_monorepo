const Home = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div
        style={{ backgroundImage: "url('/images/restaurant.png')" }}
        className="w-full h-[calc(100vh-36px)] flex flex-col gap-4 text-white justify-center items-center"
      >
        <div className=" text-3xl md:text-4xl lg:text-5xl">
          Welcome to <span className="font-bold">Shushi</span> Restaurant
        </div>
        <div className="w-[65%] md:w-[58%] lg:w-[50%] text-center text-sm">
          People eat with their eyes and Sushi creates an easy way for customers
          to order when they can see beautiful photos of your food
        </div>
        <div className="text-black flex gap-3">
          <button className="bg-white w-24 py-2 rounded-sm font-mono transition-all hover:bg-slate-600 hover:text-white hover:font-semibold active:scale-95">
            About
          </button>
          <button className="bg-white w-24 py-2 rounded-sm font-mono transition-all hover:bg-slate-600 hover:text-white hover:font-semibold active:scale-95">
            Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
