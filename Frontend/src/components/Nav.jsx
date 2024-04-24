import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
const Nav = ({ navItems }) => {
  return (
    <>
      <ul>
        <li className="flex gap-5">
          {navItems.map((link, index) => {
            return (
              <Link key={`${link.title}-${index}`} to={link.path}>
                {link.title}
              </Link>
            );
          })}
        </li>
      </ul>
    </>
  );
};

Nav.propTypes = {
  navItems: PropTypes.array,
};

export default Nav;
