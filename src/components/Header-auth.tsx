"use client"

import Link from "next/link";
import {
  NavbarItem,
  Button,
  Avatar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import * as actions from "@/actions";

const HeaderAuth = () => {
  const session = useSession();

  let authContent: React.ReactNode;

  if (session?.data?.user) {
    authContent = (
      <>
        <Popover placement="bottom">
          <PopoverTrigger>
            <Avatar className="pointer" src={session?.data?.user.image || ""} />
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-4">
              <form action={actions.signOut}>
                <Button type="submit" color="danger" variant="flat">
                  Sign Out
                </Button>
              </form>
            </div>
          </PopoverContent>
        </Popover>
      </>
    );
  } else {
    authContent = (
      <>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button color="secondary" variant="bordered" type="submit">
              Sign In
            </Button>
          </form>
        </NavbarItem>
        <NavbarItem>
          <form action={""}>
            <Button color="primary" variant="flat" type="submit">
              Sign Up
            </Button>
          </form>
        </NavbarItem>
      </>
    );
  }

  return authContent
    
  
}

export default HeaderAuth