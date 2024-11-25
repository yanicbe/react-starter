const Preloader = () => {
  return (
    <div className="flex justify-center w-full items-center bg-white p-8">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Preloader;
