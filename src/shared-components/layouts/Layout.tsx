import React from "react";
import Navbar from "../ui/Navbar";
// import NavbarPharmacy from "../ui/NavbarPharmacy";
// import NavbarUser from "../ui/NavbarUser";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar role={"pharmacy"} />
      <main>{children}</main>
    </>
  );
};

export default Layout;
