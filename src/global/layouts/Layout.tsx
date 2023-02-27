import React from "react";
import NavbarPharmacy from "../ui/NavbarPharmacy";
import NavbarUser from "../ui/NavbarUser";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <NavbarPharmacy />
      <main>{children}</main>
    </>
  );
};

export default Layout;
