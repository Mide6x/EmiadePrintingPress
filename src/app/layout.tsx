import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emiade Printing Company - Professional Printing Services in Nigeria",
  description:
    "Leading printing company in Nigeria offering digital printing, offset printing, and promotional materials. Quality printing services for businesses, authors, and events.",
  keywords:
    "printing services Nigeria, digital printing, offset printing, business cards, flyers, books, promotional items",
  authors: [{ name: "Emiade Printing Company" }],
  openGraph: {
    title: "Emiade Printing Company",
    description: "Professional printing services in Nigeria",
    type: "website",
    locale: "en_NG",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
