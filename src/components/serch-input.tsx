"use client";

import { Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import * as actions from "@/actions";

const SearchInput = () => {
  const searchParams = useSearchParams();

  return (
    <form action={actions.search}>
        <Input
          name="term"
          placeholder="Search"
          width="300px"
          defaultValue={searchParams.get("term") || ""}
        />
    </form>
  );
};

export default SearchInput;
