import React from "react";
import { NavLink } from "react-router-dom";
const NavBar = () => {
  //   const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="Navbar">
      <span className="nav-logo">NFTPitStop</span>
      <div className="nav-items">
        <NavLink className="navBar--links" to="/">
          Home
        </NavLink>
        <NavLink className="navBar--links" to="/nft">
          NFT
        </NavLink>
        <NavLink className="navBar--links" to="/watchlistpage">
          Watch List
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
