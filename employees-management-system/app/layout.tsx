import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";

export const metadata: Metadata = {
  title: "Employees Management System",
  description: "Employees Management System",
};
const font = Nunito({
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
