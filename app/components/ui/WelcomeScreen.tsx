const WelcomeScreen = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-white px-6">
      <img src="/assets/logo.avif" alt="Loco" className="w-36 md:w-44" />

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
          Your city. Your events. <span className="text-accent">Your Loco.</span>
        </h1>
        <p className="max-w-md text-sm text-gray-500">
          Find concerts, markets, food pop-ups and things happening around you.
        </p>
      </div>

      <div className="h-0.5 w-28 overflow-hidden rounded-full bg-gray-200">
        <div className="h-full w-1/2 animate-pulse bg-accent" />
      </div>
    </div>
  );
};

export default WelcomeScreen;
