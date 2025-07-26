import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "primereact/resources/themes/lara-light-purple/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emiade Printing Company - Professional Printing Services in Nigeria",
  description:
    "Leading printing company in Nigeria offering digital printing, offset printing, and promotional materials. Quality printing services for businesses, authors, and events. Established in 1992, serving Osogbo and beyond.",
  keywords:
    "printing services Nigeria, digital printing, offset printing, business cards, flyers, books, promotional items, Osogbo printing, Emiade Prints",
  authors: [{ name: "Emiade Printing Company" }],
  icons: {
    icon: "/images/products/logo-nobg.png",
    shortcut: "/images/products/logo-nobg.png",
    apple: "/images/products/logo-nobg.png",
  },
  openGraph: {
    title: "Emiade Printing Company",
    description: "Professional printing services in Nigeria - Established 1992",
    type: "website",
    locale: "en_NG",
  },
  other: {
    "contact:phone": "+234-803-207-1872",
    "contact:email": "emiadegroup@gmail.com",
    "business:address": "59, Egbatedo Street, Osogbo, Nigeria",
    "business:hours": "Mon-Sat: 8:00 AM - 6:00 PM, Sun: 1:00 PM - 6:00 PM",
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
