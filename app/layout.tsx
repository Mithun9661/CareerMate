import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareerMate AI | Student Career Assistant",
  description: "Grammar checking, resume analysis, course recommendations, and GD practice for students.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
