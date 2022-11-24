import { AppBar } from "@/features/website/components/AppBar";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}
export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex justify-center bg-slate-100 min-h-screen">
      <div className="flex flex-col md:min-h-screen m-3 gap-3 container">
        <AppBar />
        <main className="md:flex-grow flex">{children}</main>
      </div>
    </div>
  );
};
