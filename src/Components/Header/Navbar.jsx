import React from "react";
import { useSelector } from "react-redux";
import { Container, Logout } from "../index";
import { NavLink } from "react-router-dom";

function Navbar() {
  const authstate = useSelector((state)=>state.auth.login);
  const navitems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authstate,
    },
    {
      name: "SignUp",
      slug: "/signup",
      active: !authstate,
    },
  
    {
      name: "Add Post",
      slug: "/add-post",
      active: authstate,
    },
    
  ];

  return (
    <Container classname="w-full h-16 px-1  ">
      <nav className="w-full  h-full flex items-center bg-gray-950/20  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-gray-400 rounded-3xl">
        <ul className=" h-full flex justify-end items-center w-full gap-7 px-8 rounded-xl">
          {navitems.map((navitem) =>
            navitem.active ? (
              <NavLink key={navitem.name} to={navitem.slug} className={({isActive}) => `${isActive ? `rounded-2xl font-semibold shadow-lg bg-cyan-500 shadow-cyan-500/70 ` : null}  font-sans font-medium text-white p-1 px-4 rounded-2xl `}>
                <li>
                    {navitem.name}
                </li>
              </NavLink>
            ) : null
          )}
          {authstate && (
            <li>
              <Logout />
            </li>
          )}
        </ul>
      </nav>
    </Container>
  );
}

export default Navbar;
