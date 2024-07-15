"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const pathname = usePathname();
  const links = [
    { label: "Products", href: "/products" },
    { label: "Complaint", href: "/complaint" },
    { label: "About Me", href: "/about-me" },
  ];

  return (
    <ul className="ml-10 flex space-x-8">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={
              link.href === pathname
                ? "text-zinc-800 dark:text-zinc-200"
                : "text-zinc-500 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-blue-500"
            }
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
