

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
  } from "@nextui-org/react";
import Link from 'next/link'
import SearchInput from './serch-input'
import HeaderAuth from './Header-auth'

const Header = () => {
  return (
    <Navbar className="shadow-md">
      <NavbarBrand>
        <Link href="/" className="font-bold text-3xl">
          LetsTalk
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <SearchInput />
      </NavbarContent>
      <NavbarContent justify="end">
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
