"use client";
import { Box, Container, Flex } from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiTaskX } from "react-icons/bi";

const NavBar = () => {
  const pathName = usePathname();
  const { status, data: session } = useSession();
  const links = [
    { name: "Dashboard", href: "/" },
    { name: "Tasks", href: "/tasks" },
  ];

  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <BiTaskX />
            </Link>
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={classnames({
                      "text-zinc-900": pathName === link.href,
                      "text-zinc-500": pathName !== link.href,
                      "hover:text-zinc-800 transition-colors": true,
                    })}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "authenticated" ? (
              <Link href="/api/auth/signout">Sign Out</Link>
            ) : (
              <Link href="/api/auth/signin">Sign In</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
