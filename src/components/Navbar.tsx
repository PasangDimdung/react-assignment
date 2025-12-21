import { NavLink } from "react-router-dom";

const Navbar = () => (
  <nav>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/expenses">Expenses</NavLink>
    <NavLink to="/weather">Weather</NavLink>
  </nav>
);

export default Navbar;