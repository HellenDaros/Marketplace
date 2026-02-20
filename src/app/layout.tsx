import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppinsSans = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-poppins-sans",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Marketplace",
    default: "marketplace",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${poppinsSans.variable} font-sans bg-pink-300 text-zinc-50 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
