import { Link, Outlet } from "react-router-dom";
import { Fragment } from "react";
import Dropdown from "./Dropdown";
const NavBar = ({ user, handleSetUser }) => {
  let isLoggedIn = false;
  if (user !== null) isLoggedIn = true;
  const LINKS = [
    { name: "HOME", path: "/" },
    { name: "CATEGORIES", path: "/categories" },
    { name: "ALL PRODUCTS", path: "/products" },
  ];
  return (
    <div>
      <div className="bg-green-400 h-16 sticky top-0 w-full grid grid-cols-2 inline-block">
        <div className="mt-5">
          {LINKS.map((link) => {
            return (
              <Link
                key={link.name}
                className="ml-5 hover:text-white"
                to={link.path}
              >
                {link.name}
              </Link>
            );
          })}
          <Fragment>
            <Dropdown />
          </Fragment>
        </div>

        <div className="mt-5 ml-auto mr-5">
          {!isLoggedIn && (
            <Link className="ml-5 hover:text-white" to="/login">
              LOGIN
            </Link>
          )}
          {isLoggedIn && <Fragment className="mx-5">{user.email}</Fragment>}
          {isLoggedIn && (
            <button
              className="hover:text-white ml-5"
              onClick={() => handleSetUser()}
            >
              LOGOUT
            </button>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
};
export default NavBar;
