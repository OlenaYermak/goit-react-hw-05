import { NavLink } from "react-router-dom";

import css from "./Navigation.module.css"
import clsx from "clsx";

const getNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <nav className={css.nav}>
      <NavLink className={getNavLinkClass} to="/" >
        Home
      </NavLink>
      <NavLink className={getNavLinkClass} to="/movies" >
        Movies
      </NavLink>
    </nav>
  );
}