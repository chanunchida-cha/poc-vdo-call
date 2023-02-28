import React from "react";
import NavbarPharmacy from "../ui/NavbarPharmacy";
import NavbarUser from "../ui/NavbarUser";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const role: string = "pharmacy";
  return (
    <>
      {role === "user" ? <NavbarUser /> : <NavbarPharmacy />}
      <main>{children}</main>
    </>
  );
};

export default Layout;
