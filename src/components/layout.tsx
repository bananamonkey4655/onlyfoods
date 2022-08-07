import { useRouter } from "next/router";
import { ReactNode } from "react";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  return (
    <>
      <Navbar isHomePage={!router.query.food} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
