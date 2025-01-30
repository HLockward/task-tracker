"use client";

import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BiTaskX } from "react-icons/bi";

const NavBar = () => {
  const pathName = usePathname();

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
            className={classnames({
              "text-zinc-900": pathName === link.href,
              "text-zinc-500": pathName !== link.href,
              "hover:text-zinc-800 transition-colors": true,
            })}
          >
            {link.name}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
