import React from "react";

import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  const navbarPaths = [
    { name: "Log In", path: "/login", style: "py-2 px-5 flex items-center" },
    {
      name: "Sign Up",
      path: "/signup",
      style: "bg-black rounded-[6px] py-2 px-5 flex items-center",
    },
  ];

  return (
    <div className="w-screen p-[20px] flex flex-row justify-between items-center">
      <h2
        className="font-semibold font-serif text-xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        Note Keep
      </h2>

      <div className="w-[180px] flex flex-row justify-between">
        {navbarPaths.map((nav, i) => {
          return (
            <div
              className={`${nav.style} cursor-pointer`}
              onClick={() => navigate(`${nav.path}`)}
              key={i}
            >
              <p
                className={`${
                  nav.name === "Log In" ? "text-black" : "text-white"
                } text-sm font-semibold`}
              >
                {nav.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NavBar;
