"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Phone, Mail, ChevronDown, ChevronRight } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCatalog = () => {
    setIsCatalogOpen(!isCatalogOpen);
  };

  return (
    <nav className="bg-white shadow-lg border-b-2 border-purple-600">
      {/* Top bar with contact info */}
      <div className="bg-purple-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>+234-803-207-1872</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>emiadegroup@gmail.com</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span>Professional Printing Services Across Nigeria</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/products/logo-nobg.png"
                alt="Emiade Prints Logo"
                width={100}
                height={25}
                className="mr-2"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <div className="relative group">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Home
                </Link>
              </div>
              {/* Catalog Dropdown */}
              <div className="relative group">
                <button className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium transition-colors items-center">
                  Catalog
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-200">
                  <div className="py-1">
                    <Link
                      href="/catalog/other-boxes"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                    >
                      Other Boxes
                    </Link>
                    <Link
                      href="/catalog/rigid-box"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                    >
                      Rigid Box
                    </Link>
                    <Link
                      href="/catalog/folding-carton-box"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                    >
                      Folding Carton Box
                    </Link>
                    <Link
                      href="/catalog/cards"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                    >
                      Cards
                    </Link>
                    <Link
                      href="/catalog/calendar"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                    >
                      Calendar
                    </Link>
                    <Link
                      href="/catalog/flyer-poster"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                    >
                      Flyer & Poster
                    </Link>
                    <Link
                      href="/catalog/catalog-magazine"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                    >
                      Catalog & Magazine
                    </Link>
                    <Link
                      href="/catalog/book"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                    >
                      Book
                    </Link>
                    <Link
                      href="/catalog/binding"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                    >
                      Binding
                    </Link>
                    <Link
                      href="/catalog/custom-design"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                    >
                      Custom Design & Prints
                    </Link>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <Link
                  href="/order"
                  className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Place Order
                </Link>
              </div>
              <div className="relative group">
                <Link
                  href="/contact"
                  className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-purple-600 p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
            <Link
              href="/"
              className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            {/* Mobile Catalog Section */}
            <div className="px-3 py-2">
              <button
                onClick={toggleCatalog}
                className="text-gray-700 hover:text-purple-600 w-full text-left ml-[-10px] px-2 py-2 rounded-md text-base font-medium flex items-center justify-between"
              >
                <span>Catalog</span>
                {isCatalogOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              {isCatalogOpen && (
                <div className="pl-4 space-y-1 mt-2">
                  <Link
                    href="/catalog/other-boxes"
                    className="text-gray-600 hover:text-purple-600 block px-3 py-2 rounded-md text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Other Boxes
                  </Link>
                  <Link
                    href="/catalog/rigid-box"
                    className="text-gray-600 hover:text-purple-600 block px-3 py-2 rounded-md text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Rigid Box
                  </Link>
                  <Link
                    href="/catalog/folding-carton-box"
                    className="text-gray-600 hover:text-purple-600 block px-3 py-2 rounded-md text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Folding Carton Box
                  </Link>
                  <Link
                    href="/catalog/cards"
                    className="text-gray-600 hover:text-purple-600 block px-3 py-2 rounded-md text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Cards
                  </Link>
                  <Link
                    href="/catalog/calendar"
                    className="text-gray-600 hover:text-purple-600 block px-3 py-2 rounded-md text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Calendar
                  </Link>
                  <Link
                    href="/catalog/flyer-poster"
                    className="text-gray-600 hover:text-purple-600 block px-3 py-2 rounded-md text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Flyer & Poster
                  </Link>
                  <Link
                    href="/catalog/catalog-magazine"
                    className="text-gray-600 hover:text-purple-600 block px-3 py-2 rounded-md text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Catalog & Magazine
                  </Link>
                  <Link
                    href="/catalog/book"
                    className="text-gray-600 hover:text-purple-600 block px-3 py-2 rounded-md text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Book
                  </Link>
                  <Link
                    href="/catalog/binding"
                    className="text-gray-600 hover:text-purple-600 block px-3 py-2 rounded-md text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Binding
                  </Link>
                  <Link
                    href="/catalog/custom-design"
                    className="text-gray-600 hover:text-purple-600 block px-3 py-2 rounded-md text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Custom Design & Prints
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/order"
              className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Place Order
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-purple-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
