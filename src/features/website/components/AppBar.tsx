export const AppBar = () => {
  return (
    <div className="flex justify-between text-black">
      <div className="flex flex-col text-gray-800">
        <h1 className="text-3xl md:text-5xl font-bold">Forex Exchange</h1>
        <span className="flex space-x-2 text-xs md:text-sm">
          Check out the current price for a currency pair
        </span>
      </div>
    </div>
  );
};
