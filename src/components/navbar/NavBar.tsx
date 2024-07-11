import Link from "next/link";
import { CgNotes } from "react-icons/cg";
import { IoHome } from "react-icons/io5";
import AuthPanel from "./AuthPanel";
import NavLinks from "./NavLinks";
import ProductsCountBadge from "./ProductsCountBadge";
import ThemeSwitcher from "./ThemeSwitcher";

const NavBar = () => {
  return (
    <nav className="flex justify-between border-b p-4" role="navigation">
      <div className="flex items-center gap-2">
        <Link href="/" className="text-3xl font-medium">
          <IoHome />
        </Link>
        <NavLinks />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <CgNotes className="text-xl" />
          <ProductsCountBadge />
        </div>
        <AuthPanel />
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default NavBar;
