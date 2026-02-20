import { Header } from "@/components/header";
import { ReactNode } from "react";

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto grid min-h-screen w-full grid-rows-[min-content_max-content]">
      <Header />
      {children}
    </div>
  );
}
