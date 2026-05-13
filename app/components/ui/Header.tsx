import { BellDot, Link } from "lucide-react";
import Logo from "./Logo";

const Header = () => {
  return (
    <div className="flex justify-between px-3 py-4">
      <Logo width={100} />
      <div className="flex gap-2">
        <select name="City" id="city-selection">
          <option value="Delhi"></option>
          <option value="Bengaluru"></option>
          <option value="Mumbai"></option>
          <option value="Pune"></option>
        </select>

        <BellDot />
      </div>
    </div>
  );
};

export default Header;
