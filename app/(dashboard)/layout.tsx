import Header from "@/components/header";
import React from "react";

type Props = {
  children: React.ReactNode; // Fixed the typo here
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <>
     <Header></Header>
    <main className="px-3 lg:px-14">
      {children}
    </main>
    </>
  );
};

export default DashboardLayout;
