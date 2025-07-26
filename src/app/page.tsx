import Link from "next/link";
import {
  ArrowRight,
  Star,
  Users,
  Clock,
  Shield,
  Printer,
  Palette,
  Package,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function Home() {
  const stats = [
    { icon: Users, label: "Happy Customers", value: "5,000+" },
    { icon: Printer, label: "Projects Completed", value: "25,000+" },
    { icon: Clock, label: "Years Experience", value: "33+" },
    { icon: Star, label: "Customer Rating", value: "4.9/5" },
  ];

  const services = [
    {
      icon: Printer,
      title: "Printing",
      description:
        "High-quality Printing for small to medium runs with quick turnaround times.",
      features: ["Business cards", "Flyers", "Banners", "Posters"],
    },
    {
      icon: Package,
      title: "Offset Printing",
      description:
        "Cost-effective offset printing for large volume orders with superior quality.",
      features: ["Books", "Magazines", "Catalogs", "Bulk orders"],
    },
    {
      icon: Palette,
      title: "Design Services",
      description:
        "Professional graphic design services to bring your vision to life.",
      features: ["Logo design", "Branding", "Layout design", "Custom artwork"],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Printing
              <span className="block text-amber-400">Made Simple</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-purple-100">
              From business cards to books, we deliver exceptional printing
              services across Nigeria with unmatched quality and competitive
              prices.
            </p>

            {/* Contact Information */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <div className="flex items-center justify-center text-purple-100">
                <Phone className="h-5 w-5 mr-2" />
                <span className="font-semibold">+234 80 3207 1872</span>
              </div>
              <div className="flex items-center justify-center text-purple-100">
                <Mail className="h-5 w-5 mr-2" />
                <span className="font-semibold">emiadegroup@gmail.com</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/order"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200"
              >
                Get Quote
              </Link>
              <a
                href="https://rebrand.ly/emiade"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 flex items-center justify-center"
              >
                Order via WhatsApp
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer high-quality printing services for businesses,
              individuals, and organizations across Nigeria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-center mb-6">
                  <service.icon className="h-12 w-12 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 text-center">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Showcase */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Trusted Partners
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We&apos;re proud to serve these esteemed organizations and
              institutions across Nigeria.
            </p>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex animate-scroll space-x-16">
              {/* First set of partners */}
              <div className="flex space-x-16 min-w-max">
                <span className="text-2xl font-serif italic text-gray-700 tracking-wide">
                  Salvation Nursery and Primary School, Inisa
                </span>

                <span className="text-2xl font-mono font-bold text-gray-700 uppercase tracking-wider">
                  Women Organizations, Oke-Osun Diocese
                </span>

                <span className="text-2xl font-sans font-light text-gray-700 normal-case">
                  Osun Diocesan Nursery and Primary School
                </span>

                <span className="text-2xl font-serif font-semibold text-gray-700 capitalize">
                  John Mckay Anglican Grammar School
                </span>

                <span className="text-2xl font-mono font-medium text-gray-700 lowercase tracking-tight">
                  Olatunji Idowu
                </span>

                <span className="text-2xl font-sans font-bold text-gray-700 uppercase tracking-wide">
                  All Souls Anglican Church (Tracts)
                </span>

                <span className="text-2xl font-serif font-normal text-gray-700 italic">
                  Oke-Osun Anglican Diocese
                </span>

                <span className="text-2xl font-mono font-light text-gray-700 normal-case tracking-normal">
                  Osun Anglican Diocese
                </span>
              </div>

              {/* Duplicate set for seamless loop */}
              <div className="flex space-x-16 min-w-max">
                <span className="text-2xl font-serif italic text-gray-700 tracking-wide">
                  Salvation Nursery and Primary School, Inisa
                </span>

                <span className="text-2xl font-mono font-bold text-gray-700 uppercase tracking-wider">
                  Women Organizations, Oke-Osun Diocese
                </span>

                <span className="text-2xl font-sans font-light text-gray-700 normal-case">
                  Osun Diocesan Nursery and Primary School
                </span>

                <span className="text-2xl font-serif font-semibold text-gray-700 capitalize">
                  John Mckay Anglican Grammar School
                </span>

                <span className="text-2xl font-mono font-medium text-gray-700 lowercase tracking-tight">
                  Olatunji Idowu
                </span>

                <span className="text-2xl font-sans font-bold text-gray-700 uppercase tracking-wide">
                  All Souls Anglican Church (Tracts)
                </span>

                <span className="text-2xl font-serif font-normal text-gray-700 italic">
                  Oke-Osun Anglican Diocese
                </span>

                <span className="text-2xl font-mono font-light text-gray-700 normal-case tracking-normal">
                  Osun Anglican Diocese
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Hours Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Visit Our Office
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Established in 1992, registered in 2025. Come visit us for
              personalized service and consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-purple-50 rounded-lg p-8 text-center">
              <div className="flex justify-center mb-4">
                <MapPin className="h-12 w-12 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Location
              </h3>
              <p className="text-gray-600">
                59, Egbatedo Street
                <br />
                Osogbo, Nigeria
              </p>
            </div>

            <div className="bg-amber-50 rounded-lg p-8 text-center">
              <div className="flex justify-center mb-4">
                <Clock className="h-12 w-12 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Business Hours
              </h3>
              <div className="text-gray-600 space-y-1">
                <p>
                  <strong>Monday - Saturday:</strong>
                </p>
                <p>8:00 AM – 6:00 PM</p>
                <p>
                  <strong>Sunday:</strong>
                </p>
                <p>1:00 PM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Emiade Prints?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge technology with exceptional service to
              deliver outstanding results every time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Quality Guarantee
              </h3>
              <p className="text-gray-600 text-sm">
                We stand behind our work with a 100% satisfaction guarantee on
                all orders.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Fast Turnaround
              </h3>
              <p className="text-gray-600 text-sm">
                Quick delivery times without compromising on quality or
                attention to detail.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Expert Support
              </h3>
              <p className="text-gray-600 text-sm">
                Our experienced team provides personalized support throughout
                your project.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Competitive Pricing
              </h3>
              <p className="text-gray-600 text-sm">
                Best value for money with transparent pricing and bulk discounts
                available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-purple-100">
            Get a free quote today and experience the difference of working with
            Nigeria&apos;s premier printing company.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/order"
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 inline-flex items-center justify-center"
            >
              Get Free Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a
              href="https://rebrand.ly/emiade"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 inline-flex items-center justify-center"
            >
              Order via WhatsApp
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200"
            >
              Contact Designer
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
