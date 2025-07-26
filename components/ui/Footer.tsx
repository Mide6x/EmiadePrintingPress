import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-2xl font-bold text-purple-400">
              Emiade
              <span className="text-amber-500 ml-1">Prints</span>
            </div>
            <p className="text-gray-300 text-sm">
              Your trusted partner for professional printing services across
              Nigeria. Quality prints, competitive prices, and exceptional
              customer service.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">FB</span>
              </div>
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">IG</span>
              </div>
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">TW</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-400">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/catalog/digital"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Printing
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog/offset"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Offset Printing
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog/promotional"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Promotional Items
                </Link>
              </li>
              <li>
                <Link
                  href="/order"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Place Order
                </Link>
              </li>
              <li>
                <Link
                  href="/track-order"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-400">
              Our Services
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Business Cards & Stationery</li>
              <li>• Flyers & Brochures</li>
              <li>• Books & Magazines</li>
              <li>• Banners & Signage</li>
              <li>• Promotional Products</li>
              <li>• Custom Design Services</li>
              <li>• Bulk Printing Solutions</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-400">
              Contact Us
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-amber-500" />
                <span className="text-gray-300 text-sm">+234 80 3207 1872</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-amber-500" />
                <span className="text-gray-300 text-sm">
                  emiadegroup@gmail.com
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-amber-500 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  59 Egbatedo Street,
                  <br />
                  Osogbo, Osun State,
                  <br />
                  Nigeria
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="h-4 w-4 text-amber-500 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  Monday - Saturday: 9:00 AM - 6:00 PM
                  <br />
                  Sunday: 1:00 PM - 6:00 PM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2024 Emiade Printing Company. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/admin"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
