const Loader = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      <p className="mt-2">Loading...</p>
    </div>
  );
};


export default Loader;
