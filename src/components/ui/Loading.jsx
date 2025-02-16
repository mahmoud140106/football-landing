const Loading = ({ height = "h-screen" }) => {
    return (
      <div className={`flex justify-center text-green-500 items-center ${height} text-3xl space-x-2 gap-5`}>
        loading
        <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-150"></div>
        <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-300"></div>
      </div>
    );
  };
  
  export default Loading;
  