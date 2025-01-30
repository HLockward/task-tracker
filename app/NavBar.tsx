import Link from "next/link";
import React from "react";
import { BiTaskX } from "react-icons/bi";

const NavBar = () => {
  const links = [
    { name: "Dashboard", href: "/" },
    { name: "Tasks", href: "/tasks" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <BiTaskX />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
