'use client'
const WelcomeScreen = () => {
  return (
    <div className="flex flex-col items-center max-w-[50%] justify-center h-full gap-10">
        {/* Logo */}
        <h1 className="text-center font-bold">Loco</h1>
        <ul className="text-center text-3xl font-semibold">
            <li>Your City</li>
            <li>Your Vibe</li>
            <li>Your Loco</li>
        </ul>
        <p className="text-center w-[60%] text-gray-500">
            Discover exciting events, iconic places , local markets and hidden gems around you
        </p>
        {/* <img src="" alt="" /> */}
        <button className=" rounded-full px-10 py-3 w-[50%] self-center-safe text-2xl">Let's Loco!</button>
    </div>
  )
}

export default WelcomeScreen