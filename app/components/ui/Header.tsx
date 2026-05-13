import { BellDot, Link, MapPin } from "lucide-react";
import Logo from "./Logo";

const Header = () => {
  return (
    <div className="flex justify-between px-3 py-4 items-center">
      <Logo width={100} />
      <div className="flex gap-2 items-center">
        <MapPin style={{fill: "pink"}}/>
        <select name="City" id="city-selection rounded" className="rounded-full p-2">
          <option value="Delhi">Delhi</option>
          <option value="Bengaluru">Bengaluru</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Pune">Pune</option>
        </select>

        <BellDot />
      </div>
    </div>
  );
};

export default Header;
